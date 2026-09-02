import { createHash } from "node:crypto";
import path from "node:path";
import {
    EXTERNAL_NEWS_FILE,
    EXTERNAL_PUBLICATIONS_FILE,
    EXTERNAL_SYNC_REPORT_FILE,
    ROOT_DIR,
    SOURCES_CONTENT_DIR,
    getNowIso,
    normalizeHttpUrl,
    normalizeSlug,
    readJsonFile,
    writeJsonFile,
} from "./lib.mjs";

const REGISTRY_FILE = path.resolve(SOURCES_CONTENT_DIR, "labs.json");
const REQUEST_TIMEOUT_MS = 20_000;
const USER_AGENT = "AAIG-Content-Refresh/1.0 (+https://ajouaigroup.github.io/)";

const VENUE_ALIASES = [
    ["Findings of EMNLP", "EMNLP"],
    ["Winter Conference on Applications of Computer Vision", "WACV"],
    ["Computer Vision and Pattern Recognition", "CVPR"],
    ["International Conference on Machine Learning", "ICML"],
    ["International Conference on Learning Representations", "ICLR"],
    ["International Conference on Robotics and Automation", "ICRA"],
    ["International Conference on Intelligent Robots and Systems", "IROS"],
    ["Conference on Empirical Methods in Natural Language Processing", "EMNLP"],
    ["Annual Meeting of the Association for Computational Linguistics", "ACL"],
    ["North American Chapter of the Association for Computational Linguistics", "NAACL"],
    ["IEEE International Conference on Acoustics, Speech, and Signal Processing", "ICASSP"],
    ["Conference on Neural Information Processing Systems", "NeurIPS"],
    ["Conference on Computer Vision and Pattern Recognition", "CVPR"],
    ["European Conference on Computer Vision", "ECCV"],
    ["Robotics: Science and Systems", "RSS"],
    ["Conference on Robot Learning", "CoRL"],
    ["Interspeech", "Interspeech"],
    ["Conference on Artificial Intelligence", "AAAI"],
    ["International Conference on Data Engineering", "ICDE"],
    ["IEEE Transactions on Knowledge and Data Engineering", "TKDE"],
    ["IEEE Access", "IEEE Access"],
    ["Scientific Reports", "Sci Rep"],
    ["Biomedical Signal Processing and Control", "BSPC"],
    ["Journal of Korean Medical Science", "JKMS"],
    ["Machine Learning for Healthcare", "MLHC"],
    ["Medical Image Analysis", "MedIA"],
    ["British Machine Vision Conference", "BMVC"],
    ["Asian Conference on Computer Vision", "ACCV"],
    ["International Conference on Multimedia and Expo", "ICME"],
    ["International Conference on Computational Linguistics", "COLING"],
    ["ACM SIGIR", "SIGIR"],
    ["LREC", "LREC"],
    ["ICCVW", "ICCVW"],
    ["ICCV", "ICCV"],
    ["CVPR", "CVPR"],
    ["ECCV", "ECCV"],
    ["WACV", "WACV"],
    ["ICML", "ICML"],
    ["ICLR", "ICLR"],
    ["ICRA", "ICRA"],
    ["IROS", "IROS"],
    ["RSS", "RSS"],
    ["ACL", "ACL"],
    ["EMNLP", "EMNLP"],
    ["NAACL", "NAACL"],
    ["AAAI", "AAAI"],
    ["ICDE", "ICDE"],
    ["ICASSP", "ICASSP"],
    ["NeurIPS", "NeurIPS"],
    ["Interspeech", "Interspeech"],
    ["BMVC", "BMVC"],
    ["ACCV", "ACCV"],
    ["SIGIR", "SIGIR"],
    ["LREC", "LREC"],
];

