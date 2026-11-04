import path from "node:path";
import { promises as fs } from "node:fs";
import {
    CONTENT_DIR,
    NEWS_CONTENT_DIR,
    ROOT_DIR,
    EXTERNAL_NEWS_FILE,
    NEWS_GENERATED_FILE,
    isIsoDate,
    listMarkdownFiles,
    normalizeHttpUrl,
    normalizeSlug,
    parseMarkdownFrontmatter,
    relativeFromRoot,
    toYear,
    writeJsonFile,
} from "./lib.mjs";
import { syncPublicationContent } from "./publications.mjs";
import {
    MAX_IMAGE_BYTES,
    NEWS_IMAGE_PATH,
    NEWS_OVERRIDES_PATH,
    NEWS_OVERRIDE_FIELDS,
    NEWS_TYPE_LABELS,
    NEWS_TYPES as SHARED_NEWS_TYPES,
    isImageFileName,
    validateNewsOverride,
} from "../../src/utils/siteContentRules.js";

const NEWS_TYPES = new Set(SHARED_NEWS_TYPES);
const TYPE_LABELS = NEWS_TYPE_LABELS;

const PAPER_ACCEPTED_TYPE = "paper_accepted";
const AUTO_PUBLICATION_SOURCE = "publications-auto";
// Short titles could appear inside unrelated text, so only titles at least
// this long (as a slug) are matched against lab announcements.
const MIN_ANNOUNCED_TITLE_LENGTH = 20;

const normalizeText = (value) => String(value ?? "").trim();

const DEADLINE_VENUES_FILE = path.resolve(CONTENT_DIR, "deadlines/venues.json");
const YEAR_ONLY_DATE = /^\d{4}-01-01$/;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Acceptance dates of the conference editions the calendar tracks, keyed by
// "EMNLP 2026". The edition's year is the year it is held, as on the calendar.
const loadAcceptanceDates = async () => {
    const data = JSON.parse(await fs.readFile(DEADLINE_VENUES_FILE, "utf8"));
    return (data.venues ?? []).flatMap((venue) => {
        const years = String(venue.event?.dates ?? "").match(/20\d{2}/g);
        const notification = (venue.milestones ?? [])
            .filter((milestone) => milestone.kind === "notification")
            .map((milestone) => milestone.deadline_at.slice(0, 10))
            .sort()[0];
        const name = String(venue.name ?? "").replace(/\s+20\d{2}$/, "");
        return years && notification && name
            ? [{ name, year: years.at(-1), date: notification }]
            : [];
    });
};

// Lab sites and the Sheet usually give a paper only its year, stored as
// January 1, which would file every acceptance at the very bottom of its
// year. The news date is therefore, in order: a real publication date; the
// venue's acceptance notification (main track and Findings, not workshops);
// the day the paper was added to the site, if that is in the paper's own
// year; and only then the year-only date. Nothing here reads the clock, so
// the generated file stays the same whenever it is rebuilt.
const resolvePaperNewsDate = (publicationItem, acceptanceDates) => {
    const publishedDate = normalizeText(
        publicationItem.research_meta?.published_date,
    );
    if (!YEAR_ONLY_DATE.test(publishedDate)) return publishedDate;

    const year = publishedDate.slice(0, 4);
    const venue = normalizeText(publicationItem.research_meta?.published_place);
    if (!/workshop/i.test(venue)) {
        const acceptance = acceptanceDates.find(
            (entry) =>
                entry.year === year &&
                new RegExp(`\\b${escapeRegExp(entry.name)}\\b`).test(venue),
        );
        if (acceptance) return acceptance.date;
    }

    const addedDate = normalizeText(publicationItem.added_at).slice(0, 10);
    return addedDate.startsWith(year) ? addedDate : publishedDate;
};

const isGenericPaperAcceptedTitle = (value) =>
    /^paper\s+accepted\b/i.test(normalizeText(value));

const normalizePaperKey = (date, title) =>
    `${normalizeText(date)}::${normalizeSlug(title)}`;

