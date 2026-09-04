import PublicationLinkIcons from "./Publication.LinkIcons";
import { PUBLICATION_AREA_LABELS } from "../../utils/publicationData";
import {
    getPublicationPrimaryLink,
    isValidHttpUrl,
} from "../../utils/publicationLinks";

function PublicationCard({
    area,
    meta,
    title,
    revealDelay = "0ms",
    revealLoadDelay = "80",
}) {
    const paperLink = getPublicationPrimaryLink(meta);
    const hasPaperLink = isValidHttpUrl(paperLink);
    const areaLabel = PUBLICATION_AREA_LABELS[area] ?? "Research";
    const authorText = meta.author?.trim() ?? "";
    const venueText = meta.published_place?.trim() ?? "";
    const dateText = meta.published_date?.trim() ?? "";
    const yearText = /^\d{4}/.exec(dateText)?.[0] ?? "Undated";

    return (
        <article
            data-reveal
            data-reveal-load-delay={revealLoadDelay}
            style={{ "--reveal-delay": revealDelay }}
            className="publication__card">
            <div className="publication__card-main">
                <div
                    className="publication__card-taxonomy"
                    aria-label="Publication classification">
                    <p className="publication__card-taxonomy-item">
                        <span className="publication__card-taxonomy-label">
                            Area
                        </span>
                        <span
                            className={`publication__card-taxonomy-value publication__card-taxonomy-value--${area}`}>
                            {areaLabel}
                        </span>
                    </p>
                    <p className="publication__card-taxonomy-item">
                        <span className="publication__card-taxonomy-label">
                            Year
                        </span>
                        <span className="publication__card-taxonomy-value publication__card-taxonomy-value--year">
                            {yearText}
                        </span>
                    </p>
                    {(meta.labs ?? []).map((lab) => (
                        <p
                            key={lab}
                            className="publication__card-taxonomy-item">
                            <span className="publication__card-taxonomy-label">
                                Lab
                            </span>
                            <span className="publication__card-taxonomy-value publication__card-taxonomy-value--lab">
                                {lab}
                            </span>
                        </p>
                    ))}
                </div>
                <h3 className="publication__card-title">
                    {hasPaperLink ? (
                        <a
                            href={paperLink}
                            target="_blank"
                            rel="noreferrer"
                            className="publication__card-title-link animated-underline">
                            {title}
                        </a>
                    ) : (
                        <span className="publication__card-title-link publication__card-title-link--muted">
                            {title}
                        </span>
                    )}
                </h3>

                {authorText ? (
                    <p className="publication__card-author">{authorText}</p>
                ) : null}
                {(venueText || dateText) && (
                    <p className="publication__card-meta-line">
                        {venueText ? (
                            <span className="publication__card-venue">
                                {venueText}
                            </span>
                        ) : null}
                        {dateText ? (
                            <span className="publication__card-date">
                                {dateText}
                            </span>
                        ) : null}
                    </p>
                )}
            </div>
            <div className="publication__card-links">
                <PublicationLinkIcons meta={meta} />
            </div>
        </article>
    );
}

export default PublicationCard;
