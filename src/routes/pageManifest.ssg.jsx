import { ROUTE_DEFINITIONS, SSG_ROUTE_PATHS } from "./routeDefinitions";
import HomePage from "../pages/HomePage";
import NewsPage from "../pages/NewsPage";
import ResearchPage from "../pages/ResearchPage";
import LabPage from "../pages/LabPage";
import ContactPage from "../pages/ContactPage";
import PublicationPage from "../pages/PublicationPage";
import CalendarPage from "../pages/CalendarPage";

const PAGE_COMPONENTS = {
    home: HomePage,
    news: NewsPage,
    research: ResearchPage,
    lab: LabPage,
    contact: ContactPage,
    publication: PublicationPage,
    calendar: CalendarPage,
};

export const PAGE_MANIFEST_SSG = ROUTE_DEFINITIONS.map((route) => ({
    ...route,
    component: PAGE_COMPONENTS[route.tabKey],
}));

export { SSG_ROUTE_PATHS };
