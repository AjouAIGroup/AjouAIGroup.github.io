import path from "node:path";
import { promises as fs } from "node:fs";
import {
    PUBLICATIONS_GENERATED_FILE,
    PUBLICATIONS_SHEET_SNAPSHOT_FILE,
    ensureDir,
    normalizeSlug,
    readJsonFile,
    relativeFromRoot,
    writeJsonFile,
} from "./lib.mjs";
import { parseStructuredPublicationItem } from "./publications.mjs";
import {
    PUBLICATION_SHEET_COLUMNS,
    PUBLICATION_SHEET_REQUIRED_COLUMNS,
    SHEET_FALSE_VALUES,
    SHEET_TRUE_VALUES,
    publicationItemToSheetValues,
    RETITLE_MIN_WORD_OVERLAP,
    splitSheetList,
    titleWordOverlap,
    validatePublicationSheetRow,
} from "../../src/utils/publicationSheetRules.js";

const RESEARCH_AREAS_FILE = path.resolve(
    "src/assets/dataset/research_areas.json",
);
const SHEET_IMPORT_FILE = path.resolve(
    "docs/publications/publications-sheet-import.csv",
);
const SHEET_COLUMNS = PUBLICATION_SHEET_COLUMNS;
const REQUIRED_COLUMNS = PUBLICATION_SHEET_REQUIRED_COLUMNS;

const normalizeCell = (value) => String(value ?? "").trim();

const parseBoolean = (value, field, rowNumber, defaultValue = false) => {
    const normalized = normalizeCell(value).toLowerCase();
    if (!normalized) return defaultValue;
    if (SHEET_TRUE_VALUES.has(normalized)) return true;
    if (SHEET_FALSE_VALUES.has(normalized)) return false;
    throw new Error(
        `[sheet row ${rowNumber}] "${field}" must be TRUE or FALSE (received "${value}").`,
    );
};

const parseList = splitSheetList;

export const parseCsv = (source) => {
    const input = String(source ?? "").replace(/^\uFEFF/, "");
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;

    for (let index = 0; index < input.length; index += 1) {
        const character = input[index];
        const nextCharacter = input[index + 1];

        if (quoted) {
            if (character === '"' && nextCharacter === '"') {
                cell += '"';
                index += 1;
            } else if (character === '"') {
                quoted = false;
            } else {
                cell += character;
            }
            continue;
        }

        if (character === '"') {
            quoted = true;
        } else if (character === ",") {
            row.push(cell);
            cell = "";
        } else if (character === "\n") {
            row.push(cell.replace(/\r$/, ""));
            if (row.some((value) => normalizeCell(value))) rows.push(row);
            row = [];
            cell = "";
        } else {
            cell += character;
        }
    }

    if (quoted) {
        throw new Error("[sheet] CSV contains an unclosed quoted cell.");
    }

    row.push(cell.replace(/\r$/, ""));
    if (row.some((value) => normalizeCell(value))) rows.push(row);
    return rows;
};

const getPublicationCategories = async () => {
    const catalog = await readJsonFile(RESEARCH_AREAS_FILE, {});
    const categories = new Set(catalog.meta?.area_order ?? []);
    if (categories.size === 0) {
        throw new Error("[sheet] Research area categories are not configured.");
    }
    return categories;
};

// A retitled row keeps the id of the paper that left the previous snapshot
// under its old title. It must still share most title words and either the
// venue or the authors; ties are left unmatched rather than guessed.
const findRetitledItem = (record, candidates) => {
    const venue = normalizeCell(record.venue);
    const authors = normalizeCell(record.authors);
    const scored = candidates
        .map((item) => ({
            item,
            overlap: titleWordOverlap(record.title, item.title),
            anchored:
                item.research_meta?.published_place === venue ||
                item.research_meta?.author === authors,
        }))
        .filter(
            ({ overlap, anchored }) =>
                anchored && overlap >= RETITLE_MIN_WORD_OVERLAP,
        )
        .sort((a, b) => b.overlap - a.overlap);

    if (scored.length === 0) return null;
    if (scored.length > 1 && scored[0].overlap === scored[1].overlap) {
        return null;
    }
    return scored[0].item;
};

