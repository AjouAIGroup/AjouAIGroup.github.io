import {
    LAB_KEYS,
    MAX_IMAGE_BYTES,
    MAX_IMAGE_EDGE,
    NEWS_CONTENT_PATH,
    NEWS_IMAGE_PATH,
    NEWS_OVERRIDES_PATH,
    NEWS_OVERRIDE_FIELDS,
    PHOTO_CONTENT_PATH,
    PHOTO_THUMB_DIR,
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
//
// Photos are sent one per request before the edit is saved, so no request
// carries more than one image and the edit itself is a small JSON body.
export const SITE_EDIT_AUDIENCE = "aaig-admin-api";

const NEWS_GENERATED_PATH = "src/generated/news.generated.json";
const PHOTOS_GENERATED_PATH = "src/generated/photos.generated.json";
const MAX_JSON_BODY_BYTES = 256 * 1024;
const MAX_PHOTOS_PER_ALBUM = 60;
// Uploads and queued edits are applied within minutes; the day only covers
// a workflow that waited in GitHub's queue or a form left open for a while.
// Entries expire on their own, which costs nothing against the KV quotas.
const STORE_TTL_SECONDS = 24 * 60 * 60;
// How many recent site-edit runs decide what is still on its way or failed.
const RECENT_RUNS = 30;
const FAILURE_WINDOW_MS = 3 * 24 * 60 * 60 * 1000;

const NEWS_ITEM_PATH = /^\/v1\/site\/news\/([a-z0-9-]+)$/;
const PHOTO_ALBUM_PATH = /^\/v1\/site\/photos\/([a-z0-9-]+)$/;
const UPLOAD_ID = /^[0-9a-f-]{36}\.(webp|jpg|png)$/;
const JOB_PATH =
    /^\/v1\/site\/jobs\/([0-9a-f-]{36})(?:\/uploads\/([0-9a-f-]{36}\.(?:webp|jpg|png)))?$/;
// The workflow's run name, which is how a run is tied back to its item.
const RUN_TITLE = /^Admin edit ((?:news|album):[a-z0-9-]+) [0-9a-f-]{36}$/;

export const isSiteContentPath = (pathname) =>
    pathname === "/v1/site/news" ||
    pathname === "/v1/site/photos" ||
    pathname === "/v1/site/uploads" ||
    pathname === "/v1/site/status" ||
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

const ascii = (bytes, start, end) =>
    String.fromCharCode(...bytes.subarray(start, end));

const JPEG_FRAME_MARKERS = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce,
    0xcf,
]);

const readJpegSize = (b) => {
    let index = 2;
    while (index + 9 < b.length) {
        if (b[index] !== 0xff) return null;
        const marker = b[index + 1];
        if (marker === 0xff) {
            index += 1;
            continue;
        }
        if (JPEG_FRAME_MARKERS.has(marker)) {
            return {
                height: (b[index + 5] << 8) | b[index + 6],
                width: (b[index + 7] << 8) | b[index + 8],
            };
        }
        index += 2 + ((b[index + 2] << 8) | b[index + 3]);
    }
    return null;
};

const readWebpSize = (b) => {
    const chunk = ascii(b, 12, 16);
    if (chunk === "VP8 ") {
        return {
            width: (b[26] | (b[27] << 8)) & 0x3fff,
            height: (b[28] | (b[29] << 8)) & 0x3fff,
        };
    }
    if (chunk === "VP8L") {
        return {
            width: 1 + (((b[22] & 0x3f) << 8) | b[21]),
            height: 1 + (((b[24] & 0x0f) << 10) | (b[23] << 2) | (b[22] >> 6)),
        };
    }
    if (chunk === "VP8X") {
        return {
            width: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)),
            height: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)),
        };
    }
    return null;
};

// The browser re-encodes every upload, so only these formats ever arrive.
// The bytes are checked rather than the declared type, which the client
// controls, and the size is read from the header so a small file cannot
// decode into a huge image on a visitor's phone.
const inspectImage = (b) => {
    if (b.length < 30) return null;
    let format = null;
    if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 12) === "WEBP") {
        format = { ext: "webp", ...readWebpSize(b) };
    } else if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) {
        format = { ext: "jpg", ...readJpegSize(b) };
    } else if (
        [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
            (byte, index) => b[index] === byte,
        )
    ) {
        const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
        format = {
            ext: "png",
            width: view.getUint32(16),
            height: view.getUint32(20),
        };
    }
    return format?.width && format?.height ? format : null;
};

const shortSuffix = () => crypto.randomUUID().slice(0, 8);

