const CLOUDFLARE_GRAPHQL_ENDPOINT =
    "https://api.cloudflare.com/client/v4/graphql";
const ALLOWED_PERIODS = new Set([7, 30]);

const jsonResponse = (request, env, payload, status = 200) => {
    const headers = {
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=utf-8",
        Vary: "Origin",
    };
    const allowedOrigin = getAllowedOrigin(request, env);
    if (allowedOrigin) {
        headers["Access-Control-Allow-Origin"] = allowedOrigin;
    }

    return new Response(status === 204 ? null : JSON.stringify(payload), {
        status,
        headers,
    });
};

const getAllowedOrigins = (env) =>
    String(env.ADMIN_ORIGIN || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

const getAllowedOrigin = (request, env) => {
    const requestOrigin = request.headers.get("Origin") || "";
    const allowedOrigins = getAllowedOrigins(env);
    return allowedOrigins.includes(requestOrigin) ? requestOrigin : "";
};

const isAllowedOrigin = (request, env) => {
    const origin = request.headers.get("Origin");
    return !origin || getAllowedOrigins(env).includes(origin);
};

const hasValidToken = (request, env) => {
    const expected = String(env.ADMIN_TOKEN || "");
    const received = request.headers.get("Authorization") || "";
    if (!expected) return false;

    const encoder = new TextEncoder();
    const expectedBytes = encoder.encode(`Bearer ${expected}`);
    const receivedBytes = encoder.encode(received);
    return (
        expectedBytes.byteLength === receivedBytes.byteLength &&
        crypto.subtle.timingSafeEqual(expectedBytes, receivedBytes)
    );
};

const toIsoDate = (date) => date.toISOString().slice(0, 10);

const getDateRange = (days) => {
    const end = new Date();
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (days - 1));
    return { start: toIsoDate(start), end: toIsoDate(end) };
};

const createFilter = ({ start, end }, siteTag) =>
    `filter: { date_geq: ${JSON.stringify(start)}, date_leq: ${JSON.stringify(end)}, siteTag: ${JSON.stringify(siteTag)}, bot: 0 }`;

const buildAnalyticsQuery = (env, range) => {
    const accountTag = JSON.stringify(env.CLOUDFLARE_ACCOUNT_ID);
    const filter = createFilter(range, env.CLOUDFLARE_SITE_TAG);

    return `{
        viewer {
            accounts(filter: { accountTag: ${accountTag} }) {
                total: rumPageloadEventsAdaptiveGroups(${filter}, limit: 1) {
                    count
                    sum { visits }
                }
                series: rumPageloadEventsAdaptiveGroups(${filter}, limit: 31, orderBy: [date_ASC]) {
                    count
                    sum { visits }
                    dimensions { date }
                }
                topPages: rumPageloadEventsAdaptiveGroups(${filter}, limit: 10, orderBy: [count_DESC]) {
                    count
                    sum { visits }
                    dimensions { requestPath }
                }
                referrers: rumPageloadEventsAdaptiveGroups(${filter}, limit: 10, orderBy: [count_DESC]) {
                    count
                    dimensions { refererHost }
                }
                devices: rumPageloadEventsAdaptiveGroups(${filter}, limit: 10, orderBy: [count_DESC]) {
                    count
                    dimensions { deviceType }
                }
                countries: rumPageloadEventsAdaptiveGroups(${filter}, limit: 10, orderBy: [count_DESC]) {
                    count
                    dimensions { countryName }
                }
            }
        }
    }`;
};

const mapBreakdown = (rows, dimension) =>
    (rows || []).map((row) => ({
        label: row.dimensions?.[dimension] || "",
        pageViews: row.count || 0,
    }));

const fetchAnalytics = async (env, days) => {
    const range = getDateRange(days);
    const response = await fetch(CLOUDFLARE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: buildAnalyticsQuery(env, range) }),
    });
    const payload = await response.json();

    if (!response.ok || payload.errors?.length) {
        const message =
            payload.errors?.map((error) => error.message).join("; ") ||
            `Cloudflare API returned ${response.status}`;
        throw new Error(message);
    }

    const result = payload.data?.viewer?.accounts?.[0];
    if (!result) {
        throw new Error("Cloudflare account data was not returned.");
    }

    const total = result.total?.[0] || {};
    return {
        range: { days, ...range },
        totals: {
            pageViews: total.count || 0,
            visits: total.sum?.visits || 0,
        },
        series: (result.series || []).map((row) => ({
            date: row.dimensions?.date || "",
            pageViews: row.count || 0,
            visits: row.sum?.visits || 0,
        })),
        topPages: (result.topPages || []).map((row) => ({
            path: row.dimensions?.requestPath || "/",
            pageViews: row.count || 0,
            visits: row.sum?.visits || 0,
        })),
        referrers: mapBreakdown(result.referrers, "refererHost"),
        devices: mapBreakdown(result.devices, "deviceType"),
        countries: mapBreakdown(result.countries, "countryName"),
        generatedAt: new Date().toISOString(),
    };
};

