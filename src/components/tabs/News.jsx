import { useMemo } from "react";
import {
    formatNewsDate,
    getVisibleNewsItems,
    isValidExternalUrl,
} from "../../utils/newsData";
import "./News.css";

function News() {
    const newsItems = useMemo(() => getVisibleNewsItems(), []);

    const groupedByYear = useMemo(() => {
        const groups = new Map();

        newsItems.forEach((item) => {
            const yearLabel = String(
                item.year || new Date(item.date).getFullYear(),
            );
            if (!groups.has(yearLabel)) {
                groups.set(yearLabel, []);
            }

            groups.get(yearLabel).push(item);
        });

        return Array.from(groups.entries()).map(([year, items]) => ({
            year,
            items,
        }));
    }, [newsItems]);
    const yearOptions = useMemo(
        () => groupedByYear.map((group) => group.year),
        [groupedByYear],
    );

    return (
        <section data-reveal data-reveal-load-delay="60" className="news-page">
            <div data-reveal className="tab-header page-head page-head--news">
                <h1>News</h1>
                <p className="page-head__summary">
                    Awards, people, visits, and lab activity from the five AAIG
                    laboratories.
                </p>
            </div>

            {yearOptions.length > 0 ? (
                <nav
                    data-reveal
                    id="news-year-nav"
                    className="news-page__year-nav"
                    aria-label="Jump to news year">
                    <span>Browse by year</span>
                    <div>
                        {yearOptions.map((year) => (
                            <a
                                key={year}
                                href={`#news-year-${year}`}
                                className="news-page__year-link btn btn--secondary btn--sm interactive-button"
                                aria-label={`Jump to ${year} news`}>
                                {year}
                            </a>
                        ))}
                    </div>
                </nav>
            ) : null}

            <div id="news-archive-title" className="news-page__archive">
                {groupedByYear.map((group, groupIndex) => (
                    <section
                        key={group.year}
                        data-reveal
                        data-reveal-load-delay={`${80 + Math.min(groupIndex, 3) * 50}`}
                        className="news-page__year-group page-panel page-panel--compact"
                        aria-labelledby={`news-year-${group.year}`}>
                        <h2
                            id={`news-year-${group.year}`}
                            className="news-page__year-heading">
                            {group.year}
                        </h2>
                        <div className="news-page__list">
                            {group.items.map((item, index) => {
                                const details = item.venue;
                                const externalUrl = isValidExternalUrl(
                                    item.external_url,
                                )
                                    ? item.external_url
                                    : "";

                                return (
                                    <article
                                        key={item.id}
                                        id={item.internal_slug || item.id}
                                        data-reveal
                                        data-reveal-load-delay={`${120 + Math.min(index, 5) * 60}`}
                                        style={{
                                            "--reveal-delay": `${Math.min(index, 5) * 60}ms`,
                                        }}
                                        className={`news-page__item${externalUrl ? " news-page__item--with-action" : ""}`}>
                                        <p className="news-page__date">
                                            {formatNewsDate(item.date)}
                                        </p>
                                        <div className="news-page__content">
                                            <h3 className="news-page__title">
                                                {item.title}
                                            </h3>
                                            <p className="news-page__summary">
                                                {item.summary}
                                            </p>
                                            {details ? (
                                                <p className="news-page__details">
                                                    {details}
                                                </p>
                                            ) : null}
                                        </div>
                                        {externalUrl ? (
                                            <div className="news-page__action">
                                                <a
                                                    href={externalUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="news-page__action-link btn btn--tertiary animated-underline">
                                                    <span>Read more</span>
                                                    <span className="news-page__action-arrow">↗</span>
                                                </a>
                                            </div>
                                        ) : null}
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                ))}

                {groupedByYear.length === 0 ? (
                    <p className="news-page__empty">
                        No news items in this category yet.
                    </p>
                ) : null}
            </div>
        </section>
    );
}

export default News;
