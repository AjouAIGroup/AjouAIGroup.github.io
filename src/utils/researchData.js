import RESEARCH_CATALOG from "../assets/dataset/research_areas.json";

const normalizeAlias = (value = "") =>
    String(value).trim().toLowerCase().replace(/\s+/g, "-").replace(/_/g, "-");

const RESEARCH_AREA_ORDER = RESEARCH_CATALOG.meta?.area_order ?? [];

// Research areas were once published under short keys such as /research/core.
// The catalog still records those aliases so older links and indexed search
// results redirect to the current slug instead of falling through to /research.
export const RESEARCH_LEGACY_ROUTES = RESEARCH_AREA_ORDER.flatMap(
    (contentKey) => {
        const area = RESEARCH_CATALOG.areas?.[contentKey] ?? {};
        const topicKey = normalizeAlias(area.slug || contentKey);
        const aliases = Array.isArray(area.legacy_aliases)
            ? area.legacy_aliases
            : [];

        return Array.from(new Set(aliases.map(normalizeAlias)))
            .filter((alias) => alias && alias !== topicKey)
            .map((alias) => ({
                from: `/research/${alias}`,
                to: `/research/${topicKey}`,
            }));
    },
);
