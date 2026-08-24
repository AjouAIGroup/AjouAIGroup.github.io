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

            return {
                ...item,
                id,
                key: normalizeText(item?.key) || id,
                category,
                title,
                research_meta: {
                    author: normalizeText(researchMeta?.author),
                    published_place: normalizeText(
                        researchMeta?.published_place,
                    ),
                    published_date: publishedDate,
                    keywords: normalizeStringList(researchMeta?.keywords),
                    labs: normalizeStringList(researchMeta?.labs),
                    pdf_link: normalizeText(researchMeta?.pdf_link),
                    arxiv_link: normalizeText(researchMeta?.arxiv_link),
                    github_link: normalizeText(
                        researchMeta?.github_link ||
                            researchMeta?.source_code_link,
                    ),
                    project_link: normalizeText(
                        researchMeta?.project_link || researchMeta?.paper_link,
                    ),
                    source_code_link: normalizeText(
                        researchMeta?.source_code_link ||
                            researchMeta?.github_link,
                    ),
                    paper_link: normalizeText(
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
    const categories = Array.from(
        new Set(getAllPublications().map((item) => item.category)),
    );
    return ["all", ...categories];
};

export const getLatestPublications = (limit = 3) =>
    getAllPublications().slice(0, limit);

const VENUE_SHORT_NAMES = [
    "AAAI",
    "ACL",
    "CVPR",
    "ECCV",
    "EMNLP",
    "ICCV",
    "ICLR",
    "ICML",
    "IJCAI",
    "Interspeech",
    "IROS",
    "NeurIPS",
    "NAACL",
    "RSS",
    "WACV",
];

const getVenueShortName = (venue = "") => {
    const normalizedVenue = normalizeText(venue);
    const knownVenue = VENUE_SHORT_NAMES.find((name) =>
        new RegExp(`\\b${name}\\b`, "i").test(normalizedVenue),
    );

    return knownVenue || normalizedVenue || "Other";
};

export const getPublicationYearSnapshot = (year = new Date().getFullYear()) => {
    const targetYear = String(year);
    const publications = getAllPublications().filter((item) =>
        item.research_meta.published_date.startsWith(targetYear),
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
