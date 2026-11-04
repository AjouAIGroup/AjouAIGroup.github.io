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
import { ROOT_DIR, ensureDir, pathExists } from "./lib.mjs";
import {
    MAX_IMAGE_BYTES,
    NEWS_OVERRIDES_PATH,
    PHOTO_CONTENT_PATH,
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
    const { ACTIONS_ID_TOKEN_REQUEST_URL: url, ACTIONS_ID_TOKEN_REQUEST_TOKEN } =
        process.env;
    if (!url) fail("The workflow needs the id-token: write permission.");
    const response = await fetch(
        `${url}&audience=${encodeURIComponent(SITE_EDIT_AUDIENCE)}`,
        { headers: { Authorization: `Bearer ${ACTIONS_ID_TOKEN_REQUEST_TOKEN}` } },
    );
    if (!response.ok) fail(`Identity token request returned ${response.status}`);
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
            fail(`${route} returned ${response.status}: ${await response.text()}`);
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
    const job = await (await callWorker(token, `/v1/site/jobs/${jobId}`)).json();
    await ensureDir(path.resolve(dir, "files"));
    for (const file of job.files) {
        if (file.delete) continue;
        const response = await callWorker(
            token,
            `/v1/site/jobs/${jobId}/files/${file.file}`,
        );
        await fs.writeFile(
            path.resolve(dir, "files", String(file.file)),
            Buffer.from(await response.arrayBuffer()),
        );
    }
    await fs.writeFile(
        path.resolve(dir, "job.json"),
        `${JSON.stringify(job, null, 4)}\n`,
    );
    await fs.writeFile(
        path.resolve(dir, "message.txt"),
        `${job.message}\n\nEdited on the admin page by ${job.actor}.\n`,
    );
    console.log(`Fetched "${job.message}" (${job.files.length} files).`);
};

const assertAllowedPath = (filePath) => {
    const isAllowed =
        ALLOWED_PATHS.some((pattern) => pattern.test(filePath)) &&
        !filePath.split("/").some((part) => part === ".." || part === ".");
    if (!isAllowed) fail(`Refusing to touch ${filePath}`);
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

// album.json is the album's full list, so photos it no longer names are
// removed. That also clears files left by an earlier edit this one did not
// know about.
const tidyAlbum = async (albumDir) => {
    const albumPath = path.resolve(albumDir, "album.json");
    if (!(await pathExists(albumPath))) return;
    const album = JSON.parse(await fs.readFile(albumPath, "utf8"));
    const listed = new Set((album.photos ?? []).map((photo) => photo.file));
    for (const name of await fs.readdir(albumDir)) {
        if (isImageFileName(name) && !listed.has(name)) {
            await fs.rm(path.resolve(albumDir, name));
        }
    }
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
    const albums = new Set();
    for (const file of job.files) {
        assertAllowedPath(file.path);
        const target = path.resolve(ROOT_DIR, file.path);
        if (file.path.startsWith(`${PHOTO_CONTENT_PATH}/`)) {
            albums.add(path.dirname(target));
        }
        if (file.delete) {
            await fs.rm(target, { force: true });
            continue;
        }
        const bytes = await fs.readFile(
            path.resolve(dir, "files", String(file.file)),
        );
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