const requiredError = (filePath, fieldName, message = "is required") =>
    `[news] ${relativeFromRoot(filePath)}: "${fieldName}" ${message}`;

const validateType = (value, filePath) => {
    const type = normalizeText(value);
    if (!type) {
        throw new Error(requiredError(filePath, "type"));
    }
    if (!NEWS_TYPES.has(type)) {
        throw new Error(
            `[news] ${relativeFromRoot(filePath)}: unsupported type "${type}". Allowed: ${Array.from(NEWS_TYPES).join(", ")}`,
        );
    }
    return type;
};

const parseNewsFile = async (filePath) => {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, body } = parseMarkdownFrontmatter(raw, filePath);
    const id =
        normalizeText(data.id) || normalizeSlug(path.basename(filePath, ".md"));
    const title = normalizeText(data.title);
    const date = normalizeText(data.date);
    const type = validateType(data.type, filePath);
    const summary =
        normalizeText(data.summary) || body.split("\n")[0]?.trim() || "";
    const venue = normalizeText(data.venue);
    const relatedPerson = normalizeText(data.related_person);
    const externalUrl = normalizeHttpUrl(data.external_url);
    const internalSlug =
        normalizeText(data.internal_slug) || normalizeSlug(id || title);
    const isExternal = data.is_external === true || Boolean(externalUrl);
    const featured = data.featured === true;
    const publicationId = normalizeText(data.publication_id);
    const publicationTitle = normalizeText(data.publication_title);
    const image = normalizeText(data.image);
    const imageAlt = normalizeText(data.image_alt);
    const publicationQueryInput = normalizeText(data.publication_query);
    const publicationQuery =
        publicationQueryInput ||
        publicationTitle ||
        (type === PAPER_ACCEPTED_TYPE && !isGenericPaperAcceptedTitle(title)
            ? title
            : "");

    if (!id) {
        throw new Error(requiredError(filePath, "id"));
    }
    if (!title) {
        throw new Error(requiredError(filePath, "title"));
    }
    if (!date) {
        throw new Error(requiredError(filePath, "date"));
    }
    if (!isIsoDate(date)) {
        throw new Error(
            `[news] ${relativeFromRoot(filePath)}: "date" must be YYYY-MM-DD (received "${date}")`,
        );
    }
    if (!summary) {
        throw new Error(requiredError(filePath, "summary"));
    }
    if (isExternal && !externalUrl) {
        throw new Error(
            `[news] ${relativeFromRoot(filePath)}: external item requires a valid "external_url"`,
        );
    }
    if (image) {
        await assertNewsImage(image, relativeFromRoot(filePath));
        if (!imageAlt) {
            throw new Error(requiredError(filePath, "image_alt", "is required with an image"));
        }
    }

    return {
        id,
        type,
        title,
        summary,
        date,
        year: toYear(date),
        related_person: relatedPerson,
        venue,
        external_url: externalUrl,
        internal_slug: internalSlug,
        is_external: isExternal,
        featured,
        publication_id: publicationId,
        publication_title: publicationTitle,
        publication_query: publicationQuery,
        generated_from: "",
        image,
        image_alt: imageAlt,
        // Lets the admin editor find the file behind an item it was asked to
        // change; items from other sources have no file of their own.
        source_path: relativeFromRoot(filePath),
    };
};

const NEWS_IMAGE_DIR = path.resolve(ROOT_DIR, NEWS_IMAGE_PATH);
const NEWS_OVERRIDES_FILE = path.resolve(ROOT_DIR, NEWS_OVERRIDES_PATH);

const assertNewsImage = async (fileName, label) => {
    if (!isImageFileName(fileName) || fileName.includes("/")) {
        throw new Error(`[news] ${label}: image "${fileName}" must be a file name in ${NEWS_IMAGE_PATH}`);
    }
    let size;
    try {
        ({ size } = await fs.stat(path.resolve(NEWS_IMAGE_DIR, fileName)));
    } catch {
        throw new Error(`[news] ${label}: image ${NEWS_IMAGE_PATH}/${fileName} does not exist`);
    }
    if (size > MAX_IMAGE_BYTES) {
        throw new Error(`[news] ${label}: image ${fileName} is larger than 3 MB`);
    }
};

