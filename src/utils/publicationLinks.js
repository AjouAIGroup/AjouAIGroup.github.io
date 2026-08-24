const normalizeText = (value) =>
    typeof value === "string" ? value.trim() : "";

export const isValidHttpUrl = (url) => {
    if (!url) {
        return false;
    }

    try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
        return false;
    }
};

export const getPublicationPrimaryLink = (meta = {}) => {
    const orderedKeys = [
        "pdf_link",
        "arxiv_link",
        "project_link",
        "github_link",
        "paper_link",
        "source_code_link",
    ];

    for (const key of orderedKeys) {
        const value = normalizeText(meta?.[key]);
        if (isValidHttpUrl(value)) {
            return value;
        }
    }

    return "";
};
