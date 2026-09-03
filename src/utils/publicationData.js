import PUBLICATION_DATA from "../generated/publications.generated.json";

const parseDateSafe = (value) => {
    const text = typeof value === "string" ? value.trim() : "";
    if (!text) {
        return new Date("1970-01-01T00:00:00");
    }

    const parsed = new Date(`${text}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
        return new Date("1970-01-01T00:00:00");
    }
    return parsed;
};

const normalizeText = (value) =>
    typeof value === "string" ? value.trim() : "";
const normalizeStringList = (value) => {
    if (!Array.isArray(value)) {
        if (typeof value !== "string") {
            return [];
        }

        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return value.map((item) => normalizeText(item)).filter(Boolean);
};

// Historic source files retain the former CVL tag. This keeps that source
// identifier stable while presenting the laboratory's current public name.
const normalizeLabName = (value) =>
    normalizeText(value) === "CVL Lab" ? "MMAI Lab" : normalizeText(value);
const normalizeLabUrl = (value) =>
    normalizeText(value).replace(
        /^https?:\/\/cvl-lab\.github\.io\/?/i,
        "https://mmai-laboratory.github.io/",
    );

export const PUBLICATION_AREA_DEFINITIONS = [
    {
        key: "vision-learning",
        label: "Vision & Learning",
        legacyCategories: ["computer_vision_and_learning_algorithms"],
    },
    {
        key: "embodied-ai-robotics",
        label: "Embodied AI & Robotics",
        legacyCategories: ["robot_learning"],
    },
    {
        key: "knowledge-multimodal-llms",
        label: "Knowledge, Multimodal & LLMs",
        legacyCategories: ["efficient_learning_for_llms"],
    },
    {
        key: "healthcare-ai",
        label: "Healthcare AI",
        legacyCategories: ["industrial_and_medical_ai"],
    },
    {
        key: "speech-generative-ai",
        label: "Speech & Generative AI",
        legacyCategories: [],
    },
];

export const PUBLICATION_AREA_LABELS = Object.fromEntries([
    ["all", "All"],
    ...PUBLICATION_AREA_DEFINITIONS.map(({ key, label }) => [key, label]),
]);

const PUBLICATION_AREA_BY_LEGACY_CATEGORY = Object.fromEntries(
    PUBLICATION_AREA_DEFINITIONS.flatMap(({ key, legacyCategories }) =>
        legacyCategories.map((category) => [category, key]),
    ),
);

const PUBLICATION_AREA_BY_LAB = {
    "MMAI Lab": "vision-learning",
    "HEI Lab": "embodied-ai-robotics",
    "iKnow Lab": "knowledge-multimodal-llms",
    SAIL: "speech-generative-ai",
};

const normalizeAreaKey = (value) =>
    normalizeText(value).toLowerCase().replace(/[\s_]+/g, "-");

export const resolvePublicationAreaKey = (value) => {
    const normalized = normalizeAreaKey(value);

    if (normalized === "all") {
        return "all";
    }

    if (PUBLICATION_AREA_LABELS[normalized]) {
        return normalized;
    }

    const legacyMatch = Object.entries(PUBLICATION_AREA_BY_LEGACY_CATEGORY).find(
        ([legacyCategory]) => normalizeAreaKey(legacyCategory) === normalized,
    );

    return legacyMatch?.[1] ?? null;
};

export const getPublicationAreas = (publication = {}) => {
    const category = normalizeText(publication.category);
    const labs = normalizeStringList(publication?.research_meta?.labs).map(
        normalizeLabName,
    );
    const legacyArea = PUBLICATION_AREA_BY_LEGACY_CATEGORY[category];

    if (legacyArea) {
        return [legacyArea];
    }

    const labArea = labs
        .map((lab) => PUBLICATION_AREA_BY_LAB[lab])
        .find(Boolean);

    return labArea ? [labArea] : [];
};

export const getAllPublications = () =>
    (PUBLICATION_DATA?.items ?? [])
        .map((item, index) => {
            const id = normalizeText(item?.id) || `publication-${index + 1}`;
            const category =
                normalizeText(item?.category) ||
                "computer_vision_and_learning_algorithms";
            const title = normalizeText(item?.title) || "Untitled publication";
            const researchMeta = item?.research_meta ?? {};
            const publishedDate =
                normalizeText(researchMeta?.published_date) || "1970-01-01";
            const areas = getPublicationAreas({
                category,
                research_meta: researchMeta,
            });

            return {
                ...item,
                id,
                key: normalizeText(item?.key) || id,
                category,
                areas,
                primaryArea: areas[0] ?? null,
                title,
                research_meta: {
                    author: normalizeText(researchMeta?.author),
                    published_place: normalizeText(
                        researchMeta?.published_place,
                    ),
                    published_date: publishedDate,
                    keywords: normalizeStringList(researchMeta?.keywords),
                    labs: normalizeStringList(researchMeta?.labs).map(
                        normalizeLabName,
                    ),
                    pdf_link: normalizeLabUrl(researchMeta?.pdf_link),
                    arxiv_link: normalizeLabUrl(researchMeta?.arxiv_link),
                    github_link: normalizeLabUrl(
                        researchMeta?.github_link ||
                            researchMeta?.source_code_link,
                    ),
                    project_link: normalizeLabUrl(
                        researchMeta?.project_link || researchMeta?.paper_link,
                    ),
                    source_code_link: normalizeLabUrl(
                        researchMeta?.source_code_link ||
                            researchMeta?.github_link,
                    ),
                    paper_link: normalizeLabUrl(
                        researchMeta?.paper_link || researchMeta?.project_link,
                    ),
                },
                _parsedDate: parseDateSafe(publishedDate),
            };
        })
        .sort((a, b) => b._parsedDate - a._parsedDate)
        .map((item) => {
            const normalizedItem = { ...item };
            delete normalizedItem._parsedDate;
            return normalizedItem;
        });

export const getPublicationCategories = () => {
    const publicationAreas = new Set(
        getAllPublications().flatMap((item) => item.areas),
    );

    return [
        "all",
        ...PUBLICATION_AREA_DEFINITIONS.map(({ key }) => key).filter((key) =>
            publicationAreas.has(key),
        ),
    ];
};

export const getPublicationYear = (publication) => {
    const publishedDate = normalizeText(
        publication?.research_meta?.published_date,
    );
    const year = publishedDate.slice(0, 4);

    return /^\d{4}$/.test(year) ? year : "Undated";
};

export const getPublicationYears = () =>
    Array.from(new Set(getAllPublications().map(getPublicationYear))).sort(
        (first, second) => {
            if (first === "Undated") return 1;
            if (second === "Undated") return -1;
            return Number(second) - Number(first);
        },
    );

export const getLatestPublications = (limit = 3) =>
    getAllPublications().slice(0, limit);

const VENUE_SHORT_NAMES = [
    "AAAI",
    "ACCV",
    "ACL",
    "BMVC",
    "CoRL",
    "CVPR",
    "ECCV",
    "EMNLP",
    "ICASSP",
    "ICCV",
    "ICDE",
    "ICLR",
    "ICML",
    "ICRA",
    "IJCAI",
    "Interspeech",
    "IROS",
    "LREC",
    "MLHC",
    "NeurIPS",
    "NAACL",
    "RSS",
    "SIGIR",
    "WACV",
];

// Manually curated regular-conference allowlist for the home summary. Do not
// infer a main track from a venue string: journals, workshops, and Findings
// tracks remain in the full archive until a person explicitly reviews a venue.
// For example, "RSS Workshop" is excluded because only the exact "RSS" venue
// appears here.
const SUMMARY_REGULAR_CONFERENCE_VENUES = new Set(
    [
        "AAAI",
        "ACCV",
        "ACL",
        "BMVC",
        "CoRL",
        "CVPR",
        "ECCV",
        "EMNLP",
        "ICASSP",
        "ICCV",
        "ICDE",
        "ICLR",
        "ICML",
        "ICRA",
        "IJCAI",
        "Interspeech",
        "IROS",
        "LREC",
        "MLHC",
        "NAACL",
        "NeurIPS",
        "RSS",
        "SIGIR",
        "WACV",
    ].map((venue) => venue.toLowerCase()),
);

const getVenueBaseName = (venue = "") =>
    normalizeText(venue)
        .replace(/\s*[··-]?\s*20\d{2}\b.*$/u, "")
        .trim();

const getVenueShortName = (venue = "") => {
    const normalizedVenue = normalizeText(venue);
    const knownVenue = VENUE_SHORT_NAMES.find((name) =>
        new RegExp(`\\b${name}\\b`, "i").test(normalizedVenue),
    );

    // The home snapshot is a venue comparison, not a bibliography. Keep a
    // single display rule even for venues outside the curated abbreviation list.
    const venueWithoutYear = getVenueBaseName(normalizedVenue);

    return knownVenue || venueWithoutYear || "Other";
};

const isSummaryEligiblePublication = (publication) => {
    const venue = getVenueBaseName(
        publication?.research_meta?.published_place,
    );

    return SUMMARY_REGULAR_CONFERENCE_VENUES.has(venue.toLowerCase());
};

export const getPublicationYearSnapshot = (year = new Date().getFullYear()) => {
    const targetYear = String(year);
    const publications = getAllPublications().filter(
        (item) =>
            item.research_meta.published_date.startsWith(targetYear) &&
            isSummaryEligiblePublication(item),
    );
    const venueCounts = new Map();

    publications.forEach((item) => {
        const venue = getVenueShortName(item.research_meta.published_place);
        venueCounts.set(venue, (venueCounts.get(venue) ?? 0) + 1);
    });

    return {
        year: targetYear,
        total: publications.length,
        venues: Array.from(venueCounts, ([venue, count]) => ({ venue, count }))
            .sort((first, second) =>
                second.count === first.count
                    ? first.venue.localeCompare(second.venue)
                    : second.count - first.count,
            ),
    };
};