// Rows without an id cell get their id from the previous snapshot, so an
// operator never has to copy generated ids back into the sheet. Only rows
// that are new to the snapshot receive a fresh sheet-<title> id.
const assignRowIds = (entries, previousItems) => {
    const ids = new Map();
    const claimedIds = new Set();
    const sheetTitles = new Set();

    entries.forEach(({ rowNumber, record }) => {
        const explicitId = normalizeCell(record.id);
        if (explicitId) {
            ids.set(rowNumber, explicitId);
            claimedIds.add(explicitId);
        }
        sheetTitles.add(normalizeSlug(record.title));
    });

    const previousByTitle = new Map(
        previousItems.map((item) => [normalizeSlug(item.title), item]),
    );
    const unmatched = [];
    entries.forEach(({ rowNumber, record }) => {
        const titleKey = normalizeSlug(record.title);
        if (ids.has(rowNumber) || !titleKey) return;

        const previous = previousByTitle.get(titleKey);
        if (previous && !claimedIds.has(previous.id)) {
            ids.set(rowNumber, previous.id);
            claimedIds.add(previous.id);
            return;
        }
        unmatched.push({ rowNumber, record, titleKey });
    });

    unmatched.forEach(({ rowNumber, record, titleKey }) => {
        const candidates = previousItems.filter(
            (item) =>
                !claimedIds.has(item.id) &&
                !sheetTitles.has(normalizeSlug(item.title)),
        );
        const retitled = findRetitledItem(record, candidates);
        if (retitled) {
            ids.set(rowNumber, retitled.id);
            claimedIds.add(retitled.id);
            console.log(
                `[sheet row ${rowNumber}] kept id "${retitled.id}" after the title changed from "${retitled.title}".`,
            );
            return;
        }

        const generatedId = `sheet-${titleKey}`;
        ids.set(rowNumber, generatedId);
        console.log(
            `[sheet row ${rowNumber}] new publication id "${generatedId}".`,
        );
    });

    return ids;
};

const buildItemFromRow = (
    record,
    rowNumber,
    publicationId,
    publicationCategories,
) => {
    const enabled = parseBoolean(record.enabled, "enabled", rowNumber, true);
    if (!enabled) return null;

    const rowErrors = validatePublicationSheetRow(record, {
        categories: publicationCategories,
    });
    if (rowErrors.length > 0) {
        throw new Error(
            `[sheet row ${rowNumber}] ${rowErrors
                .map(({ field, message }) => `"${field}" ${message}`)
                .join(" ")}`,
        );
    }

    const title = normalizeCell(record.title);
    if (!publicationId) {
        throw new Error(
            `[sheet row ${rowNumber}] "title" must contain characters that can be used to generate an id.`,
        );
    }

    const labs = parseList(record.labs);

    const rawItem = {
        id: publicationId,
        category: normalizeCell(record.category),
        status: normalizeCell(record.status) || "published",
        title,
        summary: normalizeCell(record.summary),
        featured: parseBoolean(
            record.featured,
            "featured",
            rowNumber,
            false,
        ),
        research_meta: {
            author: normalizeCell(record.authors),
            published_place: normalizeCell(record.venue),
            published_date: normalizeCell(record.date),
            keywords: parseList(record.keywords),
            labs,
            pdf_link: normalizeCell(record.pdf_url),
            arxiv_link: normalizeCell(record.arxiv_url),
            github_link: normalizeCell(record.github_url),
            project_link: normalizeCell(record.project_url),
            source_code_link: normalizeCell(record.github_url),
            paper_link: normalizeCell(record.project_url),
        },
    };

    try {
        const item = parseStructuredPublicationItem(
            rawItem,
            publicationCategories,
        );
        const urlFields = [
            ["pdf_url", "pdf_link"],
            ["arxiv_url", "arxiv_link"],
            ["github_url", "github_link"],
            ["project_url", "project_link"],
        ];
        for (const [sheetField, metaField] of urlFields) {
            if (record[sheetField] && !item.research_meta[metaField]) {
                throw new Error(`"${sheetField}" must be a valid HTTP URL.`);
            }
        }
        return item;
    } catch (error) {
        throw new Error(
            `[sheet row ${rowNumber}] ${error.message || String(error)}`,
        );
    }
};

