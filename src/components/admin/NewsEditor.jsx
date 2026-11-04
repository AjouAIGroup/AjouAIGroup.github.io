import { useCallback, useEffect, useMemo, useState } from "react";
import { isPublishedNewsItem } from "../../utils/newsData";
import {
    NEWS_TYPE_LABELS,
    validateNewsFields,
    validateNewsOverride,
} from "../../utils/siteContentRules";
import { prepareImageUpload } from "./adminImage";
import { requestJson } from "./adminApi";

const LIST_PAGE_SIZE = 5;
// How often the list re-checks while an edit is on its way to the site.
const PENDING_POLL_MS = 20 * 1000;
const EDITABLE_TYPES = [
    "paper_accepted",
    "award",
    "notice",
    "seminar",
    "workshop",
    "visit",
    "new_member",
    "graduation",
    "general",
];

const todayKey = () => new Date().toISOString().slice(0, 10);

const blankDraft = () => ({
    title: "",
    summary: "",
    date: todayKey(),
    type: "paper_accepted",
    venue: "",
    related_person: "",
    external_url: "",
    image_alt: "",
});

const draftFromItem = (item) => ({
    title: item.title ?? "",
    summary: item.summary ?? "",
    date: item.date ?? "",
    type: item.type ?? "general",
    venue: item.venue ?? "",
    related_person: item.related_person ?? "",
    external_url: item.external_url ?? "",
    image_alt: item.image_alt ?? "",
});

const describeSource = (item) => {
    if (item.source_path) return "홈페이지에서 작성";
    if (item.generated_from === "publications-auto") {
        return "Publication에서 자동 생성";
    }
    return "연구실 홈페이지에서 수집";
};

function NewsForm({
    editing,
    imageBase,
    onChange,
    onImage,
    onSubmit,
    onCancel,
}) {
    const { draft, errors, saving, formError, mode, item } = editing;
    const isManual = mode === "create" || Boolean(item?.source_path);
    const formId = `admin-news-${editing.item?.id ?? "new"}`;
    const field = (name) => `${formId}-${name}`;
    const currentImage = editing.upload
        ? editing.upload.previewUrl
        : !editing.removeImage && item?.image
          ? `${imageBase}/${item.image}`
          : "";

    const input = (name, label, { type = "text", wide, hint, rows } = {}) => (
        <div className={`admin-field${wide ? " admin-field--wide" : ""}`}>
            <label htmlFor={field(name)}>{label}</label>
            {rows ? (
                <textarea
                    id={field(name)}
                    rows={rows}
                    value={draft[name]}
                    onChange={(event) => onChange(name, event.target.value)}
                    aria-invalid={errors[name] ? "true" : undefined}
                />
            ) : (
                <input
                    id={field(name)}
                    type={type}
                    value={draft[name]}
                    onChange={(event) => onChange(name, event.target.value)}
                    aria-invalid={errors[name] ? "true" : undefined}
                    autoComplete="off"
                />
            )}
            {hint ? <p className="admin-field__hint">{hint}</p> : null}
            {errors[name] ? (
                <p className="admin-field__error">{errors[name]}</p>
            ) : null}
        </div>
    );

    return (
        <form className="admin-editor" onSubmit={onSubmit} noValidate>
            <div className="admin-editor__head">
                <h3>{mode === "create" ? "새 News 작성" : "News 수정"}</h3>
                <p>
                    {isManual
                        ? "저장하면 자동으로 커밋되어 5분쯤 뒤 홈페이지에 반영됩니다."
                        : "연구실 홈페이지나 Publication에서 온 글입니다. 제목, 요약, 사진만 바꿀 수 있고, 다음 수집 때도 바꾼 내용이 유지됩니다."}
                </p>
            </div>

            <div className="admin-editor__grid">
                {input("title", "제목", { wide: true })}
                {isManual ? input("date", "날짜", { type: "date" }) : null}
                {isManual ? (
                    <div className="admin-field">
                        <label htmlFor={field("type")}>종류</label>
                        <select
                            id={field("type")}
                            value={draft.type}
                            onChange={(event) =>
                                onChange("type", event.target.value)
                            }>
                            {EDITABLE_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {NEWS_TYPE_LABELS[type]}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : null}
                {input("summary", "요약", { wide: true, rows: 3 })}
                {isManual
                    ? input("venue", "학회·행사", {
                          hint: "예: EMNLP 2026. 비워도 됩니다.",
                      })
                    : null}
                {isManual
                    ? input("related_person", "관련 연구실·인물", {
                          hint: "예: SAIL, Jonghyeok Gong",
                      })
                    : null}
                {isManual
                    ? input("external_url", "외부 링크", {
                          type: "url",
                          wide: true,
                          hint: "연구실 공지 등 원문 주소. 비워도 됩니다.",
                      })
                    : null}

                <div className="admin-field admin-field--wide admin-image-field">
                    <span className="admin-image-field__label">사진</span>
                    {currentImage ? (
                        <img
                            className="admin-image-field__preview"
                            src={currentImage}
                            alt=""
                        />
                    ) : null}
                    <div className="admin-image-field__actions">
                        <label className="admin-button">
                            {currentImage ? "사진 바꾸기" : "사진 올리기"}
                            <input
                                className="admin-visually-hidden"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    onImage(event.target.files?.[0]);
                                    event.target.value = "";
                                }}
                            />
                        </label>
                        {currentImage ? (
                            <button
                                className="admin-button"
                                type="button"
                                onClick={() => onImage(null)}>
                                사진 빼기
                            </button>
                        ) : null}
                    </div>
                    {editing.imageError ? (
                        <p className="admin-field__error">
                            {editing.imageError}
                        </p>
                    ) : null}
                </div>
                {currentImage
                    ? input("image_alt", "사진 설명", {
                          wide: true,
                          hint: "화면 낭독기가 읽는 설명입니다. 예: 포스터 앞에서 발표하는 연구원들",
                      })
                    : null}
            </div>

            {formError ? (
                <div className="admin-editor__alert" role="alert">
                    <p>{formError}</p>
                </div>
            ) : null}

            <div className="admin-editor__actions">
                <button
                    className="admin-button admin-button--primary"
                    type="submit"
                    disabled={saving || editing.preparing}>
                    {saving
                        ? "저장 중…"
                        : editing.preparing
                          ? "사진 준비 중…"
                          : "저장하고 게시"}
                </button>
                <button
                    className="admin-button"
                    type="button"
                    onClick={onCancel}
                    disabled={saving}>
                    취소
                </button>
            </div>
        </form>
    );
}

