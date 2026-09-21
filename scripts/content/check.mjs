import { runCommand } from "./lib.mjs";

// src/generated is produced purely by parsing text content, so the same
// sources always yield the same bytes on any machine. A diff here after a
// sync means a generated file was hand-edited, or content was committed
// without re-running the sync.
const GENERATED_PATH = "src/generated";

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

const run = async () => {
    const problems = await checkGenerated();

    if (problems.length > 0) {
        console.error("[content] generated output is out of sync:");
        problems.forEach((line) => console.error(line));
        process.exit(1);
    }

    console.log("[content] generated output matches the content sources");
};

run().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
