import path from "node:path";
import { promises as fs } from "node:fs";
import { GENERATED_DIR, ROOT_DIR, pathExists, writeJsonFile } from "./lib.mjs";
import {
    MAX_IMAGE_BYTES,
    PHOTO_CONTENT_PATH,
    PHOTO_THUMB_DIR,
    isImageFileName,
    validateAlbumMeta,
} from "../../src/utils/siteContentRules.js";

const PHOTOS_CONTENT_DIR = path.resolve(ROOT_DIR, PHOTO_CONTENT_PATH);
// The admin page lists albums from this one file instead of reading every
// album folder through the GitHub API.
const PHOTOS_GENERATED_FILE = path.resolve(
    GENERATED_DIR,
    "photos.generated.json",
);

const listAlbumIds = async () => {
    try {
        return (await fs.readdir(PHOTOS_CONTENT_DIR, { withFileTypes: true }))
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name)
            .sort();
    } catch {
        return [];
    }
};

// The page reads album.json and the image files straight from these folders,
// so a missing file or a photo without alt text has to stop the build here
// rather than surface as a broken image on the site.
const validateAlbum = async (albumId) => {
    const albumDir = path.resolve(PHOTOS_CONTENT_DIR, albumId);
    const label = `${PHOTO_CONTENT_PATH}/${albumId}`;

    let album;
    try {
        album = JSON.parse(
            await fs.readFile(path.resolve(albumDir, "album.json"), "utf8"),
        );
    } catch (error) {
        return [`${label}/album.json could not be read: ${error.message}`];
    }

    const errors = Object.values(validateAlbumMeta(album)).map(
        (message) => `${label}: ${message}`,
    );
    const listed = new Set();

    for (const photo of album.photos ?? []) {
        if (!photo?.file) continue;
        listed.add(photo.file);
        try {
            const { size } = await fs.stat(path.resolve(albumDir, photo.file));
            if (size > MAX_IMAGE_BYTES) {
                errors.push(
                    `${label}: ${photo.file} is ${(size / 1024 / 1024).toFixed(1)} MB; keep photos under 3 MB`,
                );
            }
        } catch {
            errors.push(`${label}: ${photo.file} does not exist`);
        }
    }

    for (const file of await fs.readdir(albumDir)) {
        if (isImageFileName(file) && !listed.has(file)) {
            errors.push(`${label}: ${file} is not listed in album.json`);
        }
    }

    const thumbDir = path.resolve(albumDir, PHOTO_THUMB_DIR);
    if (await pathExists(thumbDir)) {
        for (const file of await fs.readdir(thumbDir)) {
            if (isImageFileName(file) && !listed.has(file)) {
                errors.push(
                    `${label}/${PHOTO_THUMB_DIR}: ${file} has no photo in album.json`,
                );
            }
        }
    }

    return errors;
};

export const validatePhotoContent = async () => {
    const albumIds = await listAlbumIds();
    const errors = (await Promise.all(albumIds.map(validateAlbum))).flat();

    if (errors.length) {
        throw new Error(
            `[content] photo albums are invalid:\n- ${errors.join("\n- ")}`,
        );
    }
};

export const syncPhotoContent = async () => {
    const albums = [];
    for (const id of await listAlbumIds()) {
        const albumDir = path.resolve(PHOTOS_CONTENT_DIR, id);
        const albumPath = path.resolve(albumDir, "album.json");
        if (!(await pathExists(albumPath))) continue;
        const album = JSON.parse(await fs.readFile(albumPath, "utf8"));
        const photos = [];
        for (const photo of album.photos ?? []) {
            photos.push({
                ...photo,
                thumb: await pathExists(
                    path.resolve(albumDir, PHOTO_THUMB_DIR, photo.file),
                ),
            });
        }
        albums.push({ id, ...album, photos });
    }
    albums.sort(
        (left, right) =>
            String(right.date).localeCompare(String(left.date)) ||
            left.id.localeCompare(right.id),
    );
    await writeJsonFile(PHOTOS_GENERATED_FILE, { albums });
    console.log(
        `[photos] synced ${albums.length} albums -> src/generated/photos.generated.json`,
    );
};
