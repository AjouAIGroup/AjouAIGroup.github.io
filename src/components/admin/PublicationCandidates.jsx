import { useCallback, useEffect, useMemo, useState } from "react";
import { toSlug } from "../../utils/publicationSheetRules";
import { formatDateTime, requestJson } from "./adminApi";

const REFRESH_POLL_INTERVAL_MS = 20_000;
// The refresh workflow also rebuilds and deploys the site, so it can take
// several minutes; polling stops after about fifteen.
const REFRESH_POLL_LIMIT = 45;
const EXCLUDED_NOTE = "연구실 홈페이지 수집 후보에서 제외했습니다.";

const isRunActive = (run) => Boolean(run) && run.status !== "completed";

// Lists lab-site publications the Google Sheet does not hold yet. Reviewing
// one opens the add form prefilled; excluding one parks it in the sheet as a
// hidden row, so it is not offered again and can still be restored later.
function PublicationCandidates({
    apiUrl,
    credential,
    sheetRows,
    disabled,
    onReview,
    onRowAdded,
    onFailure,
}) {
    const [state, setState] = useState({ status: "loading" });
    const [reloadRequest, setReloadRequest] = useState(0);
    const [polls, setPolls] = useState(0);
    const [starting, setStarting] = useState(false);
    const [excludingKey, setExcludingKey] = useState("");
    const [notice, setNotice] = useState(null);

    const reload = useCallback(
        () => setReloadRequest((count) => count + 1),
        [],
    );

    useEffect(() => {
        let cancelled = false;
        requestJson(`${apiUrl}/v1/publications/candidates`, credential)
            .then((payload) => {
                if (!cancelled) setState({ status: "ready", ...payload });
            })
            .catch((error) => {
                if (cancelled) return;
                onFailure(error);
                setState({
                    status: error.status === 503 ? "setup" : "error",
                    error: error.message,
                });
            });
        return () => {
            cancelled = true;
        };
    }, [apiUrl, credential, onFailure, reloadRequest]);

    const active = state.status === "ready" && isRunActive(state.run);
    useEffect(() => {
        if (!active || polls >= REFRESH_POLL_LIMIT) return undefined;
        const timer = setTimeout(() => {
            setPolls((count) => count + 1);
            reload();
        }, REFRESH_POLL_INTERVAL_MS);
        return () => clearTimeout(timer);
    }, [active, polls, reload]);

    const sheetTitles = useMemo(
        () => new Set(sheetRows.map((row) => toSlug(row.values.title))),
        [sheetRows],
    );
    const candidates = (state.candidates ?? []).filter(
        (candidate) => !sheetTitles.has(toSlug(candidate.values.title)),
    );
    const sources = state.sources ?? [];
    const failedSources = sources.filter(
        (source) => source.state !== "updated",
    );

    const handleRefresh = async () => {
        setStarting(true);
        setNotice(null);
        try {
            await requestJson(`${apiUrl}/v1/content/refresh`, credential, {
                method: "POST",
            });
            setPolls(0);
            setState((current) => ({
                ...current,
                run: {
                    ...(current.run ?? {}),
                    status: "queued",
                    conclusion: null,
                    createdAt: new Date().toISOString(),
                },
            }));
            setTimeout(reload, 5000);
        } catch (error) {
            onFailure(error);
            setNotice({ tone: "error", text: error.message });
        } finally {
            setStarting(false);
        }
    };

    const handleExclude = async (candidate) => {
        setExcludingKey(candidate.key);
        setNotice(null);
        try {
            const payload = await requestJson(
                `${apiUrl}/v1/publications/rows`,
                credential,
                {
                    method: "POST",
                    body: JSON.stringify({
                        values: {
                            ...candidate.values,
                            enabled: "FALSE",
                            notes: EXCLUDED_NOTE,
                        },
                    }),
                },
            );
            onRowAdded(payload.row);
            setNotice({
                tone: "success",
                text: `제외했습니다: ${candidate.values.title}. Sheet에 숨김 행으로 남겨 다시 표시하지 않습니다.`,
            });
        } catch (error) {
            onFailure(error);
            setNotice({ tone: "error", text: error.message });
        } finally {
            setExcludingKey("");
        }
    };

    const summary = (() => {
        if (state.status === "loading") return "수집 결과를 불러오는 중입니다.";
        if (state.status !== "ready") return "";
        if (!state.refreshedAt) {
            return "아직 수집 기록이 없습니다. 지금 수집을 누르면 연구실 홈페이지를 확인합니다.";
        }
        const updated = sources.length - failedSources.length;
        return `마지막 수집 ${formatDateTime(state.refreshedAt)} · 연구실 ${updated}/${sources.length}곳 확인 · Sheet에 없는 Publication ${candidates.length}건`;
    })();

    return (
        <section
            className="admin-candidates"
            aria-labelledby="admin-candidates-title"
            aria-busy={state.status === "loading"}>
            <div className="admin-candidates__head">
                <div>
                    <h3 id="admin-candidates-title">
                        연구실 홈페이지의 새 Publication
                    </h3>
                    <p aria-live="polite">{summary}</p>
                </div>
                {state.status === "ready" ? (
                    <div className="admin-sync__actions">
                        {active ? (
                            <span className="admin-pill admin-pill--active">
                                수집 중
                            </span>
                        ) : null}
                        {state.run?.url ? (
                            <a
                                href={state.run.url}
                                target="_blank"
                                rel="noreferrer">
                                실행 기록
                            </a>
                        ) : null}
                        <button
                            className="admin-button"
                            type="button"
                            onClick={handleRefresh}
                            disabled={starting || active}>
                            {starting ? "요청 중…" : "지금 수집"}
                        </button>
                    </div>
                ) : null}
            </div>

            {active ? (
                <p className="admin-sync__note">
                    연구실 홈페이지를 확인하고 있습니다. 보통 3~5분 걸리며,
                    끝나면 목록이 자동으로 바뀝니다.
                </p>
            ) : null}

            {state.status === "setup" ? (
                <p className="admin-sync__note">
                    연구실 홈페이지 수집을 쓰려면 Worker에 GitHub 토큰과
                    CONTENT_REFRESH_WORKFLOW_ID 설정이 필요합니다.
                </p>
            ) : null}

            {state.status === "error" ? (
                <div className="admin-editor__alert" role="alert">
                    <p>{state.error}</p>
                    <button type="button" onClick={reload}>
                        다시 시도
                    </button>
                </div>
            ) : null}

            {failedSources.length > 0 ? (
                <p className="admin-candidates__warning">
                    확인하지 못한 연구실:{" "}
                    {failedSources
                        .map(
                            (source) =>
                                `${source.lab}${source.message ? ` (${source.message})` : ""}`,
                        )
                        .join(", ")}
                    . 이전 수집 결과를 그대로 사용했습니다.
                </p>
            ) : null}

            {notice ? (
                <p
                    className={`admin-notice admin-notice--${notice.tone}`}
                    role={notice.tone === "error" ? "alert" : "status"}>
                    {notice.text}
                </p>
            ) : null}

            {candidates.length > 0 ? (
                <ul className="admin-sheet-list admin-candidates__list">
                    {candidates.map((candidate) => (
                        <li key={candidate.key}>
                            <div className="admin-sheet-list__body">
                                <p className="admin-sheet-list__meta">
                                    <span>{candidate.values.venue}</span>
                                    <span>{candidate.values.date}</span>
                                    <span>{candidate.values.labs}</span>
                                </p>
                                <h4>{candidate.values.title}</h4>
                                <p className="admin-sheet-list__authors">
                                    {candidate.values.authors}
                                </p>
                            </div>
                            <div className="admin-candidates__actions">
                                <button
                                    className="admin-button admin-button--primary"
                                    type="button"
                                    onClick={() => onReview(candidate)}
                                    disabled={disabled}
                                    aria-label={`${candidate.values.title} 검토 후 추가`}>
                                    검토 후 추가
                                </button>
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() => handleExclude(candidate)}
                                    disabled={disabled || Boolean(excludingKey)}
                                    aria-label={`${candidate.values.title} 제외`}>
                                    {excludingKey === candidate.key
                                        ? "제외 중…"
                                        : "제외"}
                                </button>
                                {candidate.sourceUrl ? (
                                    <a
                                        href={candidate.sourceUrl}
                                        target="_blank"
                                        rel="noreferrer">
                                        연구실 페이지
                                    </a>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}

            {state.status === "ready" &&
            state.refreshedAt &&
            candidates.length === 0 ? (
                <p className="admin-sync__note">
                    연구실 홈페이지의 Publication이 모두 Sheet에 있습니다.
                </p>
            ) : null}
        </section>
    );
}

export default PublicationCandidates;