// Operators can retitle, re-summarize, illustrate, or hide any News item from
// the admin page, including ones pulled from lab sites and generated from
// publications. Those sources are rebuilt on every refresh, so the edits live
// here and are applied on top each time. An entry whose item has disappeared
// from its source is ignored rather than failing the build.
const loadNewsOverrides = async () => {
    let data;
    try {
        data = JSON.parse(await fs.readFile(NEWS_OVERRIDES_FILE, "utf8"));
    } catch (error) {
        if (error?.code === "ENOENT") return {};
        throw new Error(`[news] Cannot read ${NEWS_OVERRIDES_PATH}: ${error.message}`);
    }
    const items = data?.items ?? {};
    for (const [id, override] of Object.entries(items)) {
        const errors = Object.values(validateNewsOverride(override));
        if (errors.length) {
            throw new Error(`[news] ${NEWS_OVERRIDES_PATH} "${id}": ${errors.join(" ")}`);
        }
        if (override.image) {
            await assertNewsImage(override.image, `${NEWS_OVERRIDES_PATH} "${id}"`);
        }
    }
    return items;
};

const applyNewsOverrides = (newsItems, overrides) =>
    newsItems.flatMap((item) => {
        const override = overrides[item.id];
        if (!override) return [item];
        if (override.hidden === true) return [];
        const changes = Object.fromEntries(
            NEWS_OVERRIDE_FIELDS.filter((field) => field in override).map(
                (field) => [field, normalizeText(override[field])],
            ),
        );
        return [{ ...item, ...changes, edited: true }];
    });

const parseExternalNewsItem = (rawItem) => {
    const id = normalizeText(rawItem?.id);
    const type = validateType(rawItem?.type, EXTERNAL_NEWS_FILE);
    const title = normalizeText(rawItem?.title);
    const summary = normalizeText(rawItem?.summary);
    const date = normalizeText(rawItem?.date);
    const externalUrl = normalizeHttpUrl(rawItem?.external_url);

    if (!id || !title || !summary || !isIsoDate(date) || !externalUrl) {
        throw new Error(`[news] Invalid external news item "${id || "unknown"}".`);
    }

    return {
        id,
        type,
        title,
        summary,
        date,
        year: toYear(date),
        related_person: normalizeText(rawItem?.related_person),
        venue: normalizeText(rawItem?.venue),
        external_url: externalUrl,
        internal_slug: normalizeSlug(rawItem?.internal_slug || id || title),
        is_external: true,
        featured: rawItem?.featured === true,
        publication_id: normalizeText(rawItem?.publication_id),
        publication_title: normalizeText(rawItem?.publication_title),
        publication_query: normalizeText(rawItem?.publication_query),
        generated_from: normalizeText(rawItem?.generated_from || "external-source"),
    };
};

const loadExternalNewsItems = async () => {
    const data = await (async () => {
        try {
            const raw = await fs.readFile(EXTERNAL_NEWS_FILE, "utf8");
            return JSON.parse(raw);
        } catch (error) {
            if (error?.code === "ENOENT") {
                return { items: [] };
            }
            throw new Error(`[news] Cannot read external news cache: ${error.message || error}`);
        }
    })();

    if (!Array.isArray(data?.items)) {
        throw new Error("[news] External news cache must contain an items array.");
    }

    return data.items.map(parseExternalNewsItem);
};

