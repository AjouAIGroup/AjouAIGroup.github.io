// Publication rules shared by the content pipeline, the admin Worker and the
// admin editor, so a row the editor accepts is a row the nightly sync accepts.
// Keep this module free of Node, browser and Worker specific APIs.

export const PUBLICATION_SHEET_COLUMNS = [
    "enabled",
    "id",
    "category",
    "status",
    "title",
    "date",
    "authors",
    "venue",
    "keywords",
    "labs",
    "pdf_url",
    "arxiv_url",
    "github_url",
    "project_url",
    "featured",
    "summary",
    "notes",
];

export const PUBLICATION_SHEET_REQUIRED_COLUMNS =
    PUBLICATION_SHEET_COLUMNS.filter((column) => column !== "notes");

export const PUBLICATION_URL_COLUMNS = [
    "pdf_url",
    "arxiv_url",
    "github_url",
    "project_url",
];

export const PUBLICATION_STATUSES = ["published", "working", "project"];

export const PUBLICATION_VENUES = [
    "ACCV",
    "ACPR",
    "ICPR",
    "SMC",
    "Neural Networks",
    "IEEE TASLP",
    "IEEE TNNLS",
    "IEEE TAC",
    "BMVC",
    "BSPC",
    "JKMS",
    "CBM",
    "CMPB",
    "CVPR",
    "ECCV",
    "ESWA",
    "DASFAA",
    "FEIII",
    "ICCV",
    "ICCVW",
    "NeurIPS",
    "ICML",
    "IJS",
    "MedIA",
    "MLHC",
    "NAACL",
    "Nano Convergence",
    "Pattern Recognition",
    "RSS",
    "Sci Rep",
    "WACV",
    "AAAI",
    "ACM MM",
    "ACL",
    "Advanced Materials",
    "ASONAM",
    "BigComp",
    "EMNLP",
    "Findings of EMNLP",
    "ICDE",
    "ICDM",
    "ICLR",
    "ICME",
    "ICRA",
    "ICASSP",
    "IROS",
    "Interspeech",
    "Int J Pharm",
    "CIKM",
    "KCC",
    "KDD",
    "LREC",
    "PAKDD",
    "SIGIR",
    "TKDE",
    "VLDB",
    "IEEE Access",
    "CoRL",
    "COLING",
];

const APPROVED_VENUES = new Set(PUBLICATION_VENUES);
const VENUE_WITH_YEAR_PATTERN = /^(.+?)\s+(\d{4})$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const SHEET_TRUE_VALUES = new Set([
    "true",
    "yes",
    "y",
    "1",
    "사용",
    "게시",
]);
export const SHEET_FALSE_VALUES = new Set([
    "false",
    "no",
    "n",
    "0",
    "미사용",
    "비게시",
]);

export const isApprovedVenue = (venue) =>
    APPROVED_VENUES.has(venue) ||
    (venue.endsWith(" Workshop") &&
        APPROVED_VENUES.has(venue.slice(0, -" Workshop".length)));

// Returns the venue name and year, or null when the text is not
// "<approved venue> <year>".
export const parseVenue = (value) => {
    const match = String(value ?? "")
        .trim()
        .match(VENUE_WITH_YEAR_PATTERN);
    if (!match || !isApprovedVenue(match[1])) return null;
    return { name: match[1], year: match[2] };
};

