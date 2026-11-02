import DEADLINE_DATA from "../generated/deadlines.generated.json";

const FALLBACK_AREA_LABEL = "Other";

export const DEADLINE_AREAS = (DEADLINE_DATA.meta?.area_order ?? []).map(
    (key) => ({
        key,
        label: DEADLINE_DATA.meta?.area_labels?.[key] ?? FALLBACK_AREA_LABEL,
    }),
);

// The prerendered page and any browser whose timezone cannot be read show
// this zone; the calendar switches to the reader's own zone once it mounts.
export const DEADLINE_DISPLAY_TIMEZONE =
    DEADLINE_DATA.meta?.display_timezone ?? "Asia/Seoul";

const isSupportedTimeZone = (timeZone) => {
    try {
        new Intl.DateTimeFormat("en-US", { timeZone });
        return true;
    } catch {
        return false;
    }
};

export const getViewerTimeZone = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone && isSupportedTimeZone(timeZone)
        ? timeZone
        : DEADLINE_DISPLAY_TIMEZONE;
};

// Intl has no English abbreviation for most zones outside the US and prints
// "GMT+9" for Seoul, so the zone the site was built around keeps the name
// readers here know it by.
const TIMEZONE_ABBREVIATIONS = { "Asia/Seoul": "KST" };

const formatterCache = new Map();

// Formatters are costly to build and the calendar formats every deadline on
// each render, so one is kept per option set and timezone.
const getFormatter = (name, options, timeZone) => {
    const cacheKey = `${name}|${timeZone}`;
    if (!formatterCache.has(cacheKey)) {
        formatterCache.set(
            cacheKey,
            new Intl.DateTimeFormat(options.locale ?? "en-US", {
                ...options.format,
                timeZone,
            }),
        );
    }
    return formatterCache.get(cacheKey);
};

const DAY_KEY_FORMAT = {
    locale: "en-CA",
    format: { year: "numeric", month: "2-digit", day: "2-digit" },
};
const DAY_TIME_FORMAT = { format: { hour: "numeric", minute: "2-digit" } };
const DATE_TIME_FORMAT = {
    format: { dateStyle: "medium", timeStyle: "short" },
};
const ZONE_NAME_FORMAT = { format: { timeZoneName: "short" } };

// The abbreviation depends on the date because of daylight saving time: a
// deadline in July reads "PDT" and one in January "PST".
export const getTimeZoneAbbreviation = (timeZone, at = new Date()) => {
    if (TIMEZONE_ABBREVIATIONS[timeZone]) {
        return TIMEZONE_ABBREVIATIONS[timeZone];
    }
    const date = asDate(at) ?? new Date();
    return (
        getFormatter("zone", ZONE_NAME_FORMAT, timeZone)
            .formatToParts(date)
            .find((part) => part.type === "timeZoneName")?.value ?? timeZone
    );
};

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

// Every listed deadline belongs to one edition, so the name always carries
// that edition's year, taken from its event dates ("ICRA" held in May 2027
// reads "ICRA 2027"). Keeping the year out of venues.json means a new cycle
// only needs new event dates, never a rename.
const getCycleName = (venue) => {
    const baseName = String(venue.name ?? "")
        .replace(/\s+20\d{2}$/, "")
        .trim();
    const years = String(venue.event?.dates ?? "").match(/20\d{2}/g);
    return years ? `${baseName} ${years[years.length - 1]}` : baseName;
};

export const getAllVenues = () =>
    [...(DEADLINE_DATA.venues ?? [])]
        .map((venue) => ({
            ...venue,
            name: getCycleName(venue),
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

// Each venue publishes its deadline in its own timezone, so a month grid has
// to ask which calendar day the instant lands on in the display timezone
// rather than reading the date out of the raw timestamp.
export const getDeadlineDayParts = (
    deadlineAt,
    timeZone = DEADLINE_DISPLAY_TIMEZONE,
) => {
    const date = asDate(deadlineAt);
    if (!date) {
        return null;
    }

    const parts = getFormatter("day-key", DAY_KEY_FORMAT, timeZone)
        .formatToParts(date)
        .reduce((collected, part) => {
            if (part.type !== "literal") {
                collected[part.type] = part.value;
            }
            return collected;
        }, {});

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

// Organizers often publish only a date ("January 31, 2027") for decisions
// and camera-ready. Such milestones store the end of that day in the stated
// timezone but are shown as the date itself: never moved into the reader's
// timezone, never
// given a clock time or a to-the-second countdown the organizer did not set.
export const isDateOnlyMilestone = (milestone) =>
    milestone?.time_stated === false;

const getStatedDayParts = (deadlineAt) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(deadlineAt ?? ""));
    if (!match) return null;
    const [, year, month, day] = match;
    return {
        key: `${year}-${month}-${day}`,
        year: Number(year),
        month: Number(month),
        day: Number(day),
    };
};

const STATED_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
});

