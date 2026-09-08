import { useEffect } from "react";

const BEACON_ID = "cloudflare-web-analytics";

const isAdminEntry = () => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
    const pathname = window.location.pathname;
    const routePath =
        basePath && pathname.startsWith(basePath)
            ? pathname.slice(basePath.length)
            : pathname;

    return routePath.startsWith("/admin");
};

function CloudflareAnalytics() {
    const token = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

    useEffect(() => {
        if (!token || isAdminEntry() || document.getElementById(BEACON_ID)) {
            return undefined;
        }

        const script = document.createElement("script");
        script.id = BEACON_ID;
        script.defer = true;
        script.src = "https://static.cloudflareinsights.com/beacon.min.js";
        script.dataset.cfBeacon = JSON.stringify({ token });
        document.body.appendChild(script);
    }, [token]);

    return null;
}

export default CloudflareAnalytics;