const hasCloudflareConfiguration = (env) =>
    Boolean(
        env.CLOUDFLARE_API_TOKEN &&
        env.CLOUDFLARE_ACCOUNT_ID &&
        env.CLOUDFLARE_SITE_TAG &&
        env.ADMIN_TOKEN &&
        env.ADMIN_ORIGIN,
    );

const hasPublicationSyncConfiguration = (env) =>
    Boolean(
        env.GITHUB_ACTIONS_TOKEN &&
        env.GITHUB_OWNER &&
        env.GITHUB_REPO &&
        env.GITHUB_REF &&
        env.GITHUB_WORKFLOW_ID &&
        env.ADMIN_TOKEN &&
        env.ADMIN_ORIGIN,
    );

const dispatchPublicationSync = async (env) => {
    const owner = encodeURIComponent(env.GITHUB_OWNER);
    const repository = encodeURIComponent(env.GITHUB_REPO);
    const workflow = encodeURIComponent(env.GITHUB_WORKFLOW_ID);
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repository}/actions/workflows/${workflow}/dispatches`,
        {
            method: "POST",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${env.GITHUB_ACTIONS_TOKEN}`,
                "Content-Type": "application/json",
                "User-Agent": "AAIG-Admin-Worker",
                "X-GitHub-Api-Version": "2026-03-10",
            },
            body: JSON.stringify({
                ref: env.GITHUB_REF,
                inputs: { allow_large_deletion: "false" },
            }),
        },
    );

    if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(
            payload.message || `GitHub API returned ${response.status}`,
        );
    }

    const payload = await response.json().catch(() => ({}));
    return {
        message: "Publication 동기화 요청을 접수했습니다.",
        runUrl:
            payload.html_url ||
            `https://github.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/actions/workflows/${env.GITHUB_WORKFLOW_ID}`,
    };
};

export default {
    async fetch(request, env) {
        if (!isAllowedOrigin(request, env)) {
            return jsonResponse(
                request,
                env,
                { error: "허용되지 않은 요청입니다." },
                403,
            );
        }

        if (request.method === "OPTIONS") {
            return jsonResponse(request, env, {}, 204);
        }

        const url = new URL(request.url);
        if (request.method === "GET" && url.pathname === "/health") {
            return jsonResponse(request, env, {
                ok: true,
                configured: hasCloudflareConfiguration(env),
                publicationSyncConfigured: hasPublicationSyncConfiguration(env),
            });
        }

        if (request.method === "GET" && url.pathname === "/v1/analytics") {
            if (!hasCloudflareConfiguration(env)) {
                return jsonResponse(
                    request,
                    env,
                    { error: "Worker 환경변수 설정이 필요합니다." },
                    503,
                );
            }

            if (!hasValidToken(request, env)) {
                return jsonResponse(
                    request,
                    env,
                    { error: "관리자 접근 키를 확인해주세요." },
                    401,
                );
            }

            const requestedDays = Number(url.searchParams.get("days") || 30);
            const days = ALLOWED_PERIODS.has(requestedDays)
                ? requestedDays
                : 30;

            try {
                const analytics = await fetchAnalytics(env, days);
                return jsonResponse(request, env, analytics);
            } catch (error) {
                return jsonResponse(
                    request,
                    env,
                    {
                        error: "Cloudflare 통계를 불러오지 못했습니다.",
                        detail: error.message,
                    },
                    502,
                );
            }
        }

        if (
            request.method === "POST" &&
            url.pathname === "/v1/publications/sync"
        ) {
            if (!hasPublicationSyncConfiguration(env)) {
                return jsonResponse(
                    request,
                    env,
                    { error: "Publication 동기화 설정이 필요합니다." },
                    503,
                );
            }

            if (!hasValidToken(request, env)) {
                return jsonResponse(
                    request,
                    env,
                    { error: "관리자 접근 키를 확인해주세요." },
                    401,
                );
            }

            try {
                return jsonResponse(
                    request,
                    env,
                    await dispatchPublicationSync(env),
                    202,
                );
            } catch (error) {
                return jsonResponse(
                    request,
                    env,
                    {
                        error: "Publication 동기화를 시작하지 못했습니다.",
                        detail: error.message,
                    },
                    502,
                );
            }
        }

        return jsonResponse(
            request,
            env,
            { error: "요청 경로를 찾을 수 없습니다." },
            404,
        );
    },
};
