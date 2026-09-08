import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPublications } from "../../utils/publicationData";
import "./AdminDashboard.css";

const ADMIN_API_URL = (import.meta.env.VITE_ADMIN_API_URL ?? "").replace(
    /\/$/,
    "",
);
const REPOSITORY_URL = "https://github.com/AjouAIGroup/AjouAIGroup.github.io";
const PUBLICATION_DIRECTORY_URL = `${REPOSITORY_URL}/tree/main/content/publications`;
const PUBLICATIONS = getAllPublications();

const numberFormatter = new Intl.NumberFormat("ko-KR");
const formatNumber = (value) => numberFormatter.format(Number(value) || 0);

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
    const [accessToken, setAccessToken] = useState(
        () => sessionStorage.getItem("aaig-admin-token") ?? "",
    );
    const [tokenInput, setTokenInput] = useState("");
    const [analytics, setAnalytics] = useState(null);
    const [analyticsStatus, setAnalyticsStatus] = useState(
        ADMIN_API_URL ? "locked" : "unconfigured",
    );
    const [analyticsError, setAnalyticsError] = useState("");
    const [retryRequest, setRetryRequest] = useState(0);
    const [publicationQuery, setPublicationQuery] = useState("");

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

    useEffect(() => {
        if (!ADMIN_API_URL || !accessToken) {
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
                        headers: { Authorization: `Bearer ${accessToken}` },
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

                setAnalytics(payload);
                setAnalyticsStatus("ready");
            } catch (error) {
                if (error.name === "AbortError") return;
                setAnalytics(null);
                setAnalyticsError(error.message);
                setAnalyticsStatus(
                    error.status === 401 ? "unauthorized" : "error",
                );
            }
        };

        loadAnalytics();
        return () => controller.abort();
    }, [accessToken, days, retryRequest]);

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
        sessionStorage.setItem("aaig-admin-token", normalizedToken);
        setAccessToken(normalizedToken);
        setTokenInput("");
    };

    const handleLock = () => {
        sessionStorage.removeItem("aaig-admin-token");
        setAccessToken("");
        setAnalytics(null);
        setAnalyticsStatus("locked");
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

                {["locked", "unauthorized"].includes(analyticsStatus) ? (
                    <form className="admin-unlock" onSubmit={handleUnlock}>
                        <div>
                            <label htmlFor="admin-access-token">
                                관리자 접근 키
                            </label>
                            <p>키는 현재 브라우저 탭에만 보관됩니다.</p>
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
                                aria-describedby={
                                    analyticsStatus === "unauthorized"
                                        ? "admin-token-error"
                                        : undefined
                                }
                            />
                            <button type="submit">통계 열기</button>
                        </div>
                        {analyticsStatus === "unauthorized" ? (
                            <p
                                id="admin-token-error"
                                className="admin-unlock__error">
                                {analyticsError}
                            </p>
                        ) : null}
                    </form>
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
                            <button type="button" onClick={handleLock}>
                                접근 키 다시 입력
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
                                    analytics.topPages[0]?.path ?? "데이터 없음"
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
                                    {analytics.topPages
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
                        <button
                            className="admin-lock"
                            type="button"
                            onClick={handleLock}>
                            통계 잠그기
                        </button>
                    </div>
                ) : null}
            </section>

            <section
                className="admin-section"
                aria-labelledby="publication-admin-title">
                <div className="admin-section__head">
                    <div>
                        <h2 id="publication-admin-title">Publication 관리</h2>
                        <p>현재 배포 데이터와 GitHub 원본을 함께 확인합니다.</p>
                    </div>
                    <a
                        className="admin-primary-link"
                        href={PUBLICATION_DIRECTORY_URL}
                        target="_blank"
                        rel="noreferrer">
                        GitHub에서 관리
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
                                원본 찾기
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
