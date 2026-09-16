import DEADLINE_DATA from "../generated/deadlines.generated.json";

const FALLBACK_AREA_LABEL = "Other";

export const DEADLINE_AREAS = (DEADLINE_DATA.meta?.area_order ?? []).map(
    (key) => ({
        key,
        label: DEADLINE_DATA.meta?.area_labels?.[key] ?? FALLBACK_AREA_LABEL,
    }),
);

export const DEADLINE_DISPLAY_TIMEZONE =
    DEADLINE_DATA.meta?.display_timezone ?? "Asia/Seoul";

const DEADLINE_STATUS_META = {
    verified: { label: "Official CFP verified", tone: "verified" },
    awaiting_cfp: { label: "Awaiting current CFP", tone: "awaiting" },
    needs_review: { label: "Source needs review", tone: "review" },
    estimated: { label: "Estimated", tone: "estimated" },
};

const asDate = (value) => {
    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
};

const CFP_SUBMISSION_KINDS = new Set([
    "abstract",
    "registration",
    "paper",
    "supplementary",
]);

const getCfpSubmissionMilestones = (venue) =>
    (venue.milestones ?? []).filter((milestone) =>
        CFP_SUBMISSION_KINDS.has(milestone.kind),
    );

const getNextUpcomingMilestone = (venue, now) =>
    venue.milestones?.find((milestone) => {
        const deadline = asDate(milestone.deadline_at);
        return deadline && deadline > now;
    }) ?? null;

export const getVenueStatusMeta = (status) =>
    DEADLINE_STATUS_META[status] ?? {
        label: "Source status unavailable",
        tone: "awaiting",
    };

export const getAllVenues = () =>
    [...(DEADLINE_DATA.venues ?? [])]
        .map((venue) => ({
            ...venue,
            milestones: [...(venue.milestones ?? [])].sort(
                (left, right) =>
                    Date.parse(left.deadline_at) -
                    Date.parse(right.deadline_at),
            ),
        }))
        .sort((left, right) => {
            const leftHasMilestones = left.milestones.length > 0;
            const rightHasMilestones = right.milestones.length > 0;
            if (leftHasMilestones !== rightHasMilestones) {
                return leftHasMilestones ? -1 : 1;
            }
            return left.name.localeCompare(right.name);
        });

export const getDefaultMilestoneId = (venue, now = new Date()) => {
    const nextMilestone = getNextUpcomingMilestone(venue, now);
    if (nextMilestone) {
        return nextMilestone.id;
    }

    const submissionMilestones = getCfpSubmissionMilestones(venue);
    const mostRecentSubmissionMilestone = submissionMilestones
        .filter((milestone) => {
            const deadline = asDate(milestone.deadline_at);
            return deadline && deadline <= now;
        })
        .at(-1);

    if (mostRecentSubmissionMilestone) {
        return mostRecentSubmissionMilestone.id;
    }

    return venue.milestones?.at(-1)?.id ?? null;
};

export const getVenueCfpState = (venue, now = new Date()) => {
    const milestones = getCfpSubmissionMilestones(venue);
    if (!milestones.length) {
        return venue.status === "awaiting_cfp"
            ? { label: "Current CFP awaiting", tone: "awaiting" }
            : { label: "Submission dates unavailable", tone: "review" };
    }

    const nextMilestone = getNextUpcomingMilestone(venue, now);
    if (!nextMilestone) {
        return { label: "Main CFP closed", tone: "closed" };
    }

    if (CFP_SUBMISSION_KINDS.has(nextMilestone.kind)) {
        return { label: "Main CFP open", tone: "open" };
    }

    if (nextMilestone.kind === "notification") {
        return { label: "Decision pending", tone: "in-progress" };
    }

    if (nextMilestone.kind === "review" || nextMilestone.kind === "rebuttal") {
        return { label: "Review in progress", tone: "in-progress" };
    }

    if (nextMilestone.kind === "camera-ready") {
        return { label: "Camera-ready pending", tone: "in-progress" };
    }

    return { label: "Schedule in progress", tone: "in-progress" };
};

// Each venue publishes its deadline in its own timezone, so a month grid has
// to ask which calendar day the instant lands on in the display timezone
// rather than reading the date out of the raw timestamp.
const DAY_KEY_FORMATTER = new Intl.DateTimeFormat("en-CA", {
    timeZone: DEADLINE_DISPLAY_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

const DAY_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
    timeZone: DEADLINE_DISPLAY_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
});

const MILESTONE_KIND_TONES = {
    abstract: "submission",
    registration: "submission",
    paper: "submission",
    supplementary: "submission",
    review: "review",
    rebuttal: "review",
    notification: "notification",
    "camera-ready": "camera-ready",
};

export const toDeadlineDayKey = (year, month, day) =>
    `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const getDeadlineDayParts = (deadlineAt) => {
    const date = asDate(deadlineAt);
    if (!date) {
        return null;
    }

    const parts = DAY_KEY_FORMATTER.formatToParts(date).reduce(
        (collected, part) => {
            if (part.type !== "literal") {
                collected[part.type] = part.value;
            }
            return collected;
        },
        {},
    );

    const year = Number.parseInt(parts.year, 10);
    const month = Number.parseInt(parts.month, 10);
    const day = Number.parseInt(parts.day, 10);

    if (!year || !month || !day) {
        return null;
    }

    return { year, month, day, key: toDeadlineDayKey(year, month, day) };
};

export const getMilestoneKindTone = (kind) =>
    MILESTONE_KIND_TONES[kind] ?? "other";

export const formatDeadlineTimeInDisplayTimezone = (deadlineAt) => {
    const date = asDate(deadlineAt);
    return date ? DAY_TIME_FORMATTER.format(date) : "";
};

// Flattens the venue tree into one deadline per row so the calendar can group
// by day without walking every venue for every cell it draws.
export const getDeadlineCalendarEvents = (venues = []) =>
    venues.flatMap((venue) =>
        (venue.milestones ?? []).flatMap((milestone) => {
            const dayParts = getDeadlineDayParts(milestone.deadline_at);
            if (!dayParts) {
                return [];
            }

            return [
                {
                    id: `${venue.id}-${milestone.id}`,
                    dayKey: dayParts.key,
                    year: dayParts.year,
                    month: dayParts.month,
                    day: dayParts.day,
                    venueId: venue.id,
                    venueName: venue.name,
                    venueFullName: venue.full_name,
                    cfpUrl: venue.cfp_url,
                    kind: milestone.kind,
                    tone: getMilestoneKindTone(milestone.kind),
                    label: milestone.label,
                    shortLabel: milestone.short_label ?? milestone.label,
                    deadlineAt: milestone.deadline_at,
                    timezoneLabel: milestone.timezone_label,
                },
            ];
        }),
    );

export const formatDeadlineInDisplayTimezone = (deadlineAt) => {
    const date = asDate(deadlineAt);
    if (!date) {
        return "Date unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: DEADLINE_DISPLAY_TIMEZONE,
    }).format(date);
};

export const getCountdownLabel = (deadlineAt, now) => {
    const deadline = asDate(deadlineAt);
    if (!deadline || !now) {
        return "Calculating…";
    }

    const remainingMs = deadline.getTime() - now.getTime();
    if (remainingMs <= 0) {
        return "Closed";
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const days = Math.floor(totalSeconds / 86_400);
    const hours = Math.floor((totalSeconds % 86_400) / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
};
