import { useEffect } from "react";

const BEACON_ID = "cloudflare-web-analytics";

function CloudflareAnalytics() {
    const token = import.meta.env.VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();

    useEffect(() => {
        if (!token || document.getElementById(BEACON_ID)) {
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
