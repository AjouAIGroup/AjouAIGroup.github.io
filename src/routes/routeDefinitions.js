import RESEARCH_CATALOG from "../assets/dataset/research_areas.json" with { type: "json" };

const SITE_NAME = "AAIG";

// Every route is prerendered into its own HTML file, so each one needs its own
// head copy. Without this the whole site is indexed and shared as one page.
export const buildPageTitle = (pageTitle) =>
    pageTitle ? `${pageTitle} · ${SITE_NAME}` : SITE_NAME;

const RESEARCH_AREA_ROUTES = (RESEARCH_CATALOG.meta?.area_order ?? [])
    .map((areaKey) => RESEARCH_CATALOG.areas?.[areaKey])
    .filter((area) => area?.slug)
    .map((area) => ({
        path: `/research/${area.slug}`,
        tabKey: "research",
        title: area.title,
        description:
            area.explanation ||
            `${area.title} research at the Ajou Artificial Intelligence Group.`,
    }));

export const ROUTE_DEFINITIONS = [
    {
        path: "/",
        tabKey: "home",
        title: "",
        description:
            "Ajou Artificial Intelligence Group — five laboratories, one research community.",
    },
    {
        path: "/news",
        tabKey: "news",
        title: "News",
        description:
            "Publication announcements from the five Ajou Artificial Intelligence Group laboratories.",
    },
    {
        path: "/research",
        tabKey: "research",
        title: "Research",
        description:
            "Research across vision, speech, embodied intelligence, and knowledge-based AI at Ajou Artificial Intelligence Group.",
    },
    ...RESEARCH_AREA_ROUTES,
    {
        path: "/lab",
        tabKey: "lab",
        title: "Laboratories",
        description:
            "The five laboratories and faculty of the Ajou Artificial Intelligence Group.",
    },
    {
        path: "/contact",
        tabKey: "contact",
        title: "Apply",
        description:
            "How to contact each Ajou Artificial Intelligence Group laboratory about graduate study and research positions.",
    },
    {
        path: "/publication",
        tabKey: "publication",
        title: "Publications",
        description:
            "Searchable publication archive of the Ajou Artificial Intelligence Group, filterable by research area, year, and venue.",
    },
    {
        path: "/calendar",
        tabKey: "calendar",
        title: "Conference Calendar",
        description:
            "Official AI conference submission deadlines tracked by the Ajou Artificial Intelligence Group, shown in Korea Standard Time.",
    },
];

export const SSG_ROUTE_PATHS = ROUTE_DEFINITIONS.map((item) => item.path);