export const normalizeSheetRows = async (csvText, previousItems = []) => {
    const rows = parseCsv(csvText);
    if (rows.length < 2) {
        throw new Error("[sheet] CSV must contain a header and at least one row.");
    }

    const headers = rows[0].map((header) => normalizeCell(header).toLowerCase());
    const duplicateHeaders = headers.filter(
        (header, index) => header && headers.indexOf(header) !== index,
    );
    if (duplicateHeaders.length > 0) {
        throw new Error(
            `[sheet] Duplicate columns: ${Array.from(new Set(duplicateHeaders)).join(", ")}`,
        );
    }

    const missingColumns = REQUIRED_COLUMNS.filter(
        (column) => !headers.includes(column),
    );
    if (missingColumns.length > 0) {
        throw new Error(
            `[sheet] Missing required columns: ${missingColumns.join(", ")}`,
        );
    }

    const publicationCategories = await getPublicationCategories();
    const items = [];
    const errors = [];

    const entries = rows.slice(1).map((values, rowIndex) => ({
        rowNumber: rowIndex + 2,
        record: Object.fromEntries(
            headers.map((header, columnIndex) => [
                header,
                values[columnIndex] ?? "",
            ]),
        ),
    }));
    const rowIds = assignRowIds(entries, previousItems);

    entries.forEach(({ rowNumber, record }) => {
        try {
            const item = buildItemFromRow(
                record,
                rowNumber,
                rowIds.get(rowNumber),
                publicationCategories,
            );
            if (item) items.push(item);
        } catch (error) {
            errors.push(error.message || String(error));
        }
    });

    const seenIds = new Map();
    const seenTitles = new Map();
    items.forEach((item) => {
        if (seenIds.has(item.id)) {
            errors.push(
                `[sheet] Duplicate id "${item.id}". Use unique explicit ids and avoid values that collide with generated sheet-<title> ids.`,
            );
        } else {
            seenIds.set(item.id, true);
        }

        const titleKey = normalizeSlug(item.title);
        if (seenTitles.has(titleKey)) {
            errors.push(`[sheet] Duplicate title "${item.title}".`);
        } else {
            seenTitles.set(titleKey, item.id);
        }
    });

    if (errors.length > 0) {
        throw new Error(
            `[sheet] Publication import failed with ${errors.length} error(s):\n${errors.join("\n")}`,
        );
    }
    if (items.length === 0) {
        throw new Error("[sheet] No enabled publication rows were found.");
    }

    return items.sort((a, b) => {
        const dateCompare = b.research_meta.published_date.localeCompare(
            a.research_meta.published_date,
        );
        return dateCompare || a.id.localeCompare(b.id);
    });
};

const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const itemToSheetRow = (item) => {
    const values = publicationItemToSheetValues(item);
    return SHEET_COLUMNS.map((column) => values[column]);
};

const writeSheetImportCsv = async (items) => {
    const csv = [SHEET_COLUMNS, ...items.map(itemToSheetRow)]
        .map((row) => row.map(csvCell).join(","))
        .join("\n");
    await ensureDir(path.dirname(SHEET_IMPORT_FILE));
    await fs.writeFile(SHEET_IMPORT_FILE, `${csv}\n`, "utf8");
    console.log(
        `[sheet] wrote ${items.length} rows -> ${relativeFromRoot(SHEET_IMPORT_FILE)}`,
    );
};

const snapshotFor = (items, sourceUrl, syncedAt) => ({
    meta: {
        schema_version: "1.0",
        source: "google-sheets",
        source_url: sourceUrl,
        synced_at: syncedAt,
    },
    items,
});

const bootstrap = async () => {
    const generated = await readJsonFile(PUBLICATIONS_GENERATED_FILE, null);
    if (!Array.isArray(generated?.items) || generated.items.length === 0) {
        throw new Error("[sheet] Generated publication data is unavailable.");
    }

    await writeJsonFile(
        PUBLICATIONS_SHEET_SNAPSHOT_FILE,
        snapshotFor(generated.items, "", new Date().toISOString()),
    );
    await writeSheetImportCsv(generated.items);
    console.log(
        `[sheet] bootstrapped snapshot -> ${relativeFromRoot(PUBLICATIONS_SHEET_SNAPSHOT_FILE)}`,
    );
};

// Records when each publication first reached the snapshot, so the home page
// can lead with what was added most recently rather than by publication date,
// which is often only a year. The very first import stamps nothing: it holds
// the existing archive, not new additions. `archiveIds` lists that original
// archive, so a paper added before stamping existed still gets a time on the
// next sync instead of sinking among the archive.
export const stampAddedAt = (items, previousItems, now, archiveIds = null) => {
    const previousById = new Map(previousItems.map((item) => [item.id, item]));
    return items.map((item) => {
        const previous = previousById.get(item.id);
        if (previous?.added_at) {
            return { ...item, added_at: previous.added_at };
        }
        const isNewToSnapshot = !previous && previousItems.length > 0;
        const isUnstampedAddition =
            Boolean(previous) && archiveIds?.size > 0 && !archiveIds.has(item.id);
        return isNewToSnapshot || isUnstampedAddition
            ? { ...item, added_at: now }
            : item;
    });
};

