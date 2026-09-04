import { ROUTE_DEFINITIONS } from "./routeDefinitions";

const DEFAULT_TAB_KEY = "home";

// Derived from the route table so adding a route only means editing one file.
const TAB_KEY_SET = new Set(ROUTE_DEFINITIONS.map((route) => route.tabKey));

export const resolveTabFromPath = (pathname = "/") => {
    if (!pathname || pathname === "/") {
        return DEFAULT_TAB_KEY;
    }

    const segment = pathname.replace(/^\/+/, "").split("/")[0] ?? "";
    return TAB_KEY_SET.has(segment) ? segment : DEFAULT_TAB_KEY;
};
