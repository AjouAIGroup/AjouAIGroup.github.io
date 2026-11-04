import {
    LAB_KEYS,
    MAX_IMAGE_BYTES,
    NEWS_CONTENT_PATH,
    NEWS_IMAGE_PATH,
    NEWS_OVERRIDES_PATH,
    NEWS_OVERRIDE_FIELDS,
    PHOTO_CONTENT_PATH,
    createAlbumId,
    createNewsId,
    setFrontmatterFields,
    validateAlbumMeta,
    validateNewsFields,
    validateNewsOverride,
} from "../../src/utils/siteContentRules.js";

// The Worker's GitHub token can start workflows but not write to the
// repository, so a News or Photos edit is checked here, parked in the
// SITE_EDITS store, and handed to the site-edit workflow. That workflow
// fetches it with its GitHub identity token, commits it together with the
// regenerated output, and starts the deploy.
export const SITE_EDIT_AUDIENCE = "aaig-admin-api";

const NEWS_GENERATED_PATH = "src/generated/news.generated.json";
// Photos are resized in the browser, so a whole album fits well under this.
export const MAX_CONTENT_BODY_BYTES = 40 * 1024 * 1024;
const MAX_PHOTOS_PER_ALBUM = 60;
// A queued edit is applied within minutes; the day only covers a workflow
// that waited in GitHub's queue or was re-run by hand.
const JOB_TTL_SECONDS = 24 * 60 * 60;
// While an edit is on its way, the item it touches cannot be edited again:
// the second edit would start from the page as it was before the first.
const LOCK_TTL_SECONDS = 30 * 60;

const NEWS_ITEM_PATH = /^\/v1\/site\/news\/([a-z0-9-]+)$/;
const PHOTO_ALBUM_PATH = /^\/v1\/site\/photos\/([a-z0-9-]+)$/;
const JOB_PATH = /^\/v1\/site\/jobs\/([0-9a-f-]{36})(?:\/files\/(\d{1,3}))?$/;

export const isSiteContentPath = (pathname) =>
    pathname === "/v1/site/news" ||
    pathname === "/v1/site/photos" ||
    NEWS_ITEM_PATH.test(pathname) ||
    PHOTO_ALBUM_PATH.test(pathname) ||
    JOB_PATH.test(pathname);

export const hasSiteContentConfiguration = (env) =>
    Boolean(
        env.SITE_EDITS &&
        env.SITE_EDIT_WORKFLOW_ID &&
        env.GITHUB_ACTIONS_TOKEN &&
        env.GITHUB_OWNER &&
        env.GITHUB_REPO &&
        env.GITHUB_REF &&
        env.ADMIN_ORIGIN,
    );

const text = (value) => String(value ?? "").trim();

const decodeBase64 = (value) =>
    Uint8Array.from(atob(String(value ?? "").replace(/\s+/g, "")), (char) =>
        char.charCodeAt(0),
    );

// The browser re-encodes every upload, so only these formats ever arrive.
// The bytes are checked rather than the declared type, which the client
// controls.
const IMAGE_SIGNATURES = [
    {
        ext: "webp",
        test: (b) => text(String.fromCharCode(...b.subarray(8, 12))) === "WEBP",
    },
    {
        ext: "jpg",
        test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
    },
    {
        ext: "png",
        test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e,
    },
];

const readUpload = (upload, label, HttpError) => {
    const data = text(upload?.data);
    if (!data) throw new HttpError(400, `${label}: 사진 데이터가 없습니다.`);
    let bytes;
    try {
        bytes = decodeBase64(data);
    } catch {
        throw new HttpError(400, `${label}: 사진을 읽지 못했습니다.`);
    }
    if (bytes.byteLength > MAX_IMAGE_BYTES) {
        throw new HttpError(413, `${label}: 사진이 3MB보다 큽니다.`);
    }
    const format = IMAGE_SIGNATURES.find((signature) => signature.test(bytes));
    if (!format) {
        throw new HttpError(
            400,
            `${label}: JPEG, PNG, WebP 사진만 올릴 수 있습니다.`,
        );
    }
    return { bytes, ext: format.ext };
};

const uniqueSuffix = () => Date.now().toString(36);