const createAutoPublicationNewsItem = (publicationItem, newsDate) => {
    const publicationId = normalizeText(publicationItem.id);
    const publicationTitle = normalizeText(publicationItem.title);
    const publicationSummary = normalizeText(publicationItem.summary);
    const publicationDate = normalizeText(newsDate);
    const publicationVenue = normalizeText(
        publicationItem.research_meta?.published_place,
    );
    const publicationAuthors = normalizeText(
        publicationItem.research_meta?.author,
    );
    const publicationLabs = Array.isArray(publicationItem.research_meta?.labs)
        ? publicationItem.research_meta.labs.map(normalizeText).filter(Boolean)
        : [];
    const publicationLabLabel = publicationLabs.join(", ") || "AAIG";

    const summary =
        publicationSummary ||
        (publicationVenue
            ? `${publicationVenue} publication update from ${publicationLabLabel}.`
            : `Publication update from ${publicationLabLabel}.`);

    return {
        id: `publication-${publicationId}`,
        type: PAPER_ACCEPTED_TYPE,
        title: publicationTitle,
        summary,
        date: publicationDate,
        year: toYear(publicationDate),
        related_person: publicationAuthors,
        venue: publicationVenue,
        external_url: "",
        internal_slug: normalizeSlug(`publication-${publicationId}`),
        is_external: false,
        featured: false,
        publication_id: publicationId,
        publication_title: publicationTitle,
        publication_query: publicationTitle,
        generated_from: AUTO_PUBLICATION_SOURCE,
    };
};

const mergePublicationNewsItems = (
    manualItems,
    publicationItems,
    acceptanceDates,
) => {
    const mergedItems = [...manualItems];
    const seenIds = new Set(manualItems.map((item) => item.id));
    const manualPublicationIds = new Set(
        manualItems
            .map((item) => normalizeText(item.publication_id))
            .filter(Boolean),
    );
    // A lab's own announcement often names several papers in one item, with
    // the real acceptance date. Its papers then need no separate generated
    // item, which would repeat them under the year-only publication date.
    const announcedText = manualItems
        .filter((item) => item.type === PAPER_ACCEPTED_TYPE)
        .map((item) => normalizeSlug(`${item.title} ${item.summary}`));
    const isAnnounced = (publicationItem) => {
        const titleSlug = normalizeSlug(publicationItem.title);
        return (
            titleSlug.length >= MIN_ANNOUNCED_TITLE_LENGTH &&
            announcedText.some((text) => text.includes(titleSlug))
        );
    };
    const manualPaperKeys = new Set(
        manualItems
            .filter((item) => item.type === PAPER_ACCEPTED_TYPE)
            .map((item) =>
                normalizePaperKey(
                    item.date,
                    item.publication_title || item.title,
                ),
            )
            .filter(Boolean),
    );

    publicationItems
        .filter((item) => normalizeText(item.status) === "published")
        .forEach((publicationItem) => {
            const autoNews = createAutoPublicationNewsItem(
                publicationItem,
                resolvePaperNewsDate(publicationItem, acceptanceDates),
            );
            const paperKey = normalizePaperKey(
                autoNews.date,
                autoNews.publication_title || autoNews.title,
            );

            if (seenIds.has(autoNews.id)) {
                return;
            }
            if (
                autoNews.publication_id &&
                manualPublicationIds.has(autoNews.publication_id)
            ) {
                return;
            }
            if (manualPaperKeys.has(paperKey)) {
                return;
            }
            if (isAnnounced(publicationItem)) {
                return;
            }

            seenIds.add(autoNews.id);
            mergedItems.push(autoNews);
        });

    return mergedItems;
};