export const formatStatedDate = (deadlineAt) => {
    const parts = getStatedDayParts(deadlineAt);
    return parts
        ? STATED_DATE_FORMATTER.format(new Date(`${parts.key}T00:00:00Z`))
        : "Date unavailable";
};

export const formatDeadlineTimeInDisplayTimezone = (
    deadlineAt,
    timeZone = DEADLINE_DISPLAY_TIMEZONE,
) => {
    const date = asDate(deadlineAt);
    return date
        ? getFormatter("day-time", DAY_TIME_FORMAT, timeZone).format(date)
        : "";
};

// Flattens the venue tree into one deadline per row so the calendar can group
// by day without walking every venue for every cell it draws.
export const getDeadlineCalendarEvents = (
    venues = [],
    timeZone = DEADLINE_DISPLAY_TIMEZONE,
) =>
    venues.flatMap((venue) =>
        (venue.milestones ?? []).flatMap((milestone) => {
            const dateOnly = isDateOnlyMilestone(milestone);
            const dayParts = dateOnly
                ? getStatedDayParts(milestone.deadline_at)
                : getDeadlineDayParts(milestone.deadline_at, timeZone);
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
                    location: venue.event?.location ?? "",
                    kind: milestone.kind,
                    tone: getMilestoneKindTone(milestone.kind),
                    label: milestone.label,
                    shortLabel: milestone.short_label ?? milestone.label,
                    deadlineAt: milestone.deadline_at,
                    dateOnly,
                    timezoneLabel: milestone.timezone_label,
                },
            ];
        }),
    );

// Conference days as calendar spans. Event dates are local calendar days at
// the venue, so they are compared as YYYY-MM-DD keys, never shifted into the
// display timezone the way deadlines are.
export const getConferenceSpans = (venues = []) =>
    venues
        .filter((venue) => venue.event?.start_date && venue.event?.end_date)
        .map((venue) => ({
            id: `${venue.id}-event`,
            venueId: venue.id,
            venueName: venue.name,
            venueFullName: venue.full_name,
            dates: venue.event.dates,
            location: venue.event.location ?? "",
            startKey: venue.event.start_date,
            endKey: venue.event.end_date,
            url: venue.official_url || venue.cfp_url,
        }))
        .sort(
            (left, right) =>
                left.startKey.localeCompare(right.startKey) ||
                right.endKey.localeCompare(left.endKey),
        );

export const formatDeadlineInDisplayTimezone = (
    deadlineAt,
    timeZone = DEADLINE_DISPLAY_TIMEZONE,
) => {
    const date = asDate(deadlineAt);
    if (!date) {
        return "Date unavailable";
    }

    return getFormatter("date-time", DATE_TIME_FORMAT, timeZone).format(date);
};

export const getCountdownLabel = (
    deadlineAt,
    now,
    { dateOnly = false } = {},
) => {
    const deadline = asDate(deadlineAt);
    if (!deadline || !now) {
        return "Calculating…";
    }

    const remainingMs = deadline.getTime() - now.getTime();
    if (remainingMs <= 0) {
        return "Closed";
    }

    if (dateOnly) {
        const days = Math.floor(remainingMs / 86_400_000);
        return days === 0 ? "Today" : `${days} day${days === 1 ? "" : "s"}`;
    }

    const totalSeconds = Math.floor(remainingMs / 1000);
    const days = Math.floor(totalSeconds / 86_400);
    const hours = Math.floor((totalSeconds % 86_400) / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
};
