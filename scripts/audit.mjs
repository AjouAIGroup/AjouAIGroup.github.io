import { spawn } from "node:child_process";
import path from "node:path";

const AUDIT_BIN = path.resolve(
    process.cwd(),
    "node_modules/.bin/better-npm-audit",
);
const AUDIT_ARGS = ["audit", "--level", "low"];

// The audit endpoint is a network service that fails independently of this
// repository, and a deploy should not be blocked by npm having a bad minute.
// Its outages read nothing like a real advisory, so only these signatures are
// retried; an actual vulnerability still fails on the first attempt.
const TRANSIENT_PATTERNS = [
    /audit endpoint returned an error/i,
    /unable to process the json buffer string/i,
    /service unavailable/i,
    /\b(?:429|500|502|503|504)\b/,
    /ENOTFOUND|EAI_AGAIN|ETIMEDOUT|ECONNRESET|ECONNREFUSED|socket hang up/i,
    /attempt timed out/i,
];

const RETRY_DELAYS_MS = [5000, 15000, 30000, 60000];

// A registry that accepts the connection and then stalls would otherwise hang
// the job until the runner's own timeout, so each attempt is capped.
const ATTEMPT_TIMEOUT_MS = 120000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Output is mirrored as it arrives so the CI log still shows the audit table,
// and captured so the exit can be classified once the process closes.
const runAudit = () =>
    new Promise((resolve) => {
        const child = spawn(AUDIT_BIN, AUDIT_ARGS, { shell: false });
        let output = "";
        let settled = false;

        const finish = (result) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve(result);
        };

        const timer = setTimeout(() => {
            child.kill("SIGKILL");
            finish({
                code: 1,
                output: `${output}\n[audit] attempt timed out; treating as a registry error.`,
            });
        }, ATTEMPT_TIMEOUT_MS);

        child.stdout.on("data", (chunk) => {
            process.stdout.write(chunk);
            output += chunk;
        });
        child.stderr.on("data", (chunk) => {
            process.stderr.write(chunk);
            output += chunk;
        });

        child.on("error", (error) => {
            finish({ code: 1, output: `${output}\n${error.message}` });
        });
        child.on("close", (code) => {
            finish({ code: code ?? 1, output });
        });
    });

const run = async () => {
    const maxAttempts = RETRY_DELAYS_MS.length + 1;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const { code, output } = await runAudit();

        if (code === 0) {
            if (attempt > 0) {
                console.log(`[audit] passed on attempt ${attempt + 1}`);
            }
            return;
        }

        if (!TRANSIENT_PATTERNS.some((pattern) => pattern.test(output))) {
            process.exitCode = 1;
            return;
        }

        const delayMs = RETRY_DELAYS_MS[attempt];
        if (delayMs === undefined) {
            // Every attempt failed to get an answer out of the registry, which
            // is not the registry reporting a problem with this project. A
            // third-party service we cannot reach must not be able to hold the
            // deploy shut for as long as its outage lasts, so the run carries
            // on and says plainly in the log that nothing was audited.
            console.warn(
                `[audit] SKIPPED: the npm audit endpoint did not answer in ${maxAttempts} attempts.`,
            );
            console.warn(
                "[audit] Dependencies were NOT audited for this run. Re-run the job once registry.npmjs.org recovers.",
            );
            return;
        }

        console.warn(
            `[audit] registry error, retrying in ${delayMs / 1000}s (attempt ${attempt + 2} of ${maxAttempts}).`,
        );
        await sleep(delayMs);
    }
};

run();
