import RESEARCH_CATALOG from "../assets/dataset/research_areas.json" with {
    type: "json",
};

const RESEARCH_ROUTE_PATHS = (RESEARCH_CATALOG.meta?.area_order ?? [])
    .map((areaKey) => RESEARCH_CATALOG.areas?.[areaKey]?.slug)
    .filter(Boolean)
    .map((slug) => `/research/${slug}`);

export const ROUTE_DEFINITIONS = [
    { path: "/", tabKey: "home" },
    { path: "/news", tabKey: "news" },
    { path: "/research", tabKey: "research" },
    ...RESEARCH_ROUTE_PATHS.map((path) => ({ path, tabKey: "research" })),
    { path: "/lab", tabKey: "lab" },
    { path: "/gallery", tabKey: "gallery" },
    { path: "/publication", tabKey: "publication" },
];

export const SSG_ROUTE_PATHS = ROUTE_DEFINITIONS.map((item) => item.path);
