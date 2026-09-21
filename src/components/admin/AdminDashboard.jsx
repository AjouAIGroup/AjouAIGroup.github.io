import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllPublications,
    PUBLICATION_DATA_META,
} from "../../utils/publicationData";
import { loadGoogleIdentity, readIdentityClaims } from "./googleIdentity";
import "./AdminDashboard.css";

const ADMIN_API_URL = (import.meta.env.VITE_ADMIN_API_URL ?? "").replace(
    /\/$/,
    "",
);
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";
const REPOSITORY_URL = "https://github.com/AjouAIGroup/AjouAIGroup.github.io";
const PUBLICATION_DIRECTORY_URL = `${REPOSITORY_URL}/tree/main/content/publications`;
const PUBLICATIONS_SHEET_URL =
    import.meta.env.VITE_PUBLICATIONS_SHEET_URL ??
    PUBLICATION_DATA_META.source_url ??
    "";
const PUBLICATIONS = getAllPublications();

const numberFormatter = new Intl.NumberFormat("ko-KR");
const formatNumber = (value) => numberFormatter.format(Number(value) || 0);

const isFiniteNumber = (value) =>
    typeof value === "number" && Number.isFinite(value);

const normalizeAnalyticsPayload = (payload) => {
    const hasValidTotals =
        payload?.totals &&
        isFiniteNumber(payload.totals.pageViews) &&
        isFiniteNumber(payload.totals.visits);
    const hasValidSeries =
        Array.isArray(payload?.series) &&
        payload.series.every(
            (item) =>
                typeof item?.date === "string" &&
                isFiniteNumber(item.pageViews) &&
                isFiniteNumber(item.visits),
        );
    const hasValidTopPages =
        Array.isArray(payload?.topPages) &&
        payload.topPages.every(
            (item) =>
                typeof item?.path === "string" &&
                isFiniteNumber(item.pageViews),
        );

    if (!hasValidTotals || !hasValidSeries || !hasValidTopPages) {
        throw new Error("통계 서버가 올바르지 않은 응답을 반환했습니다.");
    }

    return {
        ...payload,
        referrers: Array.isArray(payload.referrers) ? payload.referrers : [],
        countries: Array.isArray(payload.countries) ? payload.countries : [],
    };
};

const buildPublicationSearchUrl = (publicationId) =>
    `${REPOSITORY_URL}/search?q=${encodeURIComponent(publicationId)}&type=code`;

const summarizePublications = () => {
    const labs = new Set();
    const years = new Set();

    PUBLICATIONS.forEach((publication) => {
        publication.research_meta.labs.forEach((lab) => labs.add(lab));
        years.add(publication.research_meta.published_date.slice(0, 4));
    });

    return {
        total: PUBLICATIONS.length,
        featured: PUBLICATIONS.filter((item) => item.featured).length,
        labs: labs.size,
        years: years.size,
    };
};

function AdminMetric({ label, value, detail }) {
    return (
        <article className="admin-metric">
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{detail}</span>
        </article>
    );
}

function AnalyticsSkeleton() {
    return (
        <div className="admin-analytics-skeleton" role="status">
            <span>Cloudflare 통계를 불러오는 중입니다.</span>
            <div />
            <div />
            <div />
        </div>
    );
}

