import { useCallback, useEffect, useMemo, useState } from "react";
import { LABORATORIES } from "../../data/laboratories";
import { validateAlbumMeta } from "../../utils/siteContentRules";
import { prepareImageUpload } from "./adminImage";
import { requestJson } from "./adminApi";

const LAB_NAMES = Object.fromEntries(
    LABORATORIES.map((lab) => [lab.key, lab.shortName]),
);

// How often the list re-checks while an edit is on its way to the site.
const PENDING_POLL_MS = 20 * 1000;
const todayKey = () => new Date().toISOString().slice(0, 10);

const blankAlbum = () => ({
    title: "",
    date: todayKey(),
    location: "",
    labs: [],
    description: "",
});

let photoKey = 0;
const nextKey = () => {
    photoKey += 1;
    return `photo-${photoKey}`;
};

// Existing photos are listed by file name; new ones carry their resized
// upload until the album is saved.
const photosFromAlbum = (album, folderUrl) =>
    (album.photos ?? []).map((photo) => ({
        key: nextKey(),
        file: photo.file,
        previewUrl: `${folderUrl}/${photo.file}`,
        alt: photo.alt ?? "",
        caption: photo.caption ?? "",
    }));

function AlbumForm({ editing, onChange, onPhotos, onSubmit, onCancel }) {
    const { album, photos, errors, saving, formError, mode } = editing;
    const formId = `admin-album-${editing.id ?? "new"}`;
    const field = (name) => `${formId}-${name}`;

    const setPhoto = (key, patch) =>
        onPhotos(
            photos.map((photo) =>
                photo.key === key ? { ...photo, ...patch } : photo,
            ),
        );
    const move = (index, offset) => {
        const next = [...photos];
        const [photo] = next.splice(index, 1);
        next.splice(index + offset, 0, photo);
        onPhotos(next);
    };

    const input = (name, label, { type = "text", wide, rows, hint } = {}) => (
        <div className={`admin-field${wide ? " admin-field--wide" : ""}`}>
            <label htmlFor={field(name)}>{label}</label>
            {rows ? (
                <textarea
                    id={field(name)}
                    rows={rows}
                    value={album[name]}
                    onChange={(event) => onChange(name, event.target.value)}
                />
            ) : (
                <input
                    id={field(name)}
                    type={type}
                    value={album[name]}
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
                <h3>{mode === "create" ? "새 앨범 만들기" : "앨범 수정"}</h3>
                <p>
                    사진은 올리기 전에 자동으로 줄이고 위치 정보를 지웁니다.
                    사진에 나온 분들이 공개에 동의한 사진만 올려주세요.
                </p>
            </div>

            <div className="admin-editor__grid">
                {input("title", "제목", { wide: true })}
                {input("date", "날짜", { type: "date" })}
                {input("location", "장소", {
                    hint: "예: 팔달관, 아주대학교. 비워도 됩니다.",
                })}
                <fieldset className="admin-field admin-field--wide admin-field--choices">
                    <legend>참여 연구실</legend>
                    <div>
                        {Object.entries(LAB_NAMES).map(([key, name]) => (
                            <label key={key}>
                                <input
                                    type="checkbox"
                                    checked={album.labs.includes(key)}
                                    onChange={(event) =>
                                        onChange(
                                            "labs",
                                            event.target.checked
                                                ? [...album.labs, key]
                                                : album.labs.filter(
                                                      (lab) => lab !== key,
                                                  ),
                                        )
                                    }
                                />
                                {name}
                            </label>
                        ))}
                    </div>
                    <p className="admin-field__hint">
                        다섯 연구실이 모두 참여했다면 비워두세요.
                    </p>
                </fieldset>
                {input("description", "설명", { wide: true, rows: 3 })}
            </div>

            <div className="admin-photo-list">
                <div className="admin-photo-list__head">
                    <h4>사진 {photos.length}장</h4>
                    <label className="admin-button">
                        {editing.preparing ? "사진 준비 중…" : "사진 추가"}
                        <input
                            className="admin-visually-hidden"
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={editing.preparing}
                            onChange={(event) => {
                                editing.onAdd([...(event.target.files ?? [])]);
                                event.target.value = "";
                            }}
                        />
                    </label>
                </div>
                {errors.photos ? (
                    <p className="admin-field__error">{errors.photos}</p>
                ) : null}
                {editing.uploadError ? (
                    <p className="admin-field__error">{editing.uploadError}</p>
                ) : null}
                <ol>
                    {photos.map((photo, index) => (
                        <li key={photo.key} className="admin-photo">
                            <img src={photo.previewUrl} alt="" />
                            <div className="admin-photo__fields">
                                <div className="admin-field">
                                    <label htmlFor={`${photo.key}-alt`}>
                                        사진 {index + 1} 설명
                                    </label>
                                    <input
                                        id={`${photo.key}-alt`}
                                        value={photo.alt}
                                        onChange={(event) =>
                                            setPhoto(photo.key, {
                                                alt: event.target.value,
                                            })
                                        }
                                        aria-invalid={
                                            errors[`photos.${index}.alt`]
                                                ? "true"
                                                : undefined
                                        }
                                        placeholder="무엇이 찍혀 있는지 짧게"
                                    />
                                    {errors[`photos.${index}.alt`] ? (
                                        <p className="admin-field__error">
                                            {errors[`photos.${index}.alt`]}
                                        </p>
                                    ) : null}
                                </div>
                                <div className="admin-field">
                                    <label htmlFor={`${photo.key}-caption`}>
                                        캡션 (선택)
                                    </label>
                                    <input
                                        id={`${photo.key}-caption`}
                                        value={photo.caption}
                                        onChange={(event) =>
                                            setPhoto(photo.key, {
                                                caption: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="admin-photo__actions">
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() => move(index, -1)}
                                    disabled={index === 0}
                                    aria-label={`사진 ${index + 1} 앞으로`}>
                                    ↑
                                </button>
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() => move(index, 1)}
                                    disabled={index === photos.length - 1}
                                    aria-label={`사진 ${index + 1} 뒤로`}>
                                    ↓
                                </button>
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() =>
                                        onPhotos(
                                            photos.filter(
                                                (item) =>
                                                    item.key !== photo.key,
                                            ),
                                        )
                                    }
                                    aria-label={`사진 ${index + 1} 빼기`}>
                                    빼기
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
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
                    {saving ? "저장 중…" : "저장하고 게시"}
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

function PhotoAlbumEditor({ apiUrl, session, onSessionExpired }) {
    const [state, setState] = useState({ status: "loading", error: "" });
    const [reload, setReload] = useState(0);
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
        requestJson(`${apiUrl}/v1/site/photos`, session.credential)
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

    // Albums with an edit still on its way to the site cannot be edited again
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
    const folderUrl = (id) => `${state.rawBase}/${state.photoPath}/${id}`;

    const update = (patch) =>
        setEditing((current) => (current ? { ...current, ...patch } : current));

    const addPhotos = async (files) => {
        if (!files.length) return;
        update({ preparing: true, uploadError: "" });
        const added = [];
        const failures = [];
        for (const file of files) {
            try {
                const upload = await prepareImageUpload(file);
                added.push({
                    key: nextKey(),
                    data: upload.data,
                    previewUrl: upload.previewUrl,
                    alt: "",
                    caption: "",
                });
            } catch (error) {
                failures.push(error.message);
            }
        }
        setEditing((current) =>
            current
                ? {
                      ...current,
                      photos: [...current.photos, ...added],
                      preparing: false,
                      uploadError: failures.join(" "),
                  }
                : current,
        );
    };

    const open = (album) => {
        setNotice("");
        setEditing({
            mode: album ? "edit" : "create",
            id: album?.id ?? null,
            album: album
                ? {
                      title: album.title ?? "",
                      date: album.date ?? "",
                      location: album.location ?? "",
                      labs: album.labs ?? [],
                      description: album.description ?? "",
                  }
                : blankAlbum(),
            photos: album ? photosFromAlbum(album, folderUrl(album.id)) : [],
            errors: {},
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { album, photos, mode, id } = editing;
        const errors = validateAlbumMeta({
            ...album,
            photos: photos.map((photo, index) => ({
                file: photo.file ?? `new-${index}.webp`,
                alt: photo.alt,
                caption: photo.caption,
            })),
        });
        if (Object.keys(errors).length) {
            update({ errors, formError: "입력 내용을 확인해주세요." });
            return;
        }

        update({ saving: true, errors: {}, formError: "" });
        const body = JSON.stringify({
            album,
            photos: photos.map((photo) =>
                photo.data
                    ? {
                          data: photo.data,
                          alt: photo.alt,
                          caption: photo.caption,
                      }
                    : {
                          file: photo.file,
                          alt: photo.alt,
                          caption: photo.caption,
                      },
            ),
        });
        try {
            await requestJson(
                mode === "create"
                    ? `${apiUrl}/v1/site/photos`
                    : `${apiUrl}/v1/site/photos/${encodeURIComponent(id)}`,
                session.credential,
                { method: mode === "create" ? "POST" : "PUT", body },
            );
            setEditing(null);
            setNotice(
                "저장 요청을 접수했습니다. 5분쯤 뒤 Photos 페이지에 반영됩니다.",
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

    const handleDelete = async (album) => {
        if (
            !window.confirm(
                `"${album.title}" 앨범과 사진 ${album.photos?.length ?? 0}장을 삭제할까요?`,
            )
        ) {
            return;
        }
        try {
            await requestJson(
                `${apiUrl}/v1/site/photos/${encodeURIComponent(album.id)}`,
                session.credential,
                { method: "DELETE" },
            );
            setNotice("삭제 요청을 접수했습니다. 5분쯤 뒤 반영됩니다.");
            setReload((count) => count + 1);
        } catch (error) {
            handleFailure(error);
            setNotice(error.message);
        }
    };

    if (state.status === "setup" || state.status === "error") {
        return (
            <div
                className={`admin-state admin-state--${state.status === "setup" ? "setup" : "error"}`}
                role={state.status === "error" ? "alert" : undefined}>
                <strong>
                    {state.status === "setup"
                        ? "Photos 편집 설정이 필요합니다."
                        : "앨범을 불러오지 못했습니다."}
                </strong>
                <p>{state.error}</p>
                {state.status === "error" ? (
                    <div className="admin-state__actions">
                        <button
                            type="button"
                            onClick={() => setReload((count) => count + 1)}>
                            다시 시도
                        </button>
                    </div>
                ) : null}
            </div>
        );
    }
    if (state.status === "loading") {
        return (
            <div className="admin-analytics-skeleton" role="status">
                <span>앨범을 불러오는 중입니다.</span>
                <div />
                <div />
            </div>
        );
    }

    const form = editing ? (
        <AlbumForm
            editing={{ ...editing, onAdd: addPhotos }}
            onChange={(name, value) =>
                setEditing((current) => ({
                    ...current,
                    album: { ...current.album, [name]: value },
                }))
            }
            onPhotos={(photos) => update({ photos })}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
        />
    ) : null;

    return (
        <div className="admin-sheet-editor">
            {notice ? (
                <p className="admin-sheet-editor__notice" role="status">
                    {notice}
                </p>
            ) : null}

            <div className="admin-sheet-toolbar">
                <p className="admin-sheet-editor__summary">
                    앨범 {state.albums.length}개
                </p>
                <div className="admin-sheet-toolbar__actions">
                    <button
                        className="admin-button admin-button--primary"
                        type="button"
                        onClick={() => open(null)}
                        disabled={Boolean(editing)}>
                        새 앨범 만들기
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

            {editing?.mode === "create" ? form : null}

            <ul className="admin-sheet-list">
                {state.albums.map((album) =>
                    editing?.id === album.id ? (
                        <li key={album.id}>{form}</li>
                    ) : (
                        <li key={album.id}>
                            {album.photos?.[0] ? (
                                <img
                                    className="admin-album-thumb"
                                    src={`${folderUrl(album.id)}/${album.photos[0].file}`}
                                    alt=""
                                />
                            ) : null}
                            <div className="admin-sheet-list__body">
                                <p className="admin-sheet-list__meta">
                                    <span>{album.date}</span>
                                    <span>
                                        사진 {album.photos?.length ?? 0}장
                                    </span>
                                    {pending.has(album.id) ? (
                                        <span className="admin-pill admin-pill--active">
                                            반영 중 · 끝나면 수정할 수 있어요
                                        </span>
                                    ) : null}
                                </p>
                                <h3>{album.title}</h3>
                                {album.location ? (
                                    <p className="admin-sheet-list__authors">
                                        {album.location}
                                    </p>
                                ) : null}
                            </div>
                            <div className="admin-sheet-list__actions">
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() => open(album)}
                                    disabled={
                                        Boolean(editing) ||
                                        pending.has(album.id)
                                    }
                                    aria-label={`${album.title} 수정`}>
                                    수정
                                </button>
                                <button
                                    className="admin-button"
                                    type="button"
                                    onClick={() => handleDelete(album)}
                                    disabled={
                                        Boolean(editing) ||
                                        pending.has(album.id)
                                    }
                                    aria-label={`${album.title} 삭제`}>
                                    삭제
                                </button>
                            </div>
                        </li>
                    ),
                )}
            </ul>

            {state.albums.length === 0 && !editing ? (
                <p className="admin-publication-list__empty">
                    아직 앨범이 없습니다. 새 앨범을 만들어 첫 사진을 올려보세요.
                </p>
            ) : null}
        </div>
    );
}

export default PhotoAlbumEditor;