export const toSlug = (value) =>
    String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const splitSheetList = (value) =>
    String(value ?? "")
        .trim()
        .split(/\s*\|\s*|\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

const isCalendarDate = (value) => {
    if (!ISO_DATE_PATTERN.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
    );
};

const isHttpUrl = (value) => {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

const isSheetBoolean = (value) => {
    const normalized = String(value ?? "")
        .trim()
        .toLowerCase();
    return (
        !normalized ||
        SHEET_TRUE_VALUES.has(normalized) ||
        SHEET_FALSE_VALUES.has(normalized)
    );
};

// Checks one sheet row given as { column: text }. Returns a list of
// { field, message } in the order the columns appear, empty when the row is
// valid. Messages are written for operators, not developers.
export const validatePublicationSheetRow = (record, { categories }) => {
    const value = (column) => String(record?.[column] ?? "").trim();
    const errors = [];
    const fail = (field, message) => errors.push({ field, message });

    ["enabled", "featured"].forEach((column) => {
        if (!isSheetBoolean(record?.[column])) {
            fail(column, "TRUE 또는 FALSE만 입력할 수 있습니다.");
        }
    });

    if (!categories.has(value("category"))) {
        fail("category", "연구 분야를 목록에서 선택해주세요.");
    }

    const status = value("status") || "published";
    if (!PUBLICATION_STATUSES.includes(status)) {
        fail("status", "published, working, project 중 하나여야 합니다.");
    }

    const title = value("title");
    if (!title) {
        fail("title", "제목을 입력해주세요.");
    } else if (!value("id") && !toSlug(title)) {
        fail("title", "제목에 영문자나 숫자가 하나 이상 있어야 합니다.");
    }

    const date = value("date");
    if (!date) {
        fail("date", "날짜를 입력해주세요.");
    } else if (!isCalendarDate(date)) {
        fail("date", "날짜는 2026-03-01처럼 YYYY-MM-DD 형식이어야 합니다.");
    }

    if (!value("authors")) {
        fail("authors", "저자를 입력해주세요.");
    }

    const venueText = value("venue");
    const venue = parseVenue(venueText);
    if (!venueText) {
        fail("venue", "학회나 저널을 입력해주세요.");
    } else if (!venue) {
        fail(
            "venue",
            "승인된 약칭과 연도를 함께 써주세요. 예: CVPR 2026, ICASSP Workshop 2026",
        );
    } else if (isCalendarDate(date) && venue.year !== date.slice(0, 4)) {
        fail("venue", `venue 연도(${venue.year})가 날짜 연도와 같아야 합니다.`);
    }

    if (splitSheetList(record?.labs).length === 0) {
        fail("labs", "연구실을 하나 이상 선택해주세요.");
    }

    PUBLICATION_URL_COLUMNS.forEach((column) => {
        const url = value(column);
        if (url && !isHttpUrl(url)) {
            fail(column, "http:// 또는 https://로 시작하는 주소여야 합니다.");
        }
    });

    return errors;
};

// A blank enabled cell counts as enabled, matching the nightly sync.
export const isSheetRowEnabled = (record) =>
    !SHEET_FALSE_VALUES.has(
        String(record?.enabled ?? "")
            .trim()
            .toLowerCase(),
    );

// Hidden rows are skipped by the sync, so only their title is required;
// that is what lets an operator park an incomplete or rejected entry.
export const validateSheetRowForSave = (record, options) => {
    if (isSheetRowEnabled(record)) {
        return validatePublicationSheetRow(record, options);
    }
    return String(record?.title ?? "").trim()
        ? []
        : [{ field: "title", message: "제목을 입력해주세요." }];
};

// Converts a structured publication (the generated data or a lab-site
// refresh result) into the sheet's column values.
export const publicationItemToSheetValues = (item) => {
    const meta = item?.research_meta ?? {};
    return {
        enabled: "TRUE",
        id: String(item?.id ?? ""),
        category: String(item?.category ?? ""),
        status: String(item?.status || "published"),
        title: String(item?.title ?? ""),
        date: String(meta.published_date ?? ""),
        authors: String(meta.author ?? ""),
        venue: String(meta.published_place ?? ""),
        keywords: (meta.keywords ?? []).join(" | "),
        labs: (meta.labs ?? []).join(" | "),
        pdf_url: String(meta.pdf_link ?? ""),
        arxiv_url: String(meta.arxiv_link ?? ""),
        github_url: String(meta.github_link ?? ""),
        project_url: String(meta.project_link ?? ""),
        featured: item?.featured ? "TRUE" : "FALSE",
        summary: String(item?.summary ?? ""),
        notes: "",
    };
};
