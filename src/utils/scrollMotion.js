const PROGRAMMATIC_SCROLL_EVENT = "cvl-section-scroll";
const PROGRAMMATIC_SCROLL_DURATION_MS = 760;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

let activeFrameId = null;
let activeTimeoutId = null;

const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

export const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const resolveScrollBehavior = (behavior = "smooth") =>
    behavior === "smooth" && prefersReducedMotion() ? "auto" : behavior;

const cancelActiveScroll = () => {
    if (typeof window === "undefined") {
        return;
    }

    if (
        activeFrameId !== null &&
        typeof window.cancelAnimationFrame === "function"
    ) {
        window.cancelAnimationFrame(activeFrameId);
    }

    if (activeTimeoutId !== null) {
        window.clearTimeout(activeTimeoutId);
    }

    activeFrameId = null;
    activeTimeoutId = null;
};

export const notifyProgrammaticScroll = (
    duration = PROGRAMMATIC_SCROLL_DURATION_MS,
) => {
    if (typeof window === "undefined") {
        return;
    }

    window.dispatchEvent(
        new CustomEvent(PROGRAMMATIC_SCROLL_EVENT, {
            detail: { duration },
        }),
    );
};

export const scrollWindowTo = ({
    top,
    behavior = "smooth",
    duration = PROGRAMMATIC_SCROLL_DURATION_MS,
    notify = true,
}) => {
    if (typeof window === "undefined") {
        return;
    }

    const nextTop = Math.max(top, 0);
    const resolvedBehavior = resolveScrollBehavior(behavior);

    cancelActiveScroll();

    if (notify) {
        notifyProgrammaticScroll(duration);
    }

    if (resolvedBehavior !== "smooth") {
        window.scrollTo({ top: nextTop, behavior: "auto" });
        return;
    }

    const startTop = window.scrollY;
    const distance = nextTop - startTop;

    if (Math.abs(distance) < 2) {
        window.scrollTo({ top: nextTop, behavior: "auto" });
        return;
    }

    let startTime = null;
    const requestFrame =
        window.requestAnimationFrame ??
        ((callback) => {
            activeTimeoutId = window.setTimeout(
                () => callback(window.performance.now()),
                16,
            );
            return null;
        });

    const step = (now) => {
        if (startTime === null) {
            startTime = now;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);

        window.scrollTo({
            top: startTop + distance * easedProgress,
            behavior: "auto",
        });

        if (progress < 1) {
            activeFrameId = requestFrame(step);
            return;
        }

        activeFrameId = null;
        activeTimeoutId = null;
    };

    activeFrameId = requestFrame(step);
};
