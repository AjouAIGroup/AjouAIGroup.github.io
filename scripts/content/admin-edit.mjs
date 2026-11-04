// Applies one News or Photos edit queued by the admin Worker. Run by
// .github/workflows/admin-site-edit.yml:
//
//   node scripts/content/admin-edit.mjs fetch <job-id> <dir>
//   node scripts/content/admin-edit.mjs apply <dir>
//   node scripts/content/admin-edit.mjs release <job-id>
//
// `fetch` and `release` call the Worker with the workflow's GitHub identity
// token, which the Worker accepts only from that workflow on the site branch.
import path from "node:path";
import { promises as fs } from "node:fs";
import { ROOT_DIR, ensureDir, pathExists, runCommand } from "./lib.mjs";
import {
    MAX_IMAGE_BYTES,
    NEWS_OVERRIDES_PATH,
    PHOTO_CONTENT_PATH,
    PHOTO_THUMB_DIR,
    isImageFileName,
    validateNewsOverride,
} from "../../src/utils/siteContentRules.js";
import { SITE_EDIT_AUDIENCE } from "../../cloudflare/admin-api/siteContent.js";

const JOB_ID = /^[0-9a-f-]{36}$/;
// The only files an admin edit may touch. overrides.json is changed through
// the job's `overrides` entries, never as a whole file.
const ALLOWED_PATHS = [
    /^content\/news\/[a-z0-9-]+\.md$/,
    /^content\/news\/images\/[A-Za-z0-9._-]+$/,
    /^content\/photos\/[a-z0-9-]+\/[A-Za-z0-9._-]+$/,
    /^content\/photos\/[a-z0-9-]+\/thumbs\/[A-Za-z0-9._-]+$/,
];
const FETCH_ATTEMPTS = 6;

const fail = (message) => {
    console.error(message);
    process.exit(1);
};

const apiUrl = () => {
    const base = String(process.env.ADMIN_API_URL || "").replace(/\/+$/, "");
    if (!base) fail("ADMIN_API_URL is not set.");
    return base;
};

const requestIdentityToken = async () => {
    const {
        ACTIONS_ID_TOKEN_REQUEST_URL: url,
        ACTIONS_ID_TOKEN_REQUEST_TOKEN,
    } = process.env;
    if (!url) fail("The workflow needs the id-token: write permission.");
    const response = await fetch(
        `${url}&audience=${encodeURIComponent(SITE_EDIT_AUDIENCE)}`,
        {
            headers: {
                Authorization: `Bearer ${ACTIONS_ID_TOKEN_REQUEST_TOKEN}`,
            },
        },
    );
    if (!response.ok)
        fail(`Identity token request returned ${response.status}`);
    return (await response.json()).value;
};

// A freshly stored edit can take a few seconds to reach every Cloudflare
// location, so a 404 is retried before giving up.
const callWorker = async (token, route, init = {}) => {
    for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
        const response = await fetch(`${apiUrl()}${route}`, {
            ...init,
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) return response;
        if (response.status !== 404 || attempt === FETCH_ATTEMPTS) {
            fail(
                `${route} returned ${response.status}: ${await response.text()}`,
            );
        }
        await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
    }
    return null;
};

const assertJobId = (jobId) => {
    if (!JOB_ID.test(String(jobId))) fail(`Invalid job id: ${jobId}`);
};

const fetchJob = async (jobId, dir) => {
    assertJobId(jobId);
    const token = await requestIdentityToken();
    const job = await (
        await callWorker(token, `/v1/site/jobs/${jobId}`)
    ).json();
    await ensureDir(path.resolve(dir, "uploads"));
    for (const file of job.files) {
        if (!file.upload) continue;
        const response = await callWorker(
            token,
            `/v1/site/jobs/${jobId}/uploads/${file.upload}`,
        );
        await fs.writeFile(
            path.resolve(dir, "uploads", path.basename(file.upload)),
            Buffer.from(await response.arrayBuffer()),
        );
    }
    await fs.writeFile(
        path.resolve(dir, "job.json"),
        `${JSON.stringify(job, null, 4)}\n`,
    );
    // The operator's address stays in the Worker log; the public history
    // only says the change came from the admin page.
    await fs.writeFile(
        path.resolve(dir, "message.txt"),
        `${job.message}\n\nEdited on the admin page.\n`,
    );
    console.log(`Fetched "${job.message}" (${job.files.length} files).`);
};

const assertAllowedPath = (filePath) => {
    const isAllowed =
        ALLOWED_PATHS.some((pattern) => pattern.test(filePath)) &&
        !filePath.split("/").some((part) => part === ".." || part === ".");
    if (!isAllowed) fail(`Refusing to touch ${filePath}`);
};

const git = async (...args) => (await runCommand("git", args)).stdout;

const readOverridesAt = async (revision) => {
    try {
        return JSON.parse(await git("show", `${revision}:${NEWS_OVERRIDES_PATH}`))
            .items;
    } catch {
        return {};
    }
};