const decodeHtml = (value) =>
    String(value ?? "")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => {
            const valueAsNumber = code.toLowerCase().startsWith("x")
                ? Number.parseInt(code.slice(1), 16)
                : Number.parseInt(code, 10);
            return Number.isFinite(valueAsNumber)
                ? String.fromCodePoint(valueAsNumber)
                : "";
        });

const htmlToText = (value) =>
    decodeHtml(
        String(value ?? "")
            .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
            .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
            .replace(/<[^>]+>/g, " "),
    )
        .replace(/\s+/g, " ")
        .trim();

const getClassText = (html, className) => {
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = String(html).match(
        new RegExp(
            `<([a-z0-9]+)\\b[^>]*class=["'][^"']*${escapedClass}[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`,
            "i",
        ),
    );
    return htmlToText(match?.[2] ?? "");
};

const getClassHtml = (html, className) => {
    const escapedClass = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = String(html).match(
        new RegExp(
            `<([a-z0-9]+)\\b[^>]*class=["'][^"']*${escapedClass}[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`,
            "i",
        ),
    );
    return match?.[2] ?? "";
};

const absoluteUrl = (href, sourceUrl) => {
    try {
        return new URL(decodeHtml(href), sourceUrl).toString();
    } catch {
        return "";
    }
};

const firstAnchorUrl = (html, sourceUrl) => {
    const match = String(html).match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/i);
    return absoluteUrl(match?.[1] ?? "", sourceUrl);
};

const parseHumanDate = (value) => {
    const normalized = htmlToText(value).replace(/\./g, " ").trim();
    const timestamp = Date.parse(normalized);
    if (Number.isNaN(timestamp)) {
        return "";
    }
    return new Date(timestamp).toISOString().slice(0, 10);
};

const cleanVenue = (value, year) => {
    const text = htmlToText(value).replace(/\s*\([^)]*\)/g, " ").trim();
    const sourceYear = text.match(/\b(20\d{2})\b/)?.[1] ?? String(year);
    const matched = VENUE_ALIASES.find(([needle]) =>
        text.toLowerCase().includes(needle.toLowerCase()),
    );
    if (!matched) {
        return "";
    }
    const workshopSuffix = /\bworkshops?\b/i.test(text) ? " Workshop" : "";
    return `${matched[1]}${workshopSuffix} ${sourceYear}`;
};

const publicationItem = ({
    source,
    title,
    authors,
    venueText,
    year,
    url,
    category = source.category,
    status = "published",
}) => {
    const publicationYear = String(year);
    const venue = cleanVenue(venueText, publicationYear);
    if (!title || !authors || !venue || !/^20\d{2}$/.test(publicationYear)) {
        return null;
    }
    const normalizedUrl = normalizeHttpUrl(url || source.url) || source.url;
    return {
        id: `${source.id}-${normalizeSlug(title)}`,
        category,
        status,
        title,
        summary: `${venue} publication from ${source.lab}.`,
        featured: false,
        research_meta: {
            author: authors,
            published_place: venue,
            published_date: `${publicationYear}-01-01`,
            keywords: [],
            labs: [source.lab],
            pdf_link: "",
            arxiv_link: "",
            github_link: "",
            project_link: normalizedUrl,
            source_code_link: "",
            paper_link: normalizedUrl,
        },
        source_id: source.id,
        source_url: source.url,
    };
};