// The committed import CSV is the archive the sheet was first seeded with.
const readArchiveIds = async () => {
    try {
        const rows = parseCsv(await fs.readFile(SHEET_IMPORT_FILE, "utf8"));
        const idIndex = rows[0]?.map((cell) => normalizeCell(cell)).indexOf("id");
        if (idIndex === undefined || idIndex < 0) return null;
        return new Set(
            rows
                .slice(1)
                .map((row) => normalizeCell(row[idIndex]))
                .filter(Boolean),
        );
    } catch {
        return null;
    }
};

const readSnapshotItems = async () => {
    const snapshot = await readJsonFile(PUBLICATIONS_SHEET_SNAPSHOT_FILE, {
        items: [],
    });
    return Array.isArray(snapshot?.items) ? snapshot.items : [];
};

const validateCsvFile = async (filePath) => {
    const items = await normalizeSheetRows(
        await fs.readFile(filePath, "utf8"),
        await readSnapshotItems(),
    );
    console.log(
        `[sheet] validated ${items.length} rows from ${relativeFromRoot(filePath)}`,
    );
};

const assertPublicSheetUrl = (value) => {
    let url;
    try {
        url = new URL(value);
    } catch {
        throw new Error(
            "[sheet] PUBLICATIONS_SHEET_CSV_URL must be a valid HTTPS URL.",
        );
    }

    const allowedHosts = new Set([
        "docs.google.com",
        "sheets.googleapis.com",
    ]);
    if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
        throw new Error(
            "[sheet] PUBLICATIONS_SHEET_CSV_URL must use an official Google Sheets HTTPS host.",
        );
    }
    return url.toString();
};

const pull = async () => {
    const csvUrl = assertPublicSheetUrl(
        process.env.PUBLICATIONS_SHEET_CSV_URL ?? "",
    );
    const response = await fetch(csvUrl, {
        headers: { Accept: "text/csv,text/plain;q=0.9" },
        redirect: "follow",
    });
    if (!response.ok) {
        throw new Error(
            `[sheet] Google Sheet returned ${response.status}. Confirm that it is published for public reading.`,
        );
    }

    const current = await readJsonFile(PUBLICATIONS_SHEET_SNAPSHOT_FILE, {
        items: [],
    });
    const previousItems = Array.isArray(current?.items) ? current.items : [];
    const items = stampAddedAt(
        await normalizeSheetRows(await response.text(), previousItems),
        previousItems,
        new Date().toISOString(),
        await readArchiveIds(),
    );
    const currentCount = current.items?.length ?? 0;
    const minimumSafeCount = Math.floor(currentCount * 0.75);
    if (
        currentCount >= 20 &&
        items.length < minimumSafeCount &&
        process.env.ALLOW_LARGE_PUBLICATION_DELETION !== "true"
    ) {
        throw new Error(
            `[sheet] Refusing to replace ${currentCount} publications with ${items.length}. Set ALLOW_LARGE_PUBLICATION_DELETION=true only after reviewing the deletion.`,
        );
    }

    const publicSheetUrl = normalizeCell(
        process.env.PUBLICATIONS_SHEET_URL ?? csvUrl,
    );
    const itemsAreUnchanged =
        JSON.stringify(current.items ?? []) === JSON.stringify(items);
    const sourceIsConfigured =
        current.meta?.source === "google-sheets" &&
        current.meta?.source_url === publicSheetUrl;

    if (itemsAreUnchanged && sourceIsConfigured) {
        console.log(`[sheet] no publication changes (${items.length} rows)`);
        return;
    }

    await writeJsonFile(
        PUBLICATIONS_SHEET_SNAPSHOT_FILE,
        snapshotFor(items, publicSheetUrl, new Date().toISOString()),
    );
    console.log(
        `[sheet] pulled ${items.length} rows -> ${relativeFromRoot(PUBLICATIONS_SHEET_SNAPSHOT_FILE)}`,
    );
};

if (import.meta.url === `file://${process.argv[1]}`) {
    const validateIndex = process.argv.indexOf("--validate");
    const run = process.argv.includes("--bootstrap")
        ? bootstrap
        : validateIndex >= 0
          ? () => validateCsvFile(path.resolve(process.argv[validateIndex + 1]))
          : pull;

    run().catch((error) => {
        console.error(error.message || error);
        process.exit(1);
    });
}