export const createSiteContentHandler = ({
    jsonResponse,
    authorize,
    authorizeSiteEditWorkflow,
    githubRequest,
    HttpError,
}) => {
    const readJson = async (request) => {
        const body = await request.text();
        if (body.length > MAX_CONTENT_BODY_BYTES) {
            throw new HttpError(413, "한 번에 올리는 사진이 너무 많습니다.");
        }
        try {
            return JSON.parse(body || "{}");
        } catch {
            throw new HttpError(400, "요청 형식이 올바르지 않습니다.");
        }
    };

    const branch = (env) => encodeURIComponent(env.GITHUB_REF);

    const readHead = async (env) => {
        const ref = await githubRequest(env, `/git/ref/heads/${branch(env)}`);
        const commit = await githubRequest(
            env,
            `/git/commits/${ref.object.sha}`,
        );
        return { sha: ref.object.sha, treeSha: commit.tree.sha };
    };

    // Reads files as of one commit so every decision in an edit sees the same
    // snapshot. Missing files and folders read as null.
    const createReader = (env, sha) => {
        const get = async (path) => {
            try {
                return await githubRequest(
                    env,
                    `/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${sha}`,
                );
            } catch (error) {
                if (error.status === 404) return null;
                throw error;
            }
        };
        return {
            text: async (path) => {
                const file = await get(path);
                if (!file || Array.isArray(file)) return null;
                return new TextDecoder().decode(decodeBase64(file.content));
            },
            json: async (path) => {
                const file = await get(path);
                if (!file || Array.isArray(file)) return null;
                return JSON.parse(
                    new TextDecoder().decode(decodeBase64(file.content)),
                );
            },
            list: async (path) => {
                const entries = await get(path);
                return Array.isArray(entries) ? entries : [];
            },
        };
    };

    const lockKey = (target) => `lock:${target}`;
    const jobKey = (jobId) => `job:${jobId}`;
    const fileKey = (jobId, index) => `job:${jobId}:file:${index}`;

    const listPending = async (env, prefix) => {
        const { keys } = await env.SITE_EDITS.list({
            prefix: lockKey(prefix),
        });
        return keys.map((key) => key.name.slice(lockKey(prefix).length));
    };

    // `buildChanges` reads the current head and returns { message, files,
    // overrides, result }. `files` are whole files to write ({ path, bytes }
    // or { path, text }) or remove ({ path, delete: true }); `overrides` maps a
    // News id to its new overrides.json entry, or null to drop it, so edits to
    // different items never overwrite each other's entries.
    const queueChanges = async (env, actor, target, buildChanges) => {
        if (await env.SITE_EDITS.get(lockKey(target))) {
            throw new HttpError(
                409,
                "이 항목의 이전 저장이 아직 반영 중입니다. 몇 분 뒤 다시 시도해주세요.",
            );
        }

        const head = await readHead(env);
        const {
            message,
            files,
            overrides = {},
            result,
        } = await buildChanges(createReader(env, head.sha));

        const jobId = crypto.randomUUID();
        const ttl = { expirationTtl: JOB_TTL_SECONDS };
        const manifest = await Promise.all(
            files.map(async (file, index) => {
                if (file.delete) return { path: file.path, delete: true };
                const bytes = file.bytes ?? new TextEncoder().encode(file.text);
                await env.SITE_EDITS.put(fileKey(jobId, index), bytes, ttl);
                return { path: file.path, file: index };
            }),
        );
        await env.SITE_EDITS.put(
            jobKey(jobId),
            JSON.stringify({
                id: jobId,
                actor,
                message,
                base: head.sha,
                files: manifest,
                overrides,
                target,
                createdAt: new Date().toISOString(),
            }),
            ttl,
        );
        await env.SITE_EDITS.put(lockKey(target), jobId, {
            expirationTtl: LOCK_TTL_SECONDS,
        });

        try {
            await githubRequest(
                env,
                `/actions/workflows/${encodeURIComponent(env.SITE_EDIT_WORKFLOW_ID)}/dispatches`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        ref: env.GITHUB_REF,
                        inputs: { job_id: jobId },
                    }),
                },
            );
        } catch (error) {
            await releaseJob(env, jobId);
            throw error;
        }

        console.log(
            JSON.stringify({
                event: "site_content.queued",
                actor,
                message,
                jobId,
            }),
        );
        return {
            ...result,
            queued: true,
            jobId,
            runsUrl: `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/actions/workflows/${env.SITE_EDIT_WORKFLOW_ID}`,
        };
    };

    const readJob = async (env, jobId) => {
        const job = await env.SITE_EDITS.get(jobKey(jobId), "json");
        if (!job) throw new HttpError(404, "Edit not found or expired.");
        return job;
    };

    const releaseJob = async (env, jobId) => {
        const job = await env.SITE_EDITS.get(jobKey(jobId), "json");
        if (!job) return { released: false };
        await Promise.all(
            job.files
                .filter((file) => !file.delete)
                .map((file) =>
                    env.SITE_EDITS.delete(fileKey(jobId, file.file)),
                ),
        );
        // The lock may already belong to a newer edit if this one expired.
        if ((await env.SITE_EDITS.get(lockKey(job.target))) === jobId) {
            await env.SITE_EDITS.delete(lockKey(job.target));
        }
        await env.SITE_EDITS.delete(jobKey(jobId));
        return { released: true };
    };

    const handleJob = async (request, env, jobId, fileIndex) => {
        const denied = await authorizeSiteEditWorkflow(request, env);
        if (denied) return denied;
        try {
            if (request.method === "DELETE" && fileIndex === undefined) {
                return jsonResponse(request, env, await releaseJob(env, jobId));
            }
            if (request.method !== "GET") {
                throw new HttpError(405, "Method not allowed.");
            }
            if (fileIndex === undefined) {
                return jsonResponse(request, env, await readJob(env, jobId));
            }
            const bytes = await env.SITE_EDITS.get(
                fileKey(jobId, Number(fileIndex)),
                "arrayBuffer",
            );
            if (!bytes) throw new HttpError(404, "File not found or expired.");
            return new Response(bytes, {
                headers: { "Content-Type": "application/octet-stream" },
            });
        } catch (error) {
            const status = error instanceof HttpError ? error.status : 500;
            return jsonResponse(request, env, { error: error.message }, status);
        }
    };

    const rawBase = (env, sha) =>
        `https://raw.githubusercontent.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/${sha}`;

    // ---------- News ----------

    const readOverrides = async (reader) =>
        (await reader.json(NEWS_OVERRIDES_PATH))?.items ?? {};

    const findNewsItem = async (reader, id) => {
        const generated = await reader.json(NEWS_GENERATED_PATH);
        return (generated?.items ?? []).find((item) => item.id === id) ?? null;
    };

    const pickNewsFields = (fields = {}) => ({
        title: text(fields.title),
        summary: text(fields.summary),
        date: text(fields.date),
        type: text(fields.type),
        venue: text(fields.venue),
        related_person: text(fields.related_person),
        external_url: text(fields.external_url),
        image_alt: text(fields.image_alt),
    });

    const assertValid = (errors) => {
        const messages = Object.values(errors);
        if (messages.length) {
            const failure = new HttpError(400, messages.join(" "));
            failure.fields = errors;
            throw failure;
        }
    };

    const listNews = async (env) => {
        const head = await readHead(env);
        const reader = createReader(env, head.sha);
        const [generated, overrides, pending] = await Promise.all([
            reader.json(NEWS_GENERATED_PATH),
            readOverrides(reader),
            listPending(env, "news:"),
        ]);
        return {
            headSha: head.sha,
            rawBase: rawBase(env, head.sha),
            imagePath: NEWS_IMAGE_PATH,
            items: generated?.items ?? [],
            overrides,
            pending,
        };
    };

    const createNews = (env, actor, body) =>
        queueChanges(
            env,
            actor,
            `news:${createNewsId(text(body.fields?.date), text(body.fields?.title))}`,
            async (reader) => {
                const fields = pickNewsFields(body.fields);
                const files = [];
                if (body.image) {
                    const upload = readUpload(body.image, "사진", HttpError);
                    fields.image = `${createNewsId(fields.date, fields.title)}-${uniqueSuffix()}.${upload.ext}`;
                    files.push({
                        path: `${NEWS_IMAGE_PATH}/${fields.image}`,
                        bytes: upload.bytes,
                    });
                }
                assertValid(validateNewsFields(fields));

                const id = createNewsId(fields.date, fields.title);
                const path = `${NEWS_CONTENT_PATH}/${id}.md`;
                if (
                    (await reader.text(path)) !== null ||
                    (await findNewsItem(reader, id))
                ) {
                    throw new HttpError(
                        409,
                        "같은 날짜에 같은 제목의 News가 이미 있습니다.",
                    );
                }
                const markdown = setFrontmatterFields("", {
                    id,
                    ...fields,
                    is_external: Boolean(fields.external_url),
                    featured: false,
                    internal_slug: id,
                });
                files.push({ path, text: markdown });
                return {
                    message: `News: add "${fields.title}"`,
                    files,
                    result: { id },
                };
            },
        );

    const updateNews = (env, actor, id, body) =>
        queueChanges(env, actor, `news:${id}`, async (reader) => {
            const item = await findNewsItem(reader, id);
            const overrides = await readOverrides(reader);
            const files = [];
            let overridePatch;

            if (body.restore) {
                if (!overrides[id]?.hidden)
                    throw new HttpError(404, "숨긴 News가 아닙니다.");
                const rest = { ...overrides[id] };
                delete rest.hidden;
                delete rest.hidden_title;
                if (Object.keys(rest).length) overrides[id] = rest;
                else delete overrides[id];
                overridePatch = { [id]: overrides[id] ?? null };
                return {
                    message: `News: show "${id}" again`,
                    files,
                    overrides: overridePatch,
                    result: { id },
                };
            }
            if (!item) throw new HttpError(404, "News를 찾을 수 없습니다.");

            const currentImage = item.source_path
                ? text(item.image)
                : text(overrides[id]?.image ?? item.image);
            let image = body.removeImage ? "" : currentImage;
            if (body.image) {
                const upload = readUpload(body.image, "사진", HttpError);
                image = `${id.slice(0, 70)}-${uniqueSuffix()}.${upload.ext}`;
                files.push({
                    path: `${NEWS_IMAGE_PATH}/${image}`,
                    bytes: upload.bytes,
                });
            }
            if (currentImage && currentImage !== image) {
                files.push({
                    path: `${NEWS_IMAGE_PATH}/${currentImage}`,
                    delete: true,
                });
            }

            if (item.source_path) {
                // A News file written for this site: its own front matter is
                // edited, keeping any fields the editor does not show.
                const fields = { ...pickNewsFields(body.fields), image };
                if (!image) fields.image_alt = "";
                assertValid(validateNewsFields(fields));
                const markdown = await reader.text(item.source_path);
                if (markdown === null)
                    throw new HttpError(404, "News 파일을 찾을 수 없습니다.");
                files.push({
                    path: item.source_path,
                    text: setFrontmatterFields(markdown, {
                        ...fields,
                        is_external: Boolean(fields.external_url),
                    }),
                });
            } else {
                // Lab-site and generated items are rebuilt from their source,
                // so the change is stored as an override applied on top. The
                // item read here already shows earlier overrides, so only a
                // field that differs from what is on the site is recorded.
                const fields = body.fields ?? {};
                const override = { ...(overrides[id] ?? {}) };
                ["title", "summary"].forEach((field) => {
                    const value = text(fields[field]);
                    if (value && value !== text(item[field]))
                        override[field] = value;
                });
                if (image) {
                    override.image = image;
                    override.image_alt = text(fields.image_alt);
                } else {
                    delete override.image;
                    delete override.image_alt;
                }
                assertValid(validateNewsOverride(override));
                const kept = Object.keys(override).filter((key) =>
                    NEWS_OVERRIDE_FIELDS.includes(key),
                );
                if (kept.length) overrides[id] = override;
                else delete overrides[id];
                overridePatch = { [id]: overrides[id] ?? null };
            }

            return {
                message: `News: edit "${text(body.fields?.title) || id}"`,
                files,
                overrides: overridePatch,
                result: { id },
            };
        });

    const deleteNews = (env, actor, id) =>
        queueChanges(env, actor, `news:${id}`, async (reader) => {
            const item = await findNewsItem(reader, id);
            if (!item) throw new HttpError(404, "News를 찾을 수 없습니다.");
            const overrides = await readOverrides(reader);
            const files = [];
            let overridePatch;

            if (item.source_path) {
                files.push({ path: item.source_path, delete: true });
                if (text(item.image)) {
                    files.push({
                        path: `${NEWS_IMAGE_PATH}/${item.image}`,
                        delete: true,
                    });
                }
                if (overrides[id]) {
                    delete overrides[id];
                    overridePatch = { [id]: overrides[id] ?? null };
                }
                return {
                    message: `News: delete "${item.title}"`,
                    files,
                    overrides: overridePatch,
                    result: { id, deleted: true },
                };
            }

            // Items from lab sites would come back on the next refresh if
            // they were simply removed, so they are hidden instead.
            overrides[id] = {
                ...(overrides[id] ?? {}),
                hidden: true,
                hidden_title: item.title,
            };
            overridePatch = { [id]: overrides[id] ?? null };
            return {
                message: `News: hide "${item.title}"`,
                files,
                overrides: overridePatch,
                result: { id, hidden: true },
            };
        });

    // ---------- Photos ----------

    const listPhotos = async (env) => {
        const head = await readHead(env);
        const reader = createReader(env, head.sha);
        const folders = (await reader.list(PHOTO_CONTENT_PATH)).filter(
            (entry) => entry.type === "dir",
        );
        const pending = await listPending(env, "album:");
        const albums = await Promise.all(
            folders.map(async (folder) => ({
                id: folder.name,
                ...((await reader.json(
                    `${PHOTO_CONTENT_PATH}/${folder.name}/album.json`,
                )) ?? {}),
            })),
        );
        return {
            headSha: head.sha,
            rawBase: rawBase(env, head.sha),
            photoPath: PHOTO_CONTENT_PATH,
            labs: LAB_KEYS,
            pending,
            albums: albums.sort((left, right) =>
                text(right.date).localeCompare(text(left.date)),
            ),
        };
    };

    const pickAlbumMeta = (meta = {}) => {
        const album = { title: text(meta.title), date: text(meta.date) };
        if (text(meta.location)) album.location = text(meta.location);
        const labs = Array.isArray(meta.labs)
            ? meta.labs.map(text).filter(Boolean)
            : [];
        if (labs.length) album.labs = labs;
        if (text(meta.description)) album.description = text(meta.description);
        return album;
    };

    // Turns the editor's photo list (existing files by name, new ones as
    // uploads) into album.json entries plus the files to write and delete.
    const buildAlbumFiles = (albumId, meta, photos, existingFiles) => {
        if (!Array.isArray(photos) || photos.length > MAX_PHOTOS_PER_ALBUM) {
            throw new HttpError(
                400,
                `사진은 앨범당 ${MAX_PHOTOS_PER_ALBUM}장까지 올릴 수 있습니다.`,
            );
        }
        const folder = `${PHOTO_CONTENT_PATH}/${albumId}`;
        const files = [];
        const suffix = uniqueSuffix();
        const entries = photos.map((photo, index) => {
            let file = text(photo?.file);
            if (photo?.data) {
                const upload = readUpload(
                    photo,
                    `사진 ${index + 1}`,
                    HttpError,
                );
                file = `${String(index + 1).padStart(2, "0")}-${suffix}.${upload.ext}`;
                files.push({
                    path: `${folder}/${file}`,
                    bytes: upload.bytes,
                });
            } else if (!existingFiles.has(file)) {
                throw new HttpError(
                    409,
                    `사진 ${index + 1}: 그 사이 앨범이 바뀌었습니다. 새로 불러온 뒤 다시 저장해주세요.`,
                );
            }
            const entry = { file, alt: text(photo?.alt) };
            if (text(photo?.caption)) entry.caption = text(photo.caption);
            return entry;
        });

        const album = { ...pickAlbumMeta(meta), photos: entries };
        assertValid(validateAlbumMeta(album));

        const kept = new Set(entries.map((entry) => entry.file));
        existingFiles.forEach((file) => {
            if (!kept.has(file))
                files.push({ path: `${folder}/${file}`, delete: true });
        });
        files.push({
            path: `${folder}/album.json`,
            text: `${JSON.stringify(album, null, 4)}\n`,
        });
        return { album, files };
    };

    const albumImageFiles = async (reader, albumId) =>
        new Set(
            (await reader.list(`${PHOTO_CONTENT_PATH}/${albumId}`))
                .filter(
                    (entry) =>
                        entry.type === "file" && entry.name !== "album.json",
                )
                .map((entry) => entry.name),
        );

    const createAlbum = (env, actor, body) =>
        queueChanges(
            env,
            actor,
            `album:${createAlbumId(text(body.album?.date), text(body.album?.title))}`,
            async (reader) => {
                const meta = pickAlbumMeta(body.album);
                const albumId = createAlbumId(meta.date, meta.title);
                if (!albumId || (await albumImageFiles(reader, albumId)).size) {
                    throw new HttpError(
                        409,
                        "같은 날짜에 같은 제목의 앨범이 이미 있습니다.",
                    );
                }
                const { album, files } = buildAlbumFiles(
                    albumId,
                    meta,
                    body.photos,
                    new Set(),
                );
                return {
                    message: `Photos: add "${album.title}"`,
                    files,
                    result: { id: albumId },
                };
            },
        );

    const updateAlbum = (env, actor, albumId, body) =>
        queueChanges(env, actor, `album:${albumId}`, async (reader) => {
            const existing = await albumImageFiles(reader, albumId);
            if (!existing.size)
                throw new HttpError(404, "앨범을 찾을 수 없습니다.");
            const { album, files } = buildAlbumFiles(
                albumId,
                body.album,
                body.photos,
                existing,
            );
            return {
                message: `Photos: edit "${album.title}"`,
                files,
                result: { id: albumId },
            };
        });

    const deleteAlbum = (env, actor, albumId) =>
        queueChanges(env, actor, `album:${albumId}`, async (reader) => {
            const entries = await reader.list(
                `${PHOTO_CONTENT_PATH}/${albumId}`,
            );
            if (!entries.length)
                throw new HttpError(404, "앨범을 찾을 수 없습니다.");
            return {
                message: `Photos: delete album ${albumId}`,
                files: entries
                    .filter((entry) => entry.type === "file")
                    .map((entry) => ({ path: entry.path, delete: true })),
                result: { id: albumId, deleted: true },
            };
        });

    // ---------- Routing ----------

    return async (request, env, url) => {
        if (!hasSiteContentConfiguration(env)) {
            return jsonResponse(
                request,
                env,
                {
                    error: "News·Photos 편집 설정이 필요합니다.",
                    setupRequired: true,
                },
                503,
            );
        }

        const job = JOB_PATH.exec(url.pathname);
        if (job) return handleJob(request, env, job[1], job[2]);

        const { failure, actor } = await authorize(request, env, "/v1/site");
        if (failure) return failure;

        const newsId = NEWS_ITEM_PATH.exec(url.pathname)?.[1];
        const albumId = PHOTO_ALBUM_PATH.exec(url.pathname)?.[1];
        const method = request.method;

        try {
            let payload;
            if (url.pathname === "/v1/site/news" && method === "GET") {
                payload = await listNews(env);
            } else if (url.pathname === "/v1/site/news" && method === "POST") {
                payload = await createNews(env, actor, await readJson(request));
            } else if (newsId && method === "PUT") {
                payload = await updateNews(
                    env,
                    actor,
                    newsId,
                    await readJson(request),
                );
            } else if (newsId && method === "DELETE") {
                payload = await deleteNews(env, actor, newsId);
            } else if (url.pathname === "/v1/site/photos" && method === "GET") {
                payload = await listPhotos(env);
            } else if (
                url.pathname === "/v1/site/photos" &&
                method === "POST"
            ) {
                payload = await createAlbum(
                    env,
                    actor,
                    await readJson(request),
                );
            } else if (albumId && method === "PUT") {
                payload = await updateAlbum(
                    env,
                    actor,
                    albumId,
                    await readJson(request),
                );
            } else if (albumId && method === "DELETE") {
                payload = await deleteAlbum(env, actor, albumId);
            } else {
                return jsonResponse(
                    request,
                    env,
                    { error: "허용되지 않은 요청 방식입니다." },
                    405,
                );
            }
            return jsonResponse(
                request,
                env,
                payload,
                method === "GET" ? 200 : 202,
            );
        } catch (error) {
            if (error instanceof HttpError) {
                return jsonResponse(
                    request,
                    env,
                    { error: error.message, fields: error.fields },
                    error.status,
                );
            }
            console.error(
                JSON.stringify({
                    event: "site_content.error",
                    actor,
                    message: error.message,
                }),
            );
            const permission = error.status === 403 || error.status === 404;
            return jsonResponse(
                request,
                env,
                {
                    error: "저장 요청을 보내지 못했습니다.",
                    hint: permission
                        ? "GITHUB_ACTIONS_TOKEN에 Actions 읽기·쓰기 권한이 있는지, 저장소에 site-edit 워크플로가 있는지 확인하세요."
                        : undefined,
                    detail: error.message,
                },
                502,
            );
        }
    };
};