function NewsEditor({ apiUrl, session, onSessionExpired }) {
    const [state, setState] = useState({ status: "loading", error: "" });
    const [reload, setReload] = useState(0);
    const [query, setQuery] = useState("");
    const [listOpen, setListOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(LIST_PAGE_SIZE);
    const [editing, setEditing] = useState(null);
    const [notice, setNotice] = useState("");

    const handleFailure = useCallback(
        (error) => {
            if (error.status === 401) onSessionExpired();
        },
        [onSessionExpired],
    );

    useEffect(() => {
        let cancelled = false;
        requestJson(`${apiUrl}/v1/site/news`, session.credential)
            .then((payload) => {
                if (!cancelled) setState({ status: "ready", ...payload });
            })
            .catch((error) => {
                if (cancelled) return;
                handleFailure(error);
                setState({
                    status: error.status === 503 ? "setup" : "error",
                    error: error.message,
                });
            });
        return () => {
            cancelled = true;
        };
    }, [apiUrl, session.credential, reload, handleFailure]);

    // Items with an edit still on its way to the site cannot be edited again
    // until it lands; the Worker refuses that edit anyway.
    const pending = useMemo(
        () => new Set(state.pending ?? []),
        [state.pending],
    );

    // The lock lifts when the workflow finishes, so the list re-checks until
    // nothing is pending instead of leaving the buttons disabled until reload.
    useEffect(() => {
        if (!pending.size) return undefined;
        const timer = setTimeout(
            () => setReload((count) => count + 1),
            PENDING_POLL_MS,
        );
        return () => clearTimeout(timer);
    }, [pending]);
    const items = useMemo(
        () => (state.items ?? []).filter(isPublishedNewsItem),
        [state.items],
    );
    const hiddenItems = useMemo(
        () =>
            Object.entries(state.overrides ?? {})
                .filter(([, override]) => override.hidden)
                .map(([id, override]) => ({
                    id,
                    title: override.hidden_title || id,
                })),
        [state.overrides],
    );
    const matching = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return needle
            ? items.filter((item) =>
                  `${item.title} ${item.summary} ${item.venue} ${item.related_person}`
                      .toLowerCase()
                      .includes(needle),
              )
            : items;
    }, [items, query]);
    const visible = query.trim() ? matching : matching.slice(0, visibleCount);
    const imageBase = `${state.rawBase}/${state.imagePath}`;

    const open = (item) => {
        setNotice("");
        setEditing({
            mode: item ? "edit" : "create",
            item,
            draft: item ? draftFromItem(item) : blankDraft(),
            errors: {},
            upload: null,
            removeImage: false,
        });
    };

    const update = (patch) =>
        setEditing((current) => (current ? { ...current, ...patch } : current));

    const handleImage = async (file) => {
        if (!file) {
            update({ upload: null, removeImage: true, imageError: "" });
            return;
        }
        update({ preparing: true, imageError: "" });
        try {
            const upload = await prepareImageUpload(file);
            update({ upload, removeImage: false, preparing: false });
        } catch (error) {
            update({ preparing: false, imageError: error.message });
        }
    };

    const send = async (method, path, body) => {
        const response = await requestJson(
            `${apiUrl}${path}`,
            session.credential,
            { method, body: body ? JSON.stringify(body) : undefined },
        );
        return response;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { draft, item, mode, upload, removeImage } = editing;
        const isManual = mode === "create" || Boolean(item?.source_path);
        const hasImage = Boolean(upload) || (!removeImage && item?.image);
        const checked = { ...draft, image: hasImage ? "pending" : "" };
        const errors = isManual
            ? validateNewsFields(checked)
            : validateNewsOverride({
                  title: draft.title,
                  summary: draft.summary,
                  image: checked.image,
                  image_alt: draft.image_alt,
              });
        if (Object.keys(errors).length) {
            update({ errors, formError: "입력 내용을 확인해주세요." });
            return;
        }

        update({ saving: true, errors: {}, formError: "" });
        const body = {
            fields: draft,
            image: upload ? { data: upload.data } : undefined,
            removeImage,
        };
        try {
            await (mode === "create"
                ? send("POST", "/v1/site/news", body)
                : send(
                      "PUT",
                      `/v1/site/news/${encodeURIComponent(item.id)}`,
                      body,
                  ));
            setEditing(null);
            setNotice(
                "저장 요청을 접수했습니다. 5분쯤 뒤 홈페이지에 반영되고, 이 목록도 그때 갱신됩니다.",
            );
            setReload((count) => count + 1);
        } catch (error) {
            handleFailure(error);
            update({
                saving: false,
                errors: error.payload?.fields ?? {},
                formError: error.message,
            });
        }
    };

    const handleDelete = async (item) => {
        const manual = Boolean(item.source_path);
        const question = manual
            ? `"${item.title}" News를 삭제할까요? 되돌리려면 다시 작성해야 합니다.`
            : `"${item.title}"을(를) 홈페이지에서 숨길까요? 숨긴 글은 아래에서 다시 보이게 할 수 있습니다.`;
        if (!window.confirm(question)) return;
        try {
            await send(
                "DELETE",
                `/v1/site/news/${encodeURIComponent(item.id)}`,
            );
            setNotice(
                manual
                    ? "삭제 요청을 접수했습니다. 5분쯤 뒤 반영됩니다."
                    : "숨기기 요청을 접수했습니다. 5분쯤 뒤 반영됩니다.",
            );
            setReload((count) => count + 1);
        } catch (error) {
            handleFailure(error);
            setNotice(error.message);
        }
    };

    const handleRestore = async (id) => {
        try {
            await send("PUT", `/v1/site/news/${encodeURIComponent(id)}`, {
                restore: true,
            });
            setNotice("다시 보이기 요청을 접수했습니다. 5분쯤 뒤 반영됩니다.");
            setReload((count) => count + 1);
        } catch (error) {
            handleFailure(error);
            setNotice(error.message);
        }
    };

    if (state.status === "setup") {
        return (
            <div className="admin-state admin-state--setup">
                <strong>News 편집 설정이 필요합니다.</strong>
                <p>{state.error}</p>
            </div>
        );
    }
    if (state.status === "error") {
        return (
            <div className="admin-state admin-state--error" role="alert">
                <strong>News를 불러오지 못했습니다.</strong>
                <p>{state.error}</p>
                <div className="admin-state__actions">
                    <button
                        type="button"
                        onClick={() => setReload((count) => count + 1)}>
                        다시 시도
                    </button>
                </div>
            </div>
        );
    }
    if (state.status === "loading") {
        return (
            <div className="admin-analytics-skeleton" role="status">
                <span>News를 불러오는 중입니다.</span>
                <div />
                <div />
            </div>
        );
    }

    const form = (
        <NewsForm
            editing={editing}
            imageBase={imageBase}
            onChange={(name, value) =>
                setEditing((current) => ({
                    ...current,
                    draft: { ...current.draft, [name]: value },
                }))
            }
            onImage={handleImage}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
        />
    );

    return (
        <div className="admin-sheet-editor">
            {notice ? (
                <p className="admin-sheet-editor__notice" role="status">
                    {notice}
                </p>
            ) : null}

            <button
                className="admin-button admin-sheet-editor__toggle"
                type="button"
                aria-expanded={listOpen}
                aria-controls="admin-news-rows"
                onClick={() => {
                    setListOpen((current) => !current);
                    setVisibleCount(LIST_PAGE_SIZE);
                }}
                disabled={Boolean(editing) && listOpen}>
                {listOpen ? "News 목록 접기" : "News 목록 펼치기"}
                <span>{items.length}건</span>
            </button>

            {listOpen ? (
                <div id="admin-news-rows" className="admin-sheet-editor__rows">
                    <div className="admin-sheet-toolbar">
                        <div className="admin-publication-search">
                            <label htmlFor="admin-news-search">News 검색</label>
                            <input
                                id="admin-news-search"
                                type="search"
                                placeholder="제목, 요약, 학회, 연구실"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                        </div>
                        <div className="admin-sheet-toolbar__actions">
                            <button
                                className="admin-button admin-button--primary"
                                type="button"
                                onClick={() => open(null)}
                                disabled={Boolean(editing)}>
                                새 News 작성
                            </button>
                            <button
                                className="admin-button"
                                type="button"
                                onClick={() => setReload((count) => count + 1)}
                                disabled={Boolean(editing)}>
                                새로 불러오기
                            </button>
                        </div>
                    </div>

                    <p className="admin-sheet-editor__summary">
                        홈페이지 News {items.length}건
                        {query.trim()
                            ? ` · 검색 결과 ${matching.length}건`
                            : ""}
                    </p>

                    {editing?.mode === "create" ? form : null}

                    <ul className="admin-sheet-list">
                        {visible.map((item) =>
                            editing?.item?.id === item.id ? (
                                <li key={item.id}>{form}</li>
                            ) : (
                                <li key={item.id}>
                                    <div className="admin-sheet-list__body">
                                        <p className="admin-sheet-list__meta">
                                            <span>{item.date}</span>
                                            <span>{describeSource(item)}</span>
                                            {item.image ? (
                                                <span>사진</span>
                                            ) : null}
                                            {pending.has(item.id) ? (
                                                <span className="admin-pill admin-pill--active">
                                                    반영 중 · 끝나면 수정할 수
                                                    있어요
                                                </span>
                                            ) : null}
                                            {item.edited ? (
                                                <span className="admin-pill admin-pill--idle">
                                                    수정됨
                                                </span>
                                            ) : null}
                                        </p>
                                        <h3>{item.title}</h3>
                                        <p className="admin-sheet-list__authors">
                                            {item.summary}
                                        </p>
                                    </div>
                                    <div className="admin-sheet-list__actions">
                                        <button
                                            className="admin-button"
                                            type="button"
                                            onClick={() => open(item)}
                                            disabled={
                                                Boolean(editing) ||
                                                pending.has(item.id)
                                            }
                                            aria-label={`${item.title} 수정`}>
                                            수정
                                        </button>
                                        <button
                                            className="admin-button"
                                            type="button"
                                            onClick={() => handleDelete(item)}
                                            disabled={
                                                Boolean(editing) ||
                                                pending.has(item.id)
                                            }
                                            aria-label={`${item.title} ${item.source_path ? "삭제" : "숨기기"}`}>
                                            {item.source_path
                                                ? "삭제"
                                                : "숨기기"}
                                        </button>
                                    </div>
                                </li>
                            ),
                        )}
                    </ul>

                    {visible.length === 0 ? (
                        <p className="admin-publication-list__empty">
                            검색 결과가 없습니다.
                        </p>
                    ) : null}

                    {!query.trim() && matching.length > visibleCount ? (
                        <button
                            className="admin-button admin-sheet-list__more"
                            type="button"
                            onClick={() =>
                                setVisibleCount(
                                    (count) => count + LIST_PAGE_SIZE,
                                )
                            }>
                            더보기 ({visible.length}/{matching.length})
                        </button>
                    ) : null}
                </div>
            ) : null}

            {hiddenItems.length ? (
                <details className="admin-hidden-news">
                    <summary>숨긴 News {hiddenItems.length}건</summary>
                    <ul>
                        {hiddenItems.map((hidden) => (
                            <li key={hidden.id}>
                                <span>{hidden.title}</span>
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() => handleRestore(hidden.id)}>
                                    다시 보이기
                                </button>
                            </li>
                        ))}
                    </ul>
                </details>
            ) : null}
        </div>
    );
}

export default NewsEditor;
