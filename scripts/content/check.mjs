import { runCommand } from "./lib.mjs";

// `content:sync` is deterministic: the same content/ tree always produces the
// same src/generated output and the same public/uploads renders. That makes a
// non-empty diff after a sync a real signal — someone edited a generated file
// by hand, or committed content without re-running the sync.
const TRACKED_OUTPUT_PATHS = ["src/generated", "public/uploads"];

const run = async () => {
    const { stdout } = await runCommand("git", [
        "status",
        "--porcelain",
        "--",
        ...TRACKED_OUTPUT_PATHS,
    ]);

    if (!stdout) {
        console.log("[content] generated output matches content sources");
        return;
    }

    console.error(
        "[content] generated output is out of sync with content sources:",
    );
    console.error(stdout);
    console.error(
        "\nRun `npm run content:sync` and commit the regenerated files.",
    );
    process.exit(1);
};

run().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