export const createSiteContentHandler = ({
    jsonResponse,
    authorize,
    authorizeSiteEditWorkflow,
    githubRequest,
    HttpError,
}) => {
    const assertLength = (request, max, message) => {
        const length = Number(request.headers.get("Content-Length"));
        if (!Number.isFinite(length) || length <= 0) {
            throw new HttpError(411, "요청 크기를 알 수 없습니다.");
        }
        if (length > max) throw new HttpError(413, message);
    };

    const readJson = async (request) => {
        assertLength(request, MAX_JSON_BODY_BYTES, "요청 내용이 너무 큽니다.");
        try {
            return JSON.parse((await request.text()) || "{}");
        } catch {
            throw new HttpError(400, "요청 형식이 올바르지 않습니다.");
        }
    };

    const uploadKey = (id) => `upload:${id}`;
    const jobKey = (jobId) => `job:${jobId}`;

    // An upload reference from the editor: the id the upload call returned.
    const readUploadRef = (value, label) => {
        const match = UPLOAD_ID.exec(text(value));
        if (!match) {
            throw new HttpError(400, `${label}: 사진을 다시 올려주세요.`);
        }
        return { id: match[0], ext: match[1] };
    };

    const branch = (env) => encodeURIComponent(env.GITHUB_REF);

    const readHead = async (env) =>
        (await githubRequest(env, `/git/ref/heads/${branch(env)}`)).object.sha;

    // Reads files as of one commit so every decision in an edit sees the same
    // snapshot. Missing files and folders read as null.
    const createReader = (env, sha) => {
        const contentsPath = (path) =>
            `/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${sha}`;
        const readText = async (path) => {
            try {
                return await githubRequest(env, contentsPath(path), {
                    raw: true,
                });
            } catch (error) {
                if (error.status === 404) return null;
                throw error;
            }
        };
        return {
            text: readText,
            json: async (path) => {
                const body = await readText(path);
                return body === null ? null : JSON.parse(body);
            },
            list: async (path) => {
                try {
                    const entries = await githubRequest(
                        env,
                        contentsPath(path),
                    );
                    return Array.isArray(entries) ? entries : [];
                } catch (error) {
                    if (error.status === 404) return [];
                    throw error;
                }
            },
        };
    };

    // What is still on its way to the site, and what did not make it, comes
    // from the site-edit workflow's own runs: one GitHub call, no stored
    // state that could drift from what actually happened.
    const readEditStatus = async (env) => {
        const { workflow_runs: runs = [] } = await githubRequest(
            env,
            `/actions/workflows/${encodeURIComponent(env.SITE_EDIT_WORKFLOW_ID)}/runs?event=workflow_dispatch&per_page=${RECENT_RUNS}`,
        );
        const pending = new Set();
        const settled = new Set();
        const failed = new Map();
        // Runs come newest first, so the first finished run per item wins.
        for (const run of runs) {
            const target = RUN_TITLE.exec(text(run.display_title))?.[1];
            if (!target) continue;
            if (run.status !== "completed") {
                pending.add(target);
            } else if (!settled.has(target)) {
                settled.add(target);
                const isRecent =
                    Date.now() - Date.parse(run.created_at) < FAILURE_WINDOW_MS;
                if (run.conclusion !== "success" && isRecent) {
                    failed.set(target, run.html_url);
                }
            }
        }
        pending.forEach((target) => failed.delete(target));
        return { pending, failed };
    };

    // Splits the status into the ids of one kind ("news" or "album").
    const statusFor = (status, kind) => {
        const prefix = `${kind}:`;
        const ids = (targets) =>
            [...targets]
                .filter((target) => target.startsWith(prefix))
                .map((target) => target.slice(prefix.length));
        return {
            pending: ids(status.pending),
            failed: Object.fromEntries(
                [...status.failed]
                    .filter(([target]) => target.startsWith(prefix))
                    .map(([target, url]) => [target.slice(prefix.length), url]),
            ),
        };
    };

    // `buildChanges` reads the current head and returns { message, files,
    // overrides, result }. `files` are whole files to write ({ path, text } or
    // { path, upload }) or remove ({ path, delete: true }); `overrides` maps a
    // News id to its new overrides.json entry, or null to drop it, so edits to
    // different items never overwrite each other's entries. The workflow
    // refuses the edit if its item changed on main after `base`.
    const queueChanges = async (env, actor, target, buildChanges) => {
        if ((await readEditStatus(env)).pending.has(target)) {
            throw new HttpError(
                409,
                "이 항목의 이전 저장이 아직 반영 중입니다. 몇 분 뒤 다시 시도해주세요.",
            );
        }

        const base = await readHead(env);
        const {
            message,
            files,
            overrides = {},
            result,
        } = await buildChanges(createReader(env, base));

        const jobId = crypto.randomUUID();
        await env.SITE_EDITS.put(
            jobKey(jobId),
            JSON.stringify({
                id: jobId,
                actor,
                message,
                base,
                target,
                files,
                overrides,
                createdAt: new Date().toISOString(),
            }),
            { expirationTtl: STORE_TTL_SECONDS },
        );

        try {
            await githubRequest(
                env,
                `/actions/workflows/${encodeURIComponent(env.SITE_EDIT_WORKFLOW_ID)}/dispatches`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        ref: env.GITHUB_REF,
                        inputs: { job_id: jobId, target },
                    }),
                },
            );
        } catch (error) {
            await env.SITE_EDITS.delete(jobKey(jobId));
            throw error;
        }

        // The operator is recorded here, in the Worker log, and not in the
        // public commit history.
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

    const handleUpload = async (request, env, actor) => {
        assertLength(request, MAX_IMAGE_BYTES, "사진이 3MB보다 큽니다.");
        const bytes = new Uint8Array(await request.arrayBuffer());
        if (bytes.byteLength > MAX_IMAGE_BYTES) {
            throw new HttpError(413, "사진이 3MB보다 큽니다.");
        }
        const image = inspectImage(bytes);
        if (!image) {
            throw new HttpError(
                400,
                "JPEG, PNG, WebP 사진만 올릴 수 있습니다.",
            );
        }
        if (Math.max(image.width, image.height) > MAX_IMAGE_EDGE) {
            throw new HttpError(
                400,
                `사진은 긴 변 ${MAX_IMAGE_EDGE}px 이하만 올릴 수 있습니다.`,
            );
        }
        const id = `${crypto.randomUUID()}.${image.ext}`;
        await env.SITE_EDITS.put(uploadKey(id), bytes, {
            expirationTtl: STORE_TTL_SECONDS,
        });
        console.log(
            JSON.stringify({ event: "site_content.upload", actor, id }),
        );
        return { id, width: image.width, height: image.height };
    };

    const handleJob = async (request, env, jobId, uploadId) => {
        const { failure, claims } = await authorizeSiteEditWorkflow(
            request,
            env,
        );
        if (failure) return failure;
        try {
            const job = await env.SITE_EDITS.get(jobKey(jobId), "json");
            if (request.method === "DELETE" && !uploadId) {
                if (job) await env.SITE_EDITS.delete(jobKey(jobId));
                return jsonResponse(request, env, { released: Boolean(job) });
            }
            if (request.method !== "GET") {
                throw new HttpError(405, "Method not allowed.");
            }
            if (!job) throw new HttpError(404, "Edit not found or expired.");
            // A token issued before the edit existed belongs to another run.
            if (
                Number(claims.iat) * 1000 <
                Date.parse(job.createdAt) - 60_000
            ) {
                throw new HttpError(403, "Token predates this edit.");
            }
            if (!uploadId) return jsonResponse(request, env, job);
            if (!job.files.some((file) => file.upload === uploadId)) {
                throw new HttpError(404, "Upload is not part of this edit.");
            }
            const bytes = await env.SITE_EDITS.get(
                uploadKey(uploadId),
                "arrayBuffer",
            );
            if (!bytes) throw new HttpError(404, "Upload expired.");
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

    const newsImageFile = (id, upload) =>
        `${id.slice(0, 70)}-${shortSuffix()}.${upload.ext}`;

    const listNews = async (env) => {
        const head = await readHead(env);
        const reader = createReader(env, head);
        const [generated, overrides, status] = await Promise.all([
            reader.json(NEWS_GENERATED_PATH),
            readOverrides(reader),
            readEditStatus(env),
        ]);
        return {
            headSha: head,
            rawBase: rawBase(env, head),
            imagePath: NEWS_IMAGE_PATH,
            items: generated?.items ?? [],
            overrides,
            ...statusFor(status, "news"),
        };
    };

    const createNews = (env, actor, body) => {
        const fields = pickNewsFields(body.fields);
        const id = createNewsId(fields.date, fields.title);
        return queueChanges(env, actor, `news:${id}`, async (reader) => {
            const files = [];
            if (body.image) {
                const upload = readUploadRef(body.image.upload, "사진");
                fields.image = newsImageFile(id, upload);
                files.push({
                    path: `${NEWS_IMAGE_PATH}/${fields.image}`,
                    upload: upload.id,
                });
            }
            assertValid(validateNewsFields(fields));

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
        });
    };

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
                const upload = readUploadRef(body.image.upload, "사진");
                image = newsImageFile(id, upload);
                files.push({
                    path: `${NEWS_IMAGE_PATH}/${image}`,
                    upload: upload.id,
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
                    overridePatch = { [id]: null };
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
            overridePatch = { [id]: overrides[id] };
            return {
                message: `News: hide "${item.title}"`,
                files,
                overrides: overridePatch,
                result: { id, hidden: true },
            };
        });

    // ---------- Photos ----------

    // The album list comes from the generated index rather than one read per
    // album folder, so it stays a fixed number of GitHub calls.
    const listPhotos = async (env) => {
        const head = await readHead(env);
        const reader = createReader(env, head);
        const [index, status] = await Promise.all([
            reader.json(PHOTOS_GENERATED_PATH),
            readEditStatus(env),
        ]);
        return {
            headSha: head,
            rawBase: rawBase(env, head),
            photoPath: PHOTO_CONTENT_PATH,
            thumbDir: PHOTO_THUMB_DIR,
            labs: LAB_KEYS,
            albums: index?.albums ?? [],
            ...statusFor(status, "album"),
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
    // upload ids) into album.json entries plus the files to write and delete.
    // Each photo's small copy lives at thumbs/<same name>.
    const buildAlbumFiles = (albumId, meta, photos, existingFiles) => {
        if (!Array.isArray(photos) || photos.length > MAX_PHOTOS_PER_ALBUM) {
            throw new HttpError(
                400,
                `사진은 앨범당 ${MAX_PHOTOS_PER_ALBUM}장까지 올릴 수 있습니다.`,
            );
        }
        const folder = `${PHOTO_CONTENT_PATH}/${albumId}`;
        const files = [];
        const suffix = shortSuffix();
        const entries = photos.map((photo, index) => {
            const label = `사진 ${index + 1}`;
            let file = text(photo?.file);
            if (photo?.upload) {
                const upload = readUploadRef(photo.upload, label);
                file = `${String(index + 1).padStart(2, "0")}-${suffix}.${upload.ext}`;
                files.push({ path: `${folder}/${file}`, upload: upload.id });
                if (photo.thumb) {
                    const thumb = readUploadRef(photo.thumb, label);
                    if (thumb.ext === upload.ext) {
                        files.push({
                            path: `${folder}/${PHOTO_THUMB_DIR}/${file}`,
                            upload: thumb.id,
                        });
                    }
                }
            } else if (!existingFiles.has(file)) {
                throw new HttpError(
                    409,
                    `${label}: 그 사이 앨범이 바뀌었습니다. 새로 불러온 뒤 다시 저장해주세요.`,
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
            if (kept.has(file)) return;
            files.push({ path: `${folder}/${file}`, delete: true });
            files.push({
                path: `${folder}/${PHOTO_THUMB_DIR}/${file}`,
                delete: true,
            });
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

    const createAlbum = (env, actor, body) => {
        const meta = pickAlbumMeta(body.album);
        const albumId = createAlbumId(meta.date, meta.title);
        return queueChanges(env, actor, `album:${albumId}`, async (reader) => {
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
        });
    };

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

    // Removing album.json is enough: the workflow clears a folder that no
    // longer has one, small copies included.
    const deleteAlbum = (env, actor, albumId) =>
        queueChanges(env, actor, `album:${albumId}`, async (reader) => {
            if (!(await albumImageFiles(reader, albumId)).size)
                throw new HttpError(404, "앨범을 찾을 수 없습니다.");
            return {
                message: `Photos: delete album ${albumId}`,
                files: [
                    {
                        path: `${PHOTO_CONTENT_PATH}/${albumId}/album.json`,
                        delete: true,
                    },
                ],
                result: { id: albumId, deleted: true },
            };
        });

    const readStatus = async (env) => {
        const status = await readEditStatus(env);
        return {
            news: statusFor(status, "news"),
            albums: statusFor(status, "album"),
        };
    };

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
        const route = `${method} ${newsId ? "news/:id" : albumId ? "photos/:id" : url.pathname}`;

        try {
            let payload;
            switch (route) {
                case "GET /v1/site/status":
                    payload = await readStatus(env);
                    break;
                case "POST /v1/site/uploads":
                    payload = await handleUpload(request, env, actor);
                    break;
                case "GET /v1/site/news":
                    payload = await listNews(env);
                    break;
                case "POST /v1/site/news":
                    payload = await createNews(
                        env,
                        actor,
                        await readJson(request),
                    );
                    break;
                case "PUT news/:id":
                    payload = await updateNews(
                        env,
                        actor,
                        newsId,
                        await readJson(request),
                    );
                    break;
                case "DELETE news/:id":
                    payload = await deleteNews(env, actor, newsId);
                    break;
                case "GET /v1/site/photos":
                    payload = await listPhotos(env);
                    break;
                case "POST /v1/site/photos":
                    payload = await createAlbum(
                        env,
                        actor,
                        await readJson(request),
                    );
                    break;
                case "PUT photos/:id":
                    payload = await updateAlbum(
                        env,
                        actor,
                        albumId,
                        await readJson(request),
                    );
                    break;
                case "DELETE photos/:id":
                    payload = await deleteAlbum(env, actor, albumId);
                    break;
                default:
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