function AdminDashboard() {
    const publicationSummary = useMemo(summarizePublications, []);
    const [days, setDays] = useState(30);
    // The credential is kept in memory only. Closing or reloading the tab ends
    // the session; Google re-issues it silently for an already-consented
    // account, so nothing has to be stored to stay convenient.
    const [session, setSession] = useState(null);
    const [signInStatus, setSignInStatus] = useState("idle");
    const [tokenInput, setTokenInput] = useState("");
    const [analytics, setAnalytics] = useState(null);
    const [analyticsStatus, setAnalyticsStatus] = useState(
        ADMIN_API_URL ? "signed-out" : "unconfigured",
    );
    const [analyticsError, setAnalyticsError] = useState("");
    const [retryRequest, setRetryRequest] = useState(0);
    const [publicationQuery, setPublicationQuery] = useState("");
    const googleButtonRef = useRef(null);

    useEffect(() => {
        const previousTitle = document.title;
        const robotsMeta = document.querySelector('meta[name="robots"]');
        const previousRobots = robotsMeta?.getAttribute("content") ?? "";

        document.title = "Admin · AAIG";
        robotsMeta?.setAttribute("content", "noindex,nofollow,noarchive");

        return () => {
            document.title = previousTitle;
            robotsMeta?.setAttribute("content", previousRobots);
        };
    }, []);

    const handleCredential = useCallback((response) => {
        const credential = response?.credential;
        if (!credential) return;

        const claims = readIdentityClaims(credential);
        setAnalyticsError("");
        setSession({
            credential,
            kind: "google",
            email: claims.email,
            expiresAt: claims.expiresAt,
        });
    }, []);

    useEffect(() => {
        if (!ADMIN_API_URL || !GOOGLE_CLIENT_ID || session) {
            return undefined;
        }

        let cancelled = false;
        setSignInStatus("loading");

        loadGoogleIdentity()
            .then((identity) => {
                if (cancelled || !googleButtonRef.current) return;

                identity.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleCredential,
                    auto_select: true,
                    cancel_on_tap_outside: false,
                });
                identity.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    text: "signin_with",
                    shape: "rectangular",
                    locale: "ko",
                });
                setSignInStatus("ready");
            })
            .catch(() => {
                if (!cancelled) setSignInStatus("error");
            });

        return () => {
            cancelled = true;
        };
    }, [handleCredential, session]);

    // Google ID tokens last an hour. Locking the screen exactly when the token
    // dies keeps the UI honest instead of waiting for the next failed request.
    useEffect(() => {
        if (!session?.expiresAt) return undefined;

        const remaining = session.expiresAt - Date.now();
        const expire = () => {
            setSession(null);
            setAnalytics(null);
            setAnalyticsStatus("signed-out");
            setAnalyticsError("로그인이 만료되었습니다. 다시 로그인해주세요.");
        };

        if (remaining <= 0) {
            expire();
            return undefined;
        }

        const timer = setTimeout(expire, remaining);
        return () => clearTimeout(timer);
    }, [session]);

    useEffect(() => {
        if (!ADMIN_API_URL || !session) {
            return undefined;
        }

        const controller = new AbortController();
        const loadAnalytics = async () => {
            setAnalyticsStatus("loading");
            setAnalyticsError("");

            try {
                const response = await fetch(
                    `${ADMIN_API_URL}/v1/analytics?days=${days}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.credential}`,
                        },
                        signal: controller.signal,
                    },
                );
                const payload = await response.json().catch(() => ({}));

                if (!response.ok) {
                    const failure = new Error(
                        payload.error || "통계 데이터를 불러오지 못했습니다.",
                    );
                    failure.status = response.status;
                    throw failure;
                }

                setAnalytics(normalizeAnalyticsPayload(payload));
                setAnalyticsStatus("ready");
            } catch (error) {
                if (error.name === "AbortError") return;
                setAnalytics(null);
                setAnalyticsError(error.message);

                if (error.status === 401) {
                    // The credential is spent, so drop it and ask for a new
                    // one. Silent re-sign-in is turned off first: if the
                    // rejection came from a configuration mismatch rather than
                    // expiry, Google would otherwise hand back another
                    // credential immediately and the two would loop.
                    window.google?.accounts?.id?.disableAutoSelect();
                    setSession(null);
                    setAnalyticsStatus("signed-out");
                    return;
                }

                // A 403 means the account itself is not on the allow list, so
                // retrying with the same credential can never succeed.
                setAnalyticsStatus(error.status === 403 ? "denied" : "error");
            }
        };

        loadAnalytics();
        return () => controller.abort();
    }, [days, retryRequest, session]);

    const visiblePublications = useMemo(() => {
        const query = publicationQuery.trim().toLowerCase();
        if (!query) return PUBLICATIONS.slice(0, 12);

        return PUBLICATIONS.filter((publication) =>
            [
                publication.title,
                publication.research_meta.author,
                publication.research_meta.published_place,
                ...publication.research_meta.labs,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query),
        ).slice(0, 30);
    }, [publicationQuery]);

    const maxSeriesValue = Math.max(
        1,
        ...(analytics?.series ?? []).map((item) => item.pageViews),
    );

    const handleUnlock = (event) => {
        event.preventDefault();
        const normalizedToken = tokenInput.trim();
        if (!normalizedToken) return;
        setAnalyticsError("");
        setSession({ credential: normalizedToken, kind: "key", email: "" });
        setTokenInput("");
    };

    const handleSignOut = () => {
        // Without this Google would silently sign the same account back in,
        // which makes "다른 계정으로 로그인" impossible.
        window.google?.accounts?.id?.disableAutoSelect();
        setSession(null);
        setAnalytics(null);
        setAnalyticsError("");
        setAnalyticsStatus("signed-out");
    };

    const handleRetry = () => {
        setRetryRequest((requestNumber) => requestNumber + 1);
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <p className="admin-header__label">Private workspace</p>
                    <h1>AAIG 관리자</h1>
                    <p>
                        홈페이지 통계와 publication 운영 상태를 한곳에서
                        확인합니다.
                    </p>
                </div>
                <Link className="admin-header__back" to="/">
                    홈페이지로 돌아가기
                </Link>
            </header>

            <section
                className="admin-section"
                aria-labelledby="analytics-title">
                <div className="admin-section__head">
                    <div>
                        <h2 id="analytics-title">접속 통계</h2>
                        <p>Cloudflare Web Analytics의 집계 데이터입니다.</p>
                    </div>
                    {["ready", "loading"].includes(analyticsStatus) &&
                    analytics ? (
                        <div
                            className="admin-period"
                            role="group"
                            aria-label="통계 기간">
                            {[7, 30].map((period) => (
                                <button
                                    key={period}
                                    type="button"
                                    className={
                                        days === period ? "is-active" : ""
                                    }
                                    disabled={analyticsStatus === "loading"}
                                    onClick={() => setDays(period)}>
                                    {period}일
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>

                {analyticsStatus === "unconfigured" ? (
                    <div className="admin-state admin-state--setup">
                        <strong>Cloudflare 연결 설정이 필요합니다.</strong>
                        <p>
                            Worker를 배포한 뒤 빌드 환경변수
                            VITE_ADMIN_API_URL에 주소를 등록하면 이 영역이
                            활성화됩니다.
                        </p>
                    </div>
                ) : null}

                {analyticsStatus === "signed-out" ? (
                    <div className="admin-signin">
                        <div className="admin-signin__intro">
                            <strong>관리자 로그인</strong>
                            <p>
                                등록된 운영자 Google 계정으로만 통계를 볼 수
                                있습니다. 로그인은 1시간 동안 유지되며 이
                                브라우저에 저장되지 않습니다.
                            </p>
                        </div>

                        {GOOGLE_CLIENT_ID ? (
                            <div className="admin-signin__google">
                                <div ref={googleButtonRef} />
                                {signInStatus === "error" ? (
                                    <p
                                        className="admin-signin__error"
                                        role="alert">
                                        Google 로그인을 불러오지 못했습니다.
                                        네트워크 연결을 확인한 뒤 페이지를
                                        새로고침해주세요.
                                    </p>
                                ) : null}
                            </div>
                        ) : (
                            <p className="admin-signin__notice">
                                Google 로그인이 아직 설정되지 않았습니다. 빌드
                                환경변수 VITE_GOOGLE_CLIENT_ID를 등록하면 이
                                영역에 로그인 버튼이 나타납니다.
                            </p>
                        )}

                        {analyticsError ? (
                            <p className="admin-signin__error" role="alert">
                                {analyticsError}
                            </p>
                        ) : null}

                        <details className="admin-signin__fallback">
                            <summary>접근 키로 열기</summary>
                            <form
                                className="admin-unlock"
                                onSubmit={handleUnlock}>
                                <div>
                                    <label htmlFor="admin-access-token">
                                        관리자 접근 키
                                    </label>
                                    <p>
                                        Google 로그인을 쓸 수 없을 때를 위한
                                        예비 수단입니다.
                                    </p>
                                </div>
                                <div className="admin-unlock__control">
                                    <input
                                        id="admin-access-token"
                                        type="password"
                                        autoComplete="current-password"
                                        value={tokenInput}
                                        onChange={(event) =>
                                            setTokenInput(event.target.value)
                                        }
                                    />
                                    <button type="submit">통계 열기</button>
                                </div>
                            </form>
                        </details>
                    </div>
                ) : null}

                {analyticsStatus === "denied" ? (
                    <div
                        className="admin-state admin-state--error"
                        role="alert">
                        <strong>이 계정에는 관리자 권한이 없습니다.</strong>
                        <p>
                            {session?.email
                                ? `${session.email} 계정으로 로그인했습니다. `
                                : ""}
                            {analyticsError}
                        </p>
                        <div className="admin-state__actions">
                            <button type="button" onClick={handleSignOut}>
                                다른 계정으로 로그인
                            </button>
                        </div>
                    </div>
                ) : null}

                {analyticsStatus === "loading" && !analytics ? (
                    <AnalyticsSkeleton />
                ) : null}

                {analyticsStatus === "error" ? (
                    <div
                        className="admin-state admin-state--error"
                        role="alert">
                        <strong>통계 연결을 확인해주세요.</strong>
                        <p>{analyticsError}</p>
                        <div className="admin-state__actions">
                            <button type="button" onClick={handleRetry}>
                                다시 시도
                            </button>
                            <button type="button" onClick={handleSignOut}>
                                로그아웃
                            </button>
                        </div>
                    </div>
                ) : null}

                {["ready", "loading"].includes(analyticsStatus) && analytics ? (
                    <div
                        className="admin-analytics"
                        aria-busy={analyticsStatus === "loading"}>
                        <div className="admin-metrics">
                            <AdminMetric
                                label={`${days}일 페이지뷰`}
                                value={formatNumber(analytics.totals.pageViews)}
                                detail="열린 페이지의 총합"
                            />
                            <AdminMetric
                                label={`${days}일 방문`}
                                value={formatNumber(analytics.totals.visits)}
                                detail="새로 시작된 방문 세션"
                            />
                            <AdminMetric
                                label="인기 페이지"
                                value={
                                    (analytics.topPages ?? [])[0]?.path ??
                                    "데이터 없음"
                                }
                                detail="가장 많이 본 경로"
                            />
                        </div>

                        <div className="admin-chart" aria-hidden="true">
                            {(analytics.series ?? []).map((item) => (
                                <div
                                    className="admin-chart__day"
                                    key={item.date}>
                                    <span
                                        className="admin-chart__bar"
                                        style={{
                                            "--bar-height": `${Math.max(4, (item.pageViews / maxSeriesValue) * 100)}%`,
                                        }}
                                        title={`${item.date}: ${formatNumber(item.pageViews)} 페이지뷰`}
                                    />
                                    <small>{item.date.slice(5)}</small>
                                </div>
                            ))}
                        </div>
                        <table className="admin-series-table">
                            <caption>{days}일 페이지뷰 추이 상세</caption>
                            <thead>
                                <tr>
                                    <th scope="col">날짜</th>
                                    <th scope="col">페이지뷰</th>
                                    <th scope="col">방문</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(analytics.series ?? []).map((item) => (
                                    <tr key={item.date}>
                                        <th scope="row">{item.date}</th>
                                        <td>{formatNumber(item.pageViews)}</td>
                                        <td>{formatNumber(item.visits)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="admin-breakdowns">
                            <article>
                                <h3>인기 페이지</h3>
                                <ol>
                                    {(analytics.topPages ?? [])
                                        .slice(0, 6)
                                        .map((item) => (
                                            <li key={item.path}>
                                                <span>{item.path}</span>
                                                <strong>
                                                    {formatNumber(
                                                        item.pageViews,
                                                    )}
                                                </strong>
                                            </li>
                                        ))}
                                </ol>
                            </article>
                            <article>
                                <h3>주요 유입 경로</h3>
                                <ol>
                                    {(analytics.referrers ?? [])
                                        .slice(0, 6)
                                        .map((item) => (
                                            <li key={item.label}>
                                                <span>
                                                    {item.label || "직접 방문"}
                                                </span>
                                                <strong>
                                                    {formatNumber(
                                                        item.pageViews,
                                                    )}
                                                </strong>
                                            </li>
                                        ))}
                                </ol>
                            </article>
                            <article className="admin-breakdown--countries">
                                <h3>방문 국가</h3>
                                <p className="admin-breakdown__description">
                                    페이지뷰가 발생한 국가를 많은 순서대로
                                    표시합니다.
                                </p>
                                {(analytics.countries ?? []).length > 0 ? (
                                    <ol>
                                        {analytics.countries
                                            .slice(0, 10)
                                            .map((item, index) => (
                                                <li
                                                    key={`${item.label}-${index}`}>
                                                    <span>
                                                        {item.label ||
                                                            "알 수 없음"}
                                                    </span>
                                                    <strong>
                                                        {formatNumber(
                                                            item.pageViews,
                                                        )}
                                                        <small> 페이지뷰</small>
                                                    </strong>
                                                </li>
                                            ))}
                                    </ol>
                                ) : (
                                    <p className="admin-breakdown__empty">
                                        선택한 기간의 국가 데이터가 없습니다.
                                    </p>
                                )}
                            </article>
                        </div>
                        <div className="admin-session">
                            <p>
                                {session?.kind === "google" && session.email
                                    ? `${session.email} 계정으로 확인 중입니다.`
                                    : "접근 키로 확인 중입니다."}
                            </p>
                            <button
                                className="admin-lock"
                                type="button"
                                onClick={handleSignOut}>
                                로그아웃
                            </button>
                        </div>
                    </div>
                ) : null}
            </section>

            <section
                className="admin-section"
                aria-labelledby="publication-admin-title">
                <div className="admin-section__head">
                    <div>
                        <h2 id="publication-admin-title">Publication 관리</h2>
                        <p>
                            Google Sheet 원본과 현재 배포 데이터를 함께
                            확인합니다.
                        </p>
                    </div>
                    <a
                        className="admin-primary-link"
                        href={
                            PUBLICATIONS_SHEET_URL || PUBLICATION_DIRECTORY_URL
                        }
                        target="_blank"
                        rel="noreferrer">
                        {PUBLICATIONS_SHEET_URL
                            ? "Google Sheet 열기"
                            : "GitHub 스냅샷 열기"}
                    </a>
                </div>

                <div className="admin-metrics admin-metrics--publications">
                    <AdminMetric
                        label="전체 Publication"
                        value={formatNumber(publicationSummary.total)}
                        detail="현재 생성 데이터 기준"
                    />
                    <AdminMetric
                        label="참여 연구실"
                        value={formatNumber(publicationSummary.labs)}
                        detail="등록된 연구실 태그"
                    />
                    <AdminMetric
                        label="수록 연도"
                        value={formatNumber(publicationSummary.years)}
                        detail="연도별 아카이브 범위"
                    />
                </div>

                <div className="admin-publication-search">
                    <label htmlFor="admin-publication-search">
                        Publication 검색
                    </label>
                    <input
                        id="admin-publication-search"
                        type="search"
                        placeholder="제목, 저자, 학회 또는 연구실"
                        value={publicationQuery}
                        onChange={(event) =>
                            setPublicationQuery(event.target.value)
                        }
                    />
                </div>

                <div className="admin-publication-list">
                    {visiblePublications.map((publication) => (
                        <article key={publication.id}>
                            <div>
                                <p>
                                    {publication.research_meta.published_place}
                                </p>
                                <h3>{publication.title}</h3>
                                <span>{publication.research_meta.author}</span>
                            </div>
                            <a
                                href={buildPublicationSearchUrl(publication.id)}
                                target="_blank"
                                rel="noreferrer">
                                스냅샷 찾기
                            </a>
                        </article>
                    ))}
                    {visiblePublications.length === 0 ? (
                        <p className="admin-publication-list__empty">
                            검색 결과가 없습니다.
                        </p>
                    ) : null}
                </div>
            </section>
        </div>
    );
}

export default AdminDashboard;
