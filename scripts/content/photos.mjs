import path from "node:path";
import { promises as fs } from "node:fs";
import { ROOT_DIR } from "./lib.mjs";
import {
    MAX_IMAGE_BYTES,
    PHOTO_CONTENT_PATH,
    isImageFileName,
    validateAlbumMeta,
} from "../../src/utils/siteContentRules.js";

const PHOTOS_CONTENT_DIR = path.resolve(ROOT_DIR, PHOTO_CONTENT_PATH);

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

    return errors;
};

export const validatePhotoContent = async () => {
    let entries = [];
    try {
        entries = await fs.readdir(PHOTOS_CONTENT_DIR, { withFileTypes: true });
    } catch {
        return;
    }

    const albumIds = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
    const errors = (await Promise.all(albumIds.map(validateAlbum))).flat();

    if (errors.length) {
        throw new Error(
            `[content] photo albums are invalid:\n- ${errors.join("\n- ")}`,
        );
    }
};
