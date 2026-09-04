import { lazy } from "react";
import { ROUTE_DEFINITIONS, SSG_ROUTE_PATHS } from "./routeDefinitions";

const pageComponents = {
    home: lazy(() => import("../pages/HomePage")),
    news: lazy(() => import("../pages/NewsPage")),
    research: lazy(() => import("../pages/ResearchPage")),
    lab: lazy(() => import("../pages/LabPage")),
    apply: lazy(() => import("../pages/ContactPage")),
    publication: lazy(() => import("../pages/PublicationPage")),
    calendar: lazy(() => import("../pages/CalendarPage")),
};

export const PAGE_MANIFEST = ROUTE_DEFINITIONS.map((route) => ({
    ...route,
    component: pageComponents[route.tabKey],
}));

export { SSG_ROUTE_PATHS };
