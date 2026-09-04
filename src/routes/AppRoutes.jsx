import { Navigate, Route, Routes } from "react-router-dom";
import { PAGE_MANIFEST } from "./pageManifest";
import { RESEARCH_LEGACY_ROUTES } from "../utils/researchData";

function AppRoutes() {
    return (
        <Routes>
            {PAGE_MANIFEST.map((route) => {
                const RouteComponent = route.component;
                return (
                    <Route
                        key={`${route.tabKey}-${route.path}`}
                        path={route.path}
                        element={<RouteComponent />}
                    />
                );
            })}
            {RESEARCH_LEGACY_ROUTES.map((route) => (
                <Route
                    key={`research-legacy-${route.from}`}
                    path={route.from}
                    element={<Navigate to={route.to} replace />}
                />
            ))}
            {/* The page has always been the Apply page; only its address was
                still /contact. Both older paths stay routable so existing
                links and indexed results land on it instead of the home page. */}
            <Route
                path="/prospective"
                element={<Navigate to="/apply" replace />}
            />
            <Route path="/contact" element={<Navigate to="/apply" replace />} />
            <Route
                path="/research/*"
                element={<Navigate to="/research" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRoutes;
