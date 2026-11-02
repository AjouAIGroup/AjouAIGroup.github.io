import path from "node:path";
import { promises as fs } from "node:fs";
import { CONTENT_DIR } from "./lib.mjs";

const PHOTOS_CONTENT_DIR = path.resolve(CONTENT_DIR, "photos");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const MAX_PHOTO_BYTES = 3 * 1024 * 1024;
const LAB_KEYS = new Set(["cvl", "sail", "hei", "iknow", "lamda"]);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isBlank = (value) => typeof value !== "string" || !value.trim();

// The page reads album.json and the image files straight from these folders,
// so a missing file or a photo without alt text has to stop the build here
// rather than surface as a broken image on the site.
const validateAlbum = async (albumId) => {
    const albumDir = path.resolve(PHOTOS_CONTENT_DIR, albumId);
    const label = `content/photos/${albumId}`;
    const errors = [];

    let album;
    try {
        album = JSON.parse(
            await fs.readFile(path.resolve(albumDir, "album.json"), "utf8"),
        );
    } catch (error) {
        return [`${label}/album.json could not be read: ${error.message}`];
    }

    if (isBlank(album.title)) errors.push(`${label}: title is required`);
    if (!DATE_PATTERN.test(album.date ?? "")) {
        errors.push(`${label}: date must be YYYY-MM-DD`);
    }
    for (const lab of album.labs ?? []) {
        if (!LAB_KEYS.has(lab)) errors.push(`${label}: unknown lab "${lab}"`);
    }

    const photos = Array.isArray(album.photos) ? album.photos : [];
    if (!photos.length) errors.push(`${label}: photos must list at least one`);

    const listed = new Set();
    for (const [index, photo] of photos.entries()) {
        const where = `${label} photo ${index + 1}`;
        if (isBlank(photo?.file)) {
            errors.push(`${where}: file is required`);
            continue;
        }
        if (listed.has(photo.file)) {
            errors.push(`${where}: ${photo.file} is listed twice`);
        }
        listed.add(photo.file);
        if (isBlank(photo.alt)) {
            errors.push(`${where}: alt text is required for ${photo.file}`);
        }
        try {
            const { size } = await fs.stat(path.resolve(albumDir, photo.file));
            if (size > MAX_PHOTO_BYTES) {
                errors.push(
                    `${where}: ${photo.file} is ${(size / 1024 / 1024).toFixed(1)} MB; keep photos under 3 MB`,
                );
            }
        } catch {
            errors.push(`${where}: ${photo.file} does not exist`);
        }
    }

    const files = await fs.readdir(albumDir);
    for (const file of files) {
        if (
            IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()) &&
            !listed.has(file)
        ) {
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
