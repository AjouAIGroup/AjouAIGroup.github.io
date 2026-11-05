// Rules for News and Photos content that the build pipeline, the admin Worker,
// and the admin editor all apply, so an edit the editor accepts is one the
// build accepts too.

export const NEWS_TYPE_LABELS = {
    paper_accepted: "Paper Accepted",
    notice: "Notice",
    equipment: "Equipment",
    new_member: "New Member",
    graduation: "Graduation",
    seminar: "Seminar / Talk",
    award: "Award",
    visit: "Visit / Collaboration",
    workshop: "Workshop",
    general: "General Update",
};

export const NEWS_TYPES = Object.keys(NEWS_TYPE_LABELS);

export const LAB_KEYS = ["cvl", "sail", "hei", "iknow", "lamda"];

export const NEWS_CONTENT_PATH = "content/news";
export const NEWS_IMAGE_PATH = "content/news/images";
export const NEWS_OVERRIDES_PATH = "content/news/overrides.json";
export const PHOTO_CONTENT_PATH = "content/photos";

// Uploads are resized in the browser before they are sent, so these limits
// only catch files added by hand or a browser that could not resize.
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export const MAX_IMAGE_EDGE = 2000;
// Album grids show photos a few hundred pixels wide, so each photo also gets
// a small copy at <album>/thumbs/<same file name>.
export const PHOTO_THUMB_DIR = "thumbs";
export const MAX_THUMB_EDGE = 640;
export const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];

export const MAX_TITLE_LENGTH = 200;
export const MAX_TEXT_LENGTH = 2000;
export const MAX_CAPTION_LENGTH = 500;

// Fields an operator may change on a News item that the site did not author
// itself (lab-site announcements and generated paper news). The original stays
// in its source and the change is layered on top at build time.
export const NEWS_OVERRIDE_FIELDS = ["title", "summary", "image", "image_alt"];

const text = (value) => String(value ?? "").trim();

export const isIsoDate = (value) => {
    const raw = text(value);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
    const date = new Date(`${raw}T00:00:00Z`);
    return (
        !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === raw
    );
};

export const isHttpUrl = (value) => {
    try {
        return ["http:", "https:"].includes(new URL(text(value)).protocol);
    } catch {
        return false;
    }
};

export const slugify = (value, maxLength = 60) =>
    text(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, maxLength)
        .replace(/^-+|-+$/g, "");

export const imageExtension = (fileName) =>
    text(fileName).split(".").pop().toLowerCase();

export const isImageFileName = (fileName) =>
    IMAGE_EXTENSIONS.includes(imageExtension(fileName));

// A slug keeps only ASCII letters and digits, so a Korean title would leave
// little more than the date. Such ids get a short random tail to stay unique.
const needsIdSuffix = (title) => /[^ -~]/.test(text(title));
const randomSuffix = () =>
    Math.random().toString(36).slice(2, 8).padEnd(6, "0");

const createId = (date, title, maxLength) =>
    [
        text(date),
        slugify(title, maxLength),
        needsIdSuffix(title) ? randomSuffix() : "",
    ]
        .filter(Boolean)
        .join("-");

// A news id doubles as its file name and page anchor, so it is built from the
// date and title once and never changes after the item is created.
export const createNewsId = (date, title) => createId(date, title, 60);

export const createAlbumId = (date, title) => createId(date, title, 40);

// AAIG News centres on paper announcements. The lab-site ingestion also keeps
// other lab updates (new interns, equipment), which stay off the page; items
// written for this site, by hand or from the admin page, always appear.
export const isPublishedNewsItem = (item) =>
    item.type === "paper_accepted" || Boolean(item.source_path);

const checkLength = (errors, field, value, max, label = "") => {
    if (text(value).length > max) {
        errors[field] = `${label}${max}자 이하로 입력하세요.`;
    }
};

// Returns { field: message } for a News item written on this site.
export const validateNewsFields = (fields = {}) => {
    const errors = {};
    if (!text(fields.title)) errors.title = "제목을 입력하세요.";
    if (!text(fields.summary)) errors.summary = "요약을 입력하세요.";
    if (!isIsoDate(fields.date))
        errors.date = "날짜를 YYYY-MM-DD로 입력하세요.";
    if (!NEWS_TYPES.includes(text(fields.type))) {
        errors.type = "종류를 선택하세요.";
    }
    if (text(fields.external_url) && !isHttpUrl(fields.external_url)) {
        errors.external_url = "http(s)로 시작하는 주소를 입력하세요.";
    }
    if (text(fields.image) && !text(fields.image_alt)) {
        errors.image_alt = "사진 설명을 입력하세요.";
    }
    checkLength(errors, "title", fields.title, MAX_TITLE_LENGTH, "제목은 ");
    checkLength(errors, "summary", fields.summary, MAX_TEXT_LENGTH, "요약은 ");
    checkLength(errors, "venue", fields.venue, MAX_TITLE_LENGTH, "학회는 ");
    checkLength(
        errors,
        "related_person",
        fields.related_person,
        MAX_TITLE_LENGTH,
        "관련 연구실·인물은 ",
    );
    checkLength(
        errors,
        "image_alt",
        fields.image_alt,
        MAX_TITLE_LENGTH,
        "사진 설명은 ",
    );
    return errors;
};

