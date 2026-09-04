import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import YAML from "yaml";

const execFileAsync = promisify(execFile);

export const ROOT_DIR = process.cwd();
export const CONTENT_DIR = path.resolve(ROOT_DIR, "content");
export const GENERATED_DIR = path.resolve(ROOT_DIR, "src/generated");
export const PUBLIC_DIR = path.resolve(ROOT_DIR, "public");

export const NEWS_CONTENT_DIR = path.resolve(CONTENT_DIR, "news");
export const PUBLICATIONS_CONTENT_DIR = path.resolve(
    CONTENT_DIR,
    "publications",
);
export const PHOTOS_CONTENT_DIR = path.resolve(CONTENT_DIR, "photos");
export const SOURCES_CONTENT_DIR = path.resolve(CONTENT_DIR, "sources");
export const SOURCES_CACHE_DIR = path.resolve(SOURCES_CONTENT_DIR, "cache");
export const PHOTOS_RAW_DIR = path.resolve(PHOTOS_CONTENT_DIR, "raw");
export const PHOTOS_METADATA_FILE = path.resolve(
    PHOTOS_CONTENT_DIR,
    "metadata.json",
);
export const PHOTO_UPLOADS_DIR = path.resolve(PUBLIC_DIR, "uploads/photos");

export const NEWS_GENERATED_FILE = path.resolve(
    GENERATED_DIR,
    "news.generated.json",
);
export const PUBLICATIONS_GENERATED_FILE = path.resolve(
    GENERATED_DIR,
    "publications.generated.json",
);
export const PHOTOS_GENERATED_FILE = path.resolve(
    GENERATED_DIR,
    "photos.generated.json",
);

export const EXTERNAL_NEWS_FILE = path.resolve(
    SOURCES_CACHE_DIR,
    "news.json",
);
export const EXTERNAL_PUBLICATIONS_FILE = path.resolve(
    SOURCES_CACHE_DIR,
    "publications.json",
);
export const EXTERNAL_SYNC_REPORT_FILE = path.resolve(
    SOURCES_CACHE_DIR,
    "last-sync-report.json",
);

export const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export const ensureDir = async (targetDir) => {
    await fs.mkdir(targetDir, { recursive: true });
};

export const pathExists = async (targetPath) => {
    try {
        await fs.access(targetPath);
        return true;
    } catch {
        return false;
    }
};

export const readJsonFile = async (filePath, fallback = null) => {
    try {
        const raw = await fs.readFile(filePath, "utf8");
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
};

export const writeJsonFile = async (filePath, data) => {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
};

const FRONTMATTER_BOUNDARY = "---";

const FRONTMATTER_PATTERN = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

export const parseMarkdownFrontmatter = (rawContent, filePath) => {
    const content = rawContent.startsWith("\uFEFF")
        ? rawContent.slice(1)
        : rawContent;

    if (!content.startsWith(FRONTMATTER_BOUNDARY)) {
        return {
            data: {},
            body: content.trim(),
        };
    }

    const matched = content.match(FRONTMATTER_PATTERN);

    if (!matched) {
        throw new Error(`Invalid frontmatter block in ${filePath}`);
    }

    const frontmatterBlock = matched[1] ?? "";
    const body = content.slice(matched[0].length).trim();

    let data = {};

    if (frontmatterBlock.trim()) {
        try {
            data = YAML.parse(frontmatterBlock, { schema: "core" }) ?? {};
        } catch (error) {
            throw new Error(
                `Invalid frontmatter in ${filePath}: ${error.message || String(error)}`,
            );
        }

        if (typeof data !== "object" || data === null || Array.isArray(data)) {
            throw new Error(`Invalid frontmatter map in ${filePath}`);
        }
    }

    return { data, body };
};

export const listMarkdownFiles = async (rootDir) => {
    const files = [];

    if (!(await pathExists(rootDir))) {
        return files;
    }

    const walk = async (currentDir) => {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        const sortedEntries = [...entries].sort((a, b) =>
            a.name.localeCompare(b.name),
        );

        for (const entry of sortedEntries) {
            if (entry.name.startsWith(".")) {
                continue;
            }

            const absolutePath = path.resolve(currentDir, entry.name);

            if (entry.isDirectory()) {
                await walk(absolutePath);
                continue;
            }

            if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
                files.push(absolutePath);
            }
        }
    };

    await walk(rootDir);
    return files;
};

export const listImageFiles = async (rootDir) => {
    const files = [];

    if (!(await pathExists(rootDir))) {
        return files;
    }

    const walk = async (currentDir) => {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        const sortedEntries = [...entries].sort((a, b) =>
            a.name.localeCompare(b.name),
        );

        for (const entry of sortedEntries) {
            if (entry.name.startsWith(".")) {
                continue;
            }

            const absolutePath = path.resolve(currentDir, entry.name);

            if (entry.isDirectory()) {
                await walk(absolutePath);
                continue;
            }

            if (!entry.isFile()) {
                continue;
            }

            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTENSIONS.has(ext)) {
                files.push(absolutePath);
            }
        }
    };

    await walk(rootDir);
    return files;
};

export const normalizeSlug = (value) =>
    String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const isIsoDate = (value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ""));

export const inferDateFromText = (value) => {
    const raw = String(value ?? "");
    const ymdDashed = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (ymdDashed) {
        return `${ymdDashed[1]}-${ymdDashed[2]}-${ymdDashed[3]}`;
    }

    const ymdCompact = raw.match(/(20\d{2})(\d{2})(\d{2})/);
    if (ymdCompact) {
        return `${ymdCompact[1]}-${ymdCompact[2]}-${ymdCompact[3]}`;
    }

    return null;
};

export const normalizeHttpUrl = (value) => {
    const text = String(value ?? "").trim();
    if (!text) return "";

    try {
        const parsed = new URL(text);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return "";
        }
        return parsed.toString();
    } catch {
        return "";
    }
};

export const toYear = (isoDate) =>
    Number.parseInt(String(isoDate).slice(0, 4), 10);

export const getNowIso = () => new Date().toISOString();

export const runCommand = async (command, args, opts = {}) => {
    const { stdout, stderr } = await execFileAsync(command, args, opts);
    return { stdout: stdout?.trim() ?? "", stderr: stderr?.trim() ?? "" };
};

export const commandExists = async (command) => {
    try {
        await runCommand("which", [command]);
        return true;
    } catch {
        return false;
    }
};

export const relativeFromRoot = (targetPath) =>
    path.relative(ROOT_DIR, targetPath);
