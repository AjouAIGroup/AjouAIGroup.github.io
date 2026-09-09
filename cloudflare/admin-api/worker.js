const CLOUDFLARE_GRAPHQL_ENDPOINT =
    "https://api.cloudflare.com/client/v4/graphql";
const ALLOWED_PERIODS = new Set([7, 30]);

const jsonResponse = (request, env, payload, status = 200) => {
    const headers = {
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Max-Age": "86400",
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

const getAuthFailureResponse = async (request, env, pathname) => {
    if (hasValidToken(request, env)) return null;

    if (env.ADMIN_RATE_LIMITER) {
        const clientAddress =
            request.headers.get("CF-Connecting-IP") || "unknown";
        try {
            const { success } = await env.ADMIN_RATE_LIMITER.limit({
                key: `${pathname}:${clientAddress}`,
            });
            if (!success) {
                return jsonResponse(
                    request,
                    env,
                    {
                        error: "관리자 접근 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.",
                    },
                    429,
                );
            }
        } catch {
            return jsonResponse(
                request,
                env,
                { error: "관리자 접근 제한 서비스를 확인해주세요." },
                503,
            );
        }
    }

    return jsonResponse(
        request,
        env,
        { error: "관리자 접근 키를 확인해주세요." },
        401,
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
                series: rumPageloadEventsAdaptiveGroups(${filter}, limit: 5000, orderBy: [date_ASC]) {
                    count
                    sum { visits }
                    dimensions { date requestPath }
                }
                topPages: rumPageloadEventsAdaptiveGroups(${filter}, limit: 5000, orderBy: [count_DESC]) {
                    count
                    sum { visits }
                    dimensions { requestPath }
                }
                referrers: rumPageloadEventsAdaptiveGroups(${filter}, limit: 5000, orderBy: [count_DESC]) {
                    count
                    dimensions { refererHost requestPath }
                }
                devices: rumPageloadEventsAdaptiveGroups(${filter}, limit: 5000, orderBy: [count_DESC]) {
                    count
                    dimensions { deviceType requestPath }
                }
                countries: rumPageloadEventsAdaptiveGroups(${filter}, limit: 5000, orderBy: [count_DESC]) {
                    count
                    dimensions { countryName requestPath }
                }
            }
        }
    }`;
};

const isAdminPath = (value) => {
    const path = String(value || "/");
    return path === "/admin" || path.startsWith("/admin/");
};

const aggregatePublicRows = (rows, dimension) => {
    const groups = new Map();

    (rows || [])
        .filter((row) => !isAdminPath(row.dimensions?.requestPath))
        .forEach((row) => {
            const label = row.dimensions?.[dimension] || "";
            const current = groups.get(label) || {
                label,
                pageViews: 0,
                visits: 0,
            };
            current.pageViews += row.count || 0;
            current.visits += row.sum?.visits || 0;
            groups.set(label, current);
        });

    return Array.from(groups.values());
};

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

    const series = aggregatePublicRows(result.series, "date").sort((a, b) =>
        a.label.localeCompare(b.label),
    );
    const topPages = aggregatePublicRows(result.topPages, "requestPath").sort(
        (a, b) => b.pageViews - a.pageViews,
    );
    const totals = topPages.reduce(
        (total, row) => ({
            pageViews: total.pageViews + row.pageViews,
            visits: total.visits + row.visits,
        }),
        { pageViews: 0, visits: 0 },
    );

    return {
        range: { days, ...range },
        totals,
        series: series.map((row) => ({
            date: row.label,
            pageViews: row.pageViews,
            visits: row.visits,
        })),
        topPages: topPages.slice(0, 10).map((row) => ({
            path: row.label || "/",
            pageViews: row.pageViews,
            visits: row.visits,
        })),
        referrers: aggregatePublicRows(result.referrers, "refererHost")
            .sort((a, b) => b.pageViews - a.pageViews)
            .slice(0, 10),
        devices: aggregatePublicRows(result.devices, "deviceType")
            .sort((a, b) => b.pageViews - a.pageViews)
            .slice(0, 10),
        countries: aggregatePublicRows(result.countries, "countryName")
            .sort((a, b) => b.pageViews - a.pageViews)
            .slice(0, 10),
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

            const authFailure = await getAuthFailureResponse(
                request,
                env,
                url.pathname,
            );
            if (authFailure) return authFailure;

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

            const authFailure = await getAuthFailureResponse(
                request,
                env,
                url.pathname,
            );
            if (authFailure) return authFailure;

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
