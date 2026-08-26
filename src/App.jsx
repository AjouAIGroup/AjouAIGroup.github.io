import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import RouteScrollManager from "./components/RouteScrollManager";
import AppRoutes from "./routes/AppRoutes";
import { resolveTabFromPath } from "./routes/routeUtils";
import "./App.css";

const AAIG = lazy(() => import("./components/tabs/AAIG"));

// Kept as a shared shell so the client and static routes retain the same frame.
// eslint-disable-next-line react-refresh/only-export-components
export function createAppShell(HeroComponent, RoutesComponent) {
    return function AppShell() {
        const location = useLocation();
        const selectedTab = resolveTabFromPath(location.pathname);

        return (
            <div
                className={`app app--${selectedTab || "home"}`}
                data-rendered-route={location.pathname}>
                <RouteScrollManager />
                <a className="skip-link" href="#site-content">
                    Skip to content
                </a>
                <div className="app__content">
                    <Nav />
                    {selectedTab === "home" ? (
                        <Suspense
                            fallback={<div className="app__hero-loading" />}>
                            <HeroComponent isHome />
                        </Suspense>
                    ) : null}
                    <main id="site-content" className="app__main">
                        <MainContent selectedTab={selectedTab}>
                            <RoutesComponent />
                        </MainContent>
                    </main>
                </div>
                <Footer />
            </div>
        );
    };
}

const App = createAppShell(AAIG, AppRoutes);

export default App;
