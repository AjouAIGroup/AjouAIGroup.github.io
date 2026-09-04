import path from "node:path";
import {
    PHOTOS_GENERATED_FILE,
    PUBLIC_DIR,
    readJsonFile,
    relativeFromRoot,
    runCommand,
} from "./lib.mjs";

// src/generated is produced purely by parsing text content, so the same
// sources always yield the same bytes on any machine. A diff here after a
// sync means a generated file was hand-edited, or content was committed
// without re-running the sync.
const GENERATED_PATH = "src/generated";

// public/uploads is different: the renders are JPEGs produced by whichever
// image processor is installed (ImageMagick 7 locally, ImageMagick 6 on the
// CI runner, sips on a macOS box without ImageMagick). Those encoders do not
// agree byte-for-byte, so comparing bytes here fails for reasons that have
// nothing to do with the content. What must hold is that the set of rendered
// files matches the manifest exactly: nothing stale, nothing missing.
const UPLOADS_PATH = "public/uploads";

const statusEntries = async (targetPath) => {
    const { stdout } = await runCommand("git", [
        "status",
        "--porcelain",
        "--",
        targetPath,
    ]);

    return stdout
        .split("\n")
        .filter(Boolean)
        .map((line) => ({
            code: line.slice(0, 2).trim(),
            file: line.slice(3).replace(/^"|"$/g, ""),
        }));
};

const checkGenerated = async () => {
    const entries = await statusEntries(GENERATED_PATH);
    if (entries.length === 0) {
        return [];
    }

    return [
        `${GENERATED_PATH} does not match the content sources:`,
        ...entries.map((entry) => `  ${entry.code} ${entry.file}`),
        "  Run `npm run content:sync` and commit the regenerated files.",
    ];
};

const checkUploads = async () => {
    const manifest = await readJsonFile(PHOTOS_GENERATED_FILE, { items: [] });
    const expected = new Set(
        (manifest.items ?? []).flatMap((item) => [item.full, item.thumbnail]),
    );

    // Added or deleted files are real drift regardless of encoder; modified
    // bytes are not, so ` M` entries are deliberately ignored.
    const entries = await statusEntries(UPLOADS_PATH);
    const added = entries
        .filter((entry) => entry.code === "??")
        .map((entry) => entry.file);
    const removed = entries
        .filter((entry) => entry.code === "D")
        .map((entry) => entry.file);

    const problems = [];

    for (const file of added) {
        const relative = path.relative(PUBLIC_DIR, path.resolve(file));
        if (!expected.has(relative)) {
            problems.push(`  untracked render not in the manifest: ${file}`);
        } else {
            problems.push(`  render is not committed: ${file}`);
        }
    }

    for (const file of removed) {
        problems.push(`  committed render no longer produced: ${file}`);
    }

    if (problems.length === 0) {
        return [];
    }

    return [
        `${UPLOADS_PATH} does not match ${relativeFromRoot(PHOTOS_GENERATED_FILE)}:`,
        ...problems,
        "  Run `npm run content:sync` and commit the result.",
    ];
};

const run = async () => {
    const problems = [
        ...(await checkGenerated()),
        ...(await checkUploads()),
    ];

    if (problems.length > 0) {
        console.error("[content] generated output is out of sync:");
        problems.forEach((line) => console.error(line));
        process.exit(1);
    }

    console.log(
        "[content] generated output matches content sources, and every render in the manifest is committed",
    );
};

run().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