// The edit was built from main as it was at `job.base`. If its item has
// changed on main since, applying it would undo that change (and, for an
// album, drop photos added in between), so the edit stops here and shows as
// failed on the admin page instead.
const assertUnchangedSinceBase = async (job) => {
    try {
        await git("cat-file", "-e", `${job.base}^{commit}`);
    } catch {
        await git("fetch", "--no-tags", "--depth=1", "origin", job.base);
    }
    const guarded = new Set(
        job.files
            .filter((file) => !file.path.startsWith("content/news/images/"))
            .map((file) =>
                file.path.startsWith(`${PHOTO_CONTENT_PATH}/`)
                    ? file.path.split("/").slice(0, 3).join("/")
                    : file.path,
            ),
    );
    if (guarded.size) {
        try {
            await git("diff", "--quiet", job.base, "HEAD", "--", ...guarded);
        } catch {
            fail(
                `${[...guarded].join(", ")} changed on main after this edit was made; save it again from the admin page.`,
            );
        }
    }
    const ids = Object.keys(job.overrides ?? {});
    if (ids.length) {
        const [before, now] = await Promise.all([
            readOverridesAt(job.base),
            readOverridesAt("HEAD"),
        ]);
        const changed = ids.filter(
            (id) => JSON.stringify(before[id]) !== JSON.stringify(now[id]),
        );
        if (changed.length) {
            fail(`News ${changed.join(", ")} changed on main after this edit.`);
        }
    }
};

const applyOverrides = async (patch) => {
    const ids = Object.keys(patch ?? {});
    if (!ids.length) return;
    const filePath = path.resolve(ROOT_DIR, NEWS_OVERRIDES_PATH);
    const current = (await pathExists(filePath))
        ? JSON.parse(await fs.readFile(filePath, "utf8"))
        : { items: {} };
    const items = { ...(current.items ?? {}) };
    for (const id of ids) {
        if (!/^[a-z0-9-]+$/.test(id)) fail(`Invalid News id: ${id}`);
        if (patch[id] === null) {
            delete items[id];
            continue;
        }
        const errors = Object.values(validateNewsOverride(patch[id]));
        if (errors.length) fail(`Override for ${id}: ${errors.join(" ")}`);
        items[id] = patch[id];
    }
    await fs.writeFile(
        filePath,
        `${JSON.stringify({ ...current, items }, null, 4)}\n`,
    );
};

const removeUnlisted = async (dir, listed) => {
    if (!(await pathExists(dir))) return;
    for (const name of await fs.readdir(dir)) {
        if (isImageFileName(name) && !listed.has(name)) {
            await fs.rm(path.resolve(dir, name));
        }
    }
};

// album.json is the album's full list, so photos (and small copies) it no
// longer names are removed, and a folder without album.json is removed
// whole, which is how an album is deleted.
const tidyAlbum = async (albumDir) => {
    const albumPath = path.resolve(albumDir, "album.json");
    if (!(await pathExists(albumPath))) {
        await fs.rm(albumDir, { recursive: true, force: true });
        return;
    }
    const album = JSON.parse(await fs.readFile(albumPath, "utf8"));
    const listed = new Set((album.photos ?? []).map((photo) => photo.file));
    await removeUnlisted(albumDir, listed);
    await removeUnlisted(path.resolve(albumDir, PHOTO_THUMB_DIR), listed);
    for (const file of listed) {
        if (!(await pathExists(path.resolve(albumDir, file)))) {
            fail(`${path.relative(ROOT_DIR, albumDir)} lists missing ${file}`);
        }
    }
};

const applyJob = async (dir) => {
    const job = JSON.parse(
        await fs.readFile(path.resolve(dir, "job.json"), "utf8"),
    );
    job.files.forEach((file) => assertAllowedPath(file.path));
    await assertUnchangedSinceBase(job);

    const albums = new Set();
    for (const file of job.files) {
        const target = path.resolve(ROOT_DIR, file.path);
        if (file.path.startsWith(`${PHOTO_CONTENT_PATH}/`)) {
            albums.add(
                path.resolve(
                    ROOT_DIR,
                    file.path.split("/").slice(0, 3).join("/"),
                ),
            );
        }
        if (file.delete) {
            await fs.rm(target, { force: true });
            continue;
        }
        const bytes = file.upload
            ? await fs.readFile(
                  path.resolve(dir, "uploads", path.basename(file.upload)),
              )
            : Buffer.from(String(file.text ?? ""), "utf8");
        if (isImageFileName(file.path) && bytes.length > MAX_IMAGE_BYTES) {
            fail(`${file.path} is larger than the image limit.`);
        }
        await ensureDir(path.dirname(target));
        await fs.writeFile(target, bytes);
    }
    await applyOverrides(job.overrides);
    for (const albumDir of albums) {
        await tidyAlbum(albumDir);
    }
    console.log(`Applied "${job.message}".`);
};

const releaseJob = async (jobId) => {
    assertJobId(jobId);
    const token = await requestIdentityToken();
    await callWorker(token, `/v1/site/jobs/${jobId}`, { method: "DELETE" });
    console.log(`Released ${jobId}.`);
};

const [command, ...args] = process.argv.slice(2);
if (command === "fetch") await fetchJob(args[0], args[1]);
else if (command === "apply") await applyJob(args[0]);
else if (command === "release") await releaseJob(args[0]);
else fail("Usage: admin-edit.mjs fetch|apply|release ...");