// Returns { field: message } for one entry of overrides.json.
export const validateNewsOverride = (override = {}) => {
    const errors = {};
    if ("title" in override && !text(override.title)) {
        errors.title = "제목을 비울 수 없습니다.";
    }
    if ("summary" in override && !text(override.summary)) {
        errors.summary = "요약을 비울 수 없습니다.";
    }
    if (text(override.image) && !text(override.image_alt)) {
        errors.image_alt = "사진 설명을 입력하세요.";
    }
    checkLength(errors, "title", override.title, MAX_TITLE_LENGTH, "제목은 ");
    checkLength(
        errors,
        "summary",
        override.summary,
        MAX_TEXT_LENGTH,
        "요약은 ",
    );
    checkLength(
        errors,
        "image_alt",
        override.image_alt,
        MAX_TITLE_LENGTH,
        "사진 설명은 ",
    );
    return errors;
};

// Returns { field: message } for an album's album.json. Photo files are
// checked separately because only the build can see them on disk.
export const validateAlbumMeta = (album = {}) => {
    const errors = {};
    if (!text(album.title)) errors.title = "제목을 입력하세요.";
    if (!isIsoDate(album.date)) errors.date = "날짜를 YYYY-MM-DD로 입력하세요.";
    const unknownLab = (album.labs ?? []).find(
        (lab) => !LAB_KEYS.includes(lab),
    );
    if (unknownLab) errors.labs = `알 수 없는 연구실: ${unknownLab}`;
    checkLength(errors, "title", album.title, MAX_TITLE_LENGTH, "제목은 ");
    checkLength(
        errors,
        "location",
        album.location,
        MAX_TITLE_LENGTH,
        "장소는 ",
    );
    checkLength(
        errors,
        "description",
        album.description,
        MAX_TEXT_LENGTH,
        "설명은 ",
    );

    const photos = Array.isArray(album.photos) ? album.photos : [];
    if (!photos.length) errors.photos = "사진을 한 장 이상 올리세요.";
    const files = new Set();
    photos.forEach((photo, index) => {
        const label = `사진 ${index + 1}`;
        if (!text(photo?.file) || !isImageFileName(photo.file)) {
            errors[`photos.${index}.file`] =
                `${label}: 이미지 파일이 아닙니다.`;
        } else if (files.has(photo.file)) {
            errors[`photos.${index}.file`] =
                `${label}: 같은 파일이 두 번 있습니다.`;
        }
        files.add(photo?.file);
        if (!text(photo?.alt)) {
            errors[`photos.${index}.alt`] = `${label}: 사진 설명을 입력하세요.`;
        }
        checkLength(
            errors,
            `photos.${index}.alt`,
            photo?.alt,
            MAX_TITLE_LENGTH,
            `${label} 설명은 `,
        );
        checkLength(
            errors,
            `photos.${index}.caption`,
            photo?.caption,
            MAX_CAPTION_LENGTH,
            `${label} 캡션은 `,
        );
    });
    return errors;
};

// The news front matter is written as JSON values, which YAML reads as-is,
// so quotes and colons in a title can never break the file.
const FRONTMATTER_LINE = /^([A-Za-z_][\w-]*):\s*(.*)$/;

export const setFrontmatterFields = (markdown, fields) => {
    const match = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)?$/.exec(
        String(markdown ?? ""),
    );
    const lines = match ? match[1].split(/\r?\n/) : [];
    const body = match ? (match[2] ?? "\n") : "\n";
    const pending = new Map(Object.entries(fields));

    const updated = lines.flatMap((line) => {
        const key = FRONTMATTER_LINE.exec(line)?.[1];
        if (!key || !pending.has(key)) return [line];
        const value = pending.get(key);
        pending.delete(key);
        return value === undefined || value === ""
            ? []
            : [`${key}: ${JSON.stringify(value)}`];
    });
    pending.forEach((value, key) => {
        if (value !== undefined && value !== "") {
            updated.push(`${key}: ${JSON.stringify(value)}`);
        }
    });

    return `---\n${updated.join("\n")}\n---${body}`;
};
