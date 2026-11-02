import { useEffect, useMemo, useRef, useState } from "react";
import { formatAlbumDate, getPhotoAlbums } from "../../utils/photoData";
import "./Photo.css";

// One shared viewer for every album. A native modal dialog gives focus
// trapping, Escape to close, and focus return to the opening photo for free.
function PhotoViewer({ album, index, onChange, onClose }) {
    const dialogRef = useRef(null);
    const photo = album?.photos[index];
    const count = album?.photos.length ?? 0;

    useEffect(() => {
        const dialog = dialogRef.current;
        if (album && dialog && !dialog.open) {
            dialog.showModal();
        } else if (!album && dialog?.open) {
            dialog.close();
        }
    }, [album]);

    const step = (offset) => onChange((index + offset + count) % count);

    const handleKeyDown = (event) => {
        if (count < 2) return;
        if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className="photo-viewer"
            aria-label={album ? `${album.title} photos` : "Photo viewer"}
            onClose={onClose}
            onKeyDown={handleKeyDown}
            onClick={(event) => {
                // A click on the backdrop lands on the dialog element itself.
                if (event.target === dialogRef.current) {
                    dialogRef.current.close();
                }
            }}>
            {photo ? (
                <div className="photo-viewer__frame">
                    <div className="photo-viewer__bar">
                        <p aria-live="polite">
                            {album.title} · {index + 1} / {count}
                        </p>
                        <button
                            type="button"
                            className="photo-viewer__close"
                            onClick={() => dialogRef.current.close()}>
                            Close
                        </button>
                    </div>
                    <figure className="photo-viewer__figure">
                        <img src={photo.src} alt={photo.alt} />
                        {photo.caption ? (
                            <figcaption>{photo.caption}</figcaption>
                        ) : null}
                    </figure>
                    {count > 1 ? (
                        <div className="photo-viewer__nav">
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label="Previous photo">
                                <span aria-hidden="true">‹</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label="Next photo">
                                <span aria-hidden="true">›</span>
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </dialog>
    );
}

function Photo() {
    const albums = useMemo(() => getPhotoAlbums(), []);
    const [viewer, setViewer] = useState(null);
    const viewerAlbum = albums.find((album) => album.id === viewer?.albumId);

    return (
        <section data-reveal data-reveal-load-delay="60" className="photo-page">
            <div data-reveal className="tab-header page-head page-head--photo">
                <h1>Photos</h1>
                <p className="page-head__summary">
                    Moments from workshops, seminars, and events the five AAIG
                    laboratories share.
                </p>
            </div>

            {albums.length ? (
                <div className="photo-page__albums">
                    {albums.map((album) => (
                        <section
                            key={album.id}
                            id={album.id}
                            data-reveal
                            className="photo-album"
                            aria-labelledby={`${album.id}-title`}>
                            <header className="photo-album__head">
                                <p className="photo-album__meta">
                                    <time dateTime={album.date}>
                                        {formatAlbumDate(album.date)}
                                    </time>
                                    {album.location ? (
                                        <span>{album.location}</span>
                                    ) : null}
                                    {album.labs.length ? (
                                        <span>{album.labs.join(" · ")}</span>
                                    ) : null}
                                </p>
                                <h2 id={`${album.id}-title`}>{album.title}</h2>
                                {album.description ? (
                                    <p className="photo-album__description">
                                        {album.description}
                                    </p>
                                ) : null}
                            </header>
                            <ul className="photo-album__grid">
                                {album.photos.map((photo, index) => (
                                    <li key={photo.src}>
                                        <button
                                            type="button"
                                            className="photo-album__thumb"
                                            onClick={() =>
                                                setViewer({
                                                    albumId: album.id,
                                                    index,
                                                })
                                            }
                                            aria-label={`Open photo ${index + 1} of ${album.photos.length}: ${photo.alt}`}>
                                            <img
                                                src={photo.src}
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </button>
                                        {photo.caption ? (
                                            <p className="photo-album__caption">
                                                {photo.caption}
                                            </p>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            ) : (
                <p data-reveal className="photo-page__empty">
                    Photos from joint AAIG activities will appear here soon.
                </p>
            )}

            <PhotoViewer
                album={viewerAlbum}
                index={viewer?.index ?? 0}
                onChange={(index) =>
                    setViewer((current) => ({ ...current, index }))
                }
                onClose={() => setViewer(null)}
            />
        </section>
    );
}

export default Photo;