const parseCvlPublications = (html, source) => {
    const cards = String(html).match(/<article\b[^>]*class=["'][^"']*publication__card[^"']*["'][^>]*>[\s\S]*?<\/article>/gi) ?? [];
    return cards.map((card) => {
        const title = getClassText(card, "publication__card-title");
        const authors = getClassText(card, "publication__card-author");
        const venue = getClassText(card, "publication__card-venue");
        const date = getClassText(card, "publication__card-date");
        const year = date.match(/\b(20\d{2})\b/)?.[1] ?? venue.match(/\b(20\d{2})\b/)?.[1];
        const titleHtml = getClassHtml(card, "publication__card-title");
        return publicationItem({
            source,
            title,
            authors,
            venueText: venue,
            year,
            url: firstAnchorUrl(titleHtml, source.url),
        });
    }).filter(Boolean);
};

const parseHeiPublications = (html, source) => {
    const yearPositions = [...String(html).matchAll(/<h3\b[^>]*>\s*(20\d{2})\s*<\/h3>/gi)];
    const records = [...String(html).matchAll(/<li\b[^>]*class=["'][^"']*media\s+mb-1[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi)];
    return records.map((match) => {
        const offset = match.index ?? 0;
        const year = [...yearPositions].reverse().find((heading) => (heading.index ?? 0) < offset)?.[1];
        const blocks = [...match[1].matchAll(/<div\b[^>]*>([\s\S]*?)<\/div>/gi)]
            .map((entry) => htmlToText(entry[1]))
            .filter(Boolean);
        const title = blocks[0] ?? "";
        const authors = blocks[1] ?? "";
        const venue = blocks[2] ?? "";
        return publicationItem({
            source,
            title,
            authors,
            venueText: venue,
            year,
            url: firstAnchorUrl(match[1], source.url),
        });
    }).filter(Boolean);
};

const parseIKnowPublications = (html, source) => {
    const entries = String(html).match(/<div\b[^>]*class=["'][^"']*pub-entry[^"']*["'][^>]*>[\s\S]*?<div\b[^>]*class=["'][^"']*pub-meta[^"']*["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/gi) ?? [];
    return entries.map((entry) => {
        const titleHtml = getClassHtml(entry, "pub-title");
        const authors = getClassText(entry, "pub-authors");
        const venue = getClassText(entry, "pub-type-label");
        const year = titleHtml.match(/>\s*(20\d{2})\s*</)?.[1];
        const title = htmlToText(titleHtml.replace(/<span\b[^>]*class=["'][^"']*pub-type-label[^"']*["'][^>]*>[\s\S]*?<\/span>/gi, "").replace(/<span\b[^>]*>\s*20\d{2}\s*<\/span>/gi, ""));
        return publicationItem({
            source,
            title,
            authors,
            venueText: venue,
            year,
            url: firstAnchorUrl(titleHtml, source.url),
        });
    }).filter(Boolean);
};

const parseCvlNews = (html, source) => {
    const records = String(html).match(/<article\b[^>]*class=["'][^"']*news-page__item[^"']*["'][^>]*>[\s\S]*?<\/article>/gi) ?? [];
    return records.map((record) => {
        const date = parseHumanDate(getClassText(record, "news-page__date"));
        const title = getClassText(record, "news-page__title");
        const summary = getClassText(record, "news-page__summary");
        const details = getClassText(record, "news-page__details");
        const badge = getClassText(record, "news-page__badge--type");
        const type = /paper/i.test(badge) ? "paper_accepted" : /award/i.test(badge) ? "award" : "general";
        return date && title && summary ? {
            id: `${source.id}-${normalizeSlug(title)}-${date}`,
            type,
            title,
            summary,
            date,
            related_person: source.lab,
            venue: details,
            external_url: source.url,
            generated_from: source.id,
            source_id: source.id,
            source_url: source.url,
        } : null;
    }).filter(Boolean);
};

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getGoogleSitesSection = (html, heading) => {
    const source = String(html);
    const headingMatch = source.match(
        new RegExp(`<h[1-6]\\b[^>]*>[\\s\\S]*?${escapeRegExp(heading)}[\\s\\S]*?<\\/h[1-6]>`, "i"),
    );
    if (!headingMatch || headingMatch.index === undefined) {
        return "";
    }
    const remainder = source.slice(headingMatch.index + headingMatch[0].length);
    const nextHeading = remainder.search(/<h[1-6]\b/i);
    return nextHeading >= 0 ? remainder.slice(0, nextHeading) : remainder;
};

const getGoogleSiteParagraphs = (html) => [
    ...String(html).matchAll(/<p\b[^>]*class=["'][^"']*\bCDt4Ke\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi),
].map((match) => htmlToText(match[1])).filter(Boolean);

const getGoogleSiteListItems = (html) => [
    ...String(html).matchAll(/<li\b[^>]*class=["'][^"']*\blsiHE\b[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi),
].map((match) => match[1]);

const firstAnchor = (html) => {
    const match = String(html).match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    return {
        index: match?.index ?? -1,
        html: match?.[0] ?? "",
        text: htmlToText(match?.[2] ?? ""),
        url: absoluteUrl(match?.[1] ?? "", "https://sites.google.com/"),
    };
};

const lamdaCategory = (venue) =>
    /EMNLP|ACL|COLING|LREC|WASSA/i.test(venue)
        ? "efficient_learning_for_llms"
        : "industrial_and_medical_ai";

const parseLamdaPublications = (html, source) =>
    getGoogleSiteListItems(html)
        .map((record) => {
            const text = htmlToText(record);
            const years = [...text.matchAll(/\b(20\d{2})\b/g)].map((match) => Number(match[1]));
            const year = years.at(-1);
            if (!year || year < Number(source.min_year || 0)) {
                return null;
            }

            const anchor = firstAnchor(record);
            let title = anchor.text;
            let authors = "";
            let venueText = "";

            if (title && anchor.index >= 0) {
                authors = htmlToText(record.slice(0, anchor.index))
                    .replace(/^\s*\d+\.\s*/, "")
                    .replace(/[.,\s]+$/, "");
                venueText = htmlToText(record.slice(anchor.index + anchor.html.length));
            } else {
                const accepted = text.match(
                    /^\s*(?:\d+\.\s*)?(.+?)\.\s*(.+?)\.\s*(The\s+20\d{2}\s+Conference[\s\S]+)$/i,
                );
                authors = accepted?.[1] ?? "";
                title = accepted?.[2] ?? "";
                venueText = accepted?.[3] ?? "";
            }

            return publicationItem({
                source,
                title,
                authors,
                venueText,
                year,
                url: anchor.url || source.url,
                category: lamdaCategory(venueText),
                status: /\baccepted\b/i.test(venueText) ? "working" : "published",
            });
        })
        .filter(Boolean);

const parseLamdaNews = (html, source) => {
    const section = getGoogleSitesSection(html, "News");
    return getGoogleSiteParagraphs(section)
        .map((rawTitle) => {
            const title = rawTitle
                .replace(/(\d{3})\s+(\d)/g, "$1$2")
                .replace(/(\d)\s+(\d)/g, "$1$2")
                .replace(/\s*\.\s*/g, ".");
            const dateMatch = title.match(/\(?\s*(20\d{2})\s*\.\s*(\d{1,2})/);
            if (!dateMatch) {
                return null;
            }
            const [, year, month] = dateMatch;
            const type = /과제 수주/i.test(title)
                ? "award"
                : /파견 연구/i.test(title)
                  ? "visit"
                  : "general";
            const date = `${year}-${month.padStart(2, "0")}-01`;
            return {
                id: `${source.id}-${normalizeSlug(title)}-${date}`,
                type,
                title,
                summary: `LAMDA Lab update: ${title}`,
                date,
                related_person: source.lab,
                venue: "",
                external_url: source.url,
                generated_from: source.id,
                source_id: source.id,
                source_url: source.url,
            };
        })
        .filter(Boolean);
};

const ADAPTERS = {
    "cvl-publications": parseCvlPublications,
    "hei-publications": parseHeiPublications,
    "iknow-publications": parseIKnowPublications,
    "cvl-news": parseCvlNews,
    "lamda-publications": parseLamdaPublications,
    "lamda-news": parseLamdaNews,
};

const fetchSource = async (source) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(source.url, {
            headers: {
                accept: "text/html,application/xhtml+xml",
                "user-agent": USER_AGENT,
            },
            redirect: "follow",
            signal: controller.signal,
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.text();
    } finally {
        clearTimeout(timeout);
    }
};

const readRegistry = async () => {
    const registry = await readJsonFile(REGISTRY_FILE);
    if (!Array.isArray(registry?.sources)) {
        throw new Error("[external] content/sources/labs.json must contain a sources array.");
    }
    return registry;
};

const getCachedItems = async (filePath) => {
    const data = await readJsonFile(filePath, { items: [] });
    return Array.isArray(data?.items) ? data.items : [];
};

const replaceSourceItems = (currentItems, sourceId, incomingItems) => [
    ...currentItems.filter((item) => item.source_id !== sourceId),
    ...incomingItems,
];

const hasSameItems = (currentItems, nextItems) =>
    JSON.stringify([...currentItems].sort(byId)) === JSON.stringify([...nextItems].sort(byId));

const byId = (left, right) => String(left.id).localeCompare(String(right.id));

const writeCacheWhenChanged = async (filePath, items, generatedAt) => {
    const current = await readJsonFile(filePath, { items: [] });
    const nextItems = [...items].sort(byId);
    if (hasSameItems(current.items ?? [], nextItems)) {
        return false;
    }
    await writeJsonFile(filePath, {
        meta: { schema_version: "1.0", source: "scheduled external refresh", generated_at: generatedAt },
        items: nextItems,
    });
    return true;
};

export const refreshExternalContent = async () => {
    const registry = await readRegistry();
    let newsItems = await getCachedItems(EXTERNAL_NEWS_FILE);
    let publicationItems = await getCachedItems(EXTERNAL_PUBLICATIONS_FILE);
    const report = {
        meta: {
            schema_version: "1.0",
            generated_at: getNowIso(),
            registry: path.relative(ROOT_DIR, REGISTRY_FILE),
        },
        sources: [],
    };

    for (const source of registry.sources) {
        if (!source.enabled) {
            report.sources.push({
                id: source.id,
                state: "disabled",
                message: source.disabled_reason || "Disabled in source registry.",
            });
            continue;
        }

        const adapter = ADAPTERS[source.adapter];
        if (!adapter) {
            report.sources.push({
                id: source.id,
                state: "needs_configuration",
                message: `No adapter is configured for ${source.adapter}.`,
            });
            continue;
        }

        try {
            const html = await fetchSource(source);
            const items = adapter(html, source);
            if (!items.length) {
                throw new Error("No valid entries were extracted; existing cached entries were retained.");
            }
            if (source.kind === "news") {
                newsItems = replaceSourceItems(newsItems, source.id, items);
            } else {
                publicationItems = replaceSourceItems(publicationItems, source.id, items);
            }
            report.sources.push({
                id: source.id,
                state: "updated",
                count: items.length,
                fingerprint: createHash("sha256").update(html).digest("hex").slice(0, 16),
            });
        } catch (error) {
            report.sources.push({
                id: source.id,
                state: "unavailable",
                message: error.message || String(error),
            });
        }
    }

    const generatedAt = report.meta.generated_at;
    const newsChanged = await writeCacheWhenChanged(EXTERNAL_NEWS_FILE, newsItems, generatedAt);
    const publicationsChanged = await writeCacheWhenChanged(EXTERNAL_PUBLICATIONS_FILE, publicationItems, generatedAt);
    await writeJsonFile(EXTERNAL_SYNC_REPORT_FILE, report);

    const updatedCount = report.sources.filter((source) => source.state === "updated").length;
    console.log(`[external] refreshed ${updatedCount} source(s); ${newsChanged || publicationsChanged ? "content cache updated" : "content cache unchanged"}.`);
    return report;
};

if (import.meta.url === `file://${process.argv[1]}`) {
    refreshExternalContent().catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });
}
