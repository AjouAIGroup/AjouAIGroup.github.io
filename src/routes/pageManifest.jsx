import { lazy } from "react";
import { ROUTE_DEFINITIONS, SSG_ROUTE_PATHS } from "./routeDefinitions";

const HomePage = lazy(() => import("../pages/HomePage"));
const NewsPage = lazy(() => import("../pages/NewsPage"));
const ResearchPage = lazy(() => import("../pages/ResearchPage"));
const LabPage = lazy(() => import("../pages/LabPage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const PublicationPage = lazy(() => import("../pages/PublicationPage"));

const PAGE_COMPONENTS = {
    home: HomePage,
    news: NewsPage,
    research: ResearchPage,
    lab: LabPage,
    gallery: GalleryPage,
    publication: PublicationPage,
};

export const PAGE_MANIFEST = ROUTE_DEFINITIONS.map((route) => ({
    ...route,
    component: PAGE_COMPONENTS[route.tabKey],
}));

export { SSG_ROUTE_PATHS };