// The publications each news item is about, resolved once at build time so
// the News page can link straight to them rather than guessing a search
// query. A generated item names its paper directly; an announcement is
// matched by the paper titles it quotes; a hand-written item may name a
// publication by id or title.
const attachPublicationIds = (newsItems, publicationItems) => {
    const knownIds = new Set(publicationItems.map((item) => item.id));
    const titledPublications = publicationItems
        .map((item) => ({ id: item.id, slug: normalizeSlug(item.title) }))
        .filter((item) => item.slug);

    return newsItems.map((item) => {
        const explicitId = normalizeText(item.publication_id);
        if (explicitId && knownIds.has(explicitId)) {
            return { ...item, publication_ids: [explicitId] };
        }

        const namedTitle = normalizeSlug(
            item.publication_title || item.publication_query,
        );
        const exact = namedTitle
            ? titledPublications.find((entry) => entry.slug === namedTitle)
            : null;
        if (exact) {
            return { ...item, publication_ids: [exact.id] };
        }

        if (item.type !== PAPER_ACCEPTED_TYPE) {
            return { ...item, publication_ids: [] };
        }
        const text = normalizeSlug(
            [item.title, item.summary, item.publication_title].join(" "),
        );
        const quoted = titledPublications
            .filter(
                (entry) =>
                    entry.slug.length >= MIN_ANNOUNCED_TITLE_LENGTH &&
                    text.includes(entry.slug),
            )
            .map((entry) => entry.id);
        if (quoted.length > 0) {
            return { ...item, publication_ids: quoted };
        }

        // An announcement that names no paper ("SAIL paper accepted to ICML
        // 2026") still points at that lab's papers at that venue.
        const venue = normalizeText(item.venue);
        const lab = normalizeText(item.related_person);
        return {
            ...item,
            publication_ids:
                venue && lab
                    ? publicationItems
                          .filter(
                              (publication) =>
                                  normalizeText(
                                      publication.research_meta
                                          ?.published_place,
                                  ) === venue &&
                                  (publication.research_meta?.labs ?? []).includes(
                                      lab,
                                  ),
                          )
                          .map((publication) => publication.id)
                    : [],
        };
    });
};

export const syncNewsContent = async ({
    validateOnly = false,
    publicationItems = null,
} = {}) => {
    const markdownFiles = (await listMarkdownFiles(NEWS_CONTENT_DIR)).filter(
        (filePath) => !path.basename(filePath).startsWith("_"),
    );

    if (markdownFiles.length === 0) {
        throw new Error(
            `[news] No markdown files found in ${relativeFromRoot(NEWS_CONTENT_DIR)}. Add content before syncing.`,
        );
    }

    const items = [];
    const seenIds = new Set();

    for (const filePath of markdownFiles) {
        const item = await parseNewsFile(filePath);
        if (seenIds.has(item.id)) {
            throw new Error(
                `[news] Duplicate id "${item.id}" in ${relativeFromRoot(filePath)}`,
            );
        }
        seenIds.add(item.id);
        items.push(item);
    }

    const externalItems = await loadExternalNewsItems();
    externalItems.forEach((item) => {
        const itemKey = normalizePaperKey(item.date, item.title);
        const duplicate = seenIds.has(item.id) || items.some((existing) =>
            normalizePaperKey(existing.date, existing.title) === itemKey,
        );
        if (!duplicate) {
            seenIds.add(item.id);
            items.push(item);
        }
    });

    const resolvedPublicationItems = Array.isArray(publicationItems)
        ? publicationItems
        : await syncPublicationContent({ validateOnly: true });

    const overrides = await loadNewsOverrides();
    const mergedItems = attachPublicationIds(
        mergePublicationNewsItems(
            items,
            resolvedPublicationItems,
            await loadAcceptanceDates(),
        ),
        resolvedPublicationItems,
    );
    const visibleItems = applyNewsOverrides(mergedItems, overrides);

    visibleItems.sort((a, b) => {
        if (a.date === b.date) {
            return a.id.localeCompare(b.id);
        }
        return b.date.localeCompare(a.date);
    });

    if (validateOnly) {
        console.log(`[news] validated ${visibleItems.length} entries`);
        return visibleItems;
    }

    await writeJsonFile(NEWS_GENERATED_FILE, {
        meta: {
            schema_version: "4.0",
            default_sort: "date_desc",
            source: "content/news + publications(published)",
            type_labels: TYPE_LABELS,
        },
        items: visibleItems,
    });

    console.log(
        `[news] synced ${visibleItems.length} entries -> ${relativeFromRoot(NEWS_GENERATED_FILE)}`,
    );

    return visibleItems;
};

if (import.meta.url === `file://${process.argv[1]}`) {
    const validateOnly = process.argv.includes("--validate-only");
    syncNewsContent({ validateOnly }).catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });
}
