import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
    formatNewsDate,
    getLatestNewsItems,
    getNewsTypeMeta,
} from "../../utils/newsData";
import ResearchWorkspaceImage from "../../assets/images/news_placeholders/research-workspace.webp";
import ComputeClusterImage from "../../assets/images/news_placeholders/compute-cluster.webp";
import RoboticsBenchImage from "../../assets/images/news_placeholders/robotics-bench.webp";
import SpeechStudioImage from "../../assets/images/news_placeholders/speech-studio.webp";
import KnowledgeGraphImage from "../../assets/images/news_placeholders/knowledge-graph.webp";
import { LABORATORIES } from "../../data/laboratories";
import { shuffleItems } from "../../utils/collections";
import { resolveScrollBehavior } from "../../utils/scrollMotion";
import {
    getLatestPublications,
    getPublicationYearSnapshot,
} from "../../utils/publicationData";
import "./Home.css";

const NEWS_IMAGES = [
    ResearchWorkspaceImage,
    ComputeClusterImage,
    RoboticsBenchImage,
    SpeechStudioImage,
    KnowledgeGraphImage,
];

function Home() {
    const newsRailRef = useRef(null);
    const publicationRailRef = useRef(null);
    const researchRailRef = useRef(null);
    const newsItems = useMemo(() => getLatestNewsItems(5), []);
    const orderedResearchAreas = useMemo(() => shuffleItems(LABORATORIES), []);
    const publicationSnapshot = useMemo(
        () => getPublicationYearSnapshot(),
        [],
    );
    const latestPublications = useMemo(() => getLatestPublications(5), []);

    const moveRail = (targetRef, direction) => {
        const rail = targetRef.current;
        if (!rail) {
            return;
        }

        rail.scrollBy({
            left: direction * Math.max(rail.clientWidth * 0.82, 320),
            behavior: resolveScrollBehavior(),
        });
    };

    const handleRailKeyDown = (targetRef, event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            moveRail(targetRef, 1);
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveRail(targetRef, -1);
        }
    };

    return (
        <>
        <section
            data-reveal
            data-reveal-load-delay="80"
            className="home-news-carousel"
            aria-labelledby="home-news-title">
            <div className="home-news-carousel__head">
                <div>
                    <p className="home-news-carousel__eyebrow">LATEST FROM AAIG</p>
                    <h2 id="home-news-title">News</h2>
                </div>
                <div className="home-news-carousel__actions">
                    <Link className="home-news-carousel__all" to="/news">
                        View all news ↗
                    </Link>
                </div>
            </div>

            <div className="home-news-carousel__rail-wrap">
                <div
                    ref={newsRailRef}
                    className="home-news-carousel__rail"
                    tabIndex="0"
                    role="region"
                    aria-label="Latest AAIG news. Scroll horizontally to browse."
                    onKeyDown={(event) => handleRailKeyDown(newsRailRef, event)}>
                    {newsItems.map((item, index) => (
                        <Link
                            key={item.id}
                            className="home-news-carousel__slide"
                            to={item.internal_slug ? `/news#${item.internal_slug}` : "/news"}>
                            <img
                                src={NEWS_IMAGES[index % NEWS_IMAGES.length]}
                                alt=""
                                className="home-news-carousel__image"
                            />
                            <div className="home-news-carousel__shade" aria-hidden="true" />
                            <div className="home-news-carousel__copy">
                                <p className="home-news-carousel__meta">
                                    {formatNewsDate(item.date)} · {getNewsTypeMeta(item.type).label}
                                </p>
                                <h3>{item.title}</h3>
                                <p>{item.summary}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="home-news-carousel__controls" aria-label="News carousel controls">
                    <button type="button" onClick={() => moveRail(newsRailRef, -1)} aria-label="Previous news">
                        ‹
                    </button>
                    <button type="button" onClick={() => moveRail(newsRailRef, 1)} aria-label="Next news">
                        ›
                    </button>
                </div>
            </div>
        </section>
        <section
            data-reveal
            data-reveal-load-delay="120"
            className="home-publication-snapshot"
            aria-labelledby="home-publication-snapshot-title">
            <div className="home-publication-snapshot__intro">
                <p className="home-publication-snapshot__label">
                    AAIG research output
                </p>
                <h2 id="home-publication-snapshot-title">
                    Publication summary {publicationSnapshot.year}
                </h2>
                <p>
                    A quick view of publications currently listed in the AAIG
                    archive.
                </p>
                <Link to="/publication" className="home-publication-snapshot__link">
                    View all publications ↗
                </Link>
            </div>
            <div className="home-publication-snapshot__results">
                <p className="home-publication-snapshot__total">
                    <strong>{publicationSnapshot.total}</strong>
                    <span>papers</span>
                </p>
                {publicationSnapshot.venues.length ? (
                    <ul className="home-publication-snapshot__venues" aria-label={`${publicationSnapshot.year} publication counts by venue`}>
                        {publicationSnapshot.venues.map(({ venue, count }) => (
                            <li key={venue}>
                                <span>{venue}</span>
                                <strong>{count}</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="home-publication-snapshot__empty">
                        New publications will appear here as they are added to
                        the archive.
                    </p>
                )}
            </div>
        </section>
        <section
            data-reveal
            data-reveal-load-delay="140"
            className="home-publication-index"
            aria-labelledby="home-publication-title">
            <div className="home-publication-index__intro">
                <h2 id="home-publication-title">Publications</h2>
                <p>Recent work from the four AAIG laboratories.</p>
                <div className="home-publication-index__actions">
                    <Link className="home-publication-index__link" to="/publication">
                        View all publications ↗
                    </Link>
                </div>
            </div>
            <div className="home-publication-index__rail-wrap">
                <div
                    ref={publicationRailRef}
                    className="home-publication-index__list"
                    tabIndex="0"
                    role="region"
                    aria-label="Latest AAIG publications. Scroll horizontally to browse."
                    onKeyDown={(event) => handleRailKeyDown(publicationRailRef, event)}>
                    {latestPublications.map((publication) => (
                        <Link
                            key={publication.id}
                            className="home-publication-index__item"
                            to={`/publication?q=${encodeURIComponent(publication.title)}`}>
                            <p className="home-publication-index__venue">
                                {publication.research_meta.published_place}
                            </p>
                            <h3>{publication.title}</h3>
                            <span className="home-publication-index__authors">
                                {publication.research_meta.author}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="home-publication-index__controls" aria-label="Publication carousel controls">
                    <button type="button" onClick={() => moveRail(publicationRailRef, -1)} aria-label="Previous publications">
                        ‹
                    </button>
                    <button type="button" onClick={() => moveRail(publicationRailRef, 1)} aria-label="Next publications">
                        ›
                    </button>
                </div>
            </div>
        </section>
        <section
            data-reveal
            data-reveal-load-delay="180"
            className="home-research-index"
            aria-labelledby="home-research-title">
            <div className="home-research-index__head">
                <div>
                    <h2 id="home-research-title">Research Areas</h2>
                </div>
                <Link className="home-research-index__all" to="/research">
                    Explore research ↗
                </Link>
            </div>

            <div className="home-research-index__rail-wrap">
                <div
                    ref={researchRailRef}
                    className="home-research-index__grid"
                    tabIndex="0"
                    role="region"
                    aria-label="AAIG research areas. Scroll horizontally to browse."
                    onKeyDown={(event) => handleRailKeyDown(researchRailRef, event)}>
                    {orderedResearchAreas.map((area) => (
                        <Link
                            key={area.key}
                            className={`home-research-index__card home-research-index__card--${area.key}`}
                            to="/research">
                            <figure className="home-research-index__media">
                                <img src={area.homeResearchImage} alt="" loading="lazy" decoding="async" />
                            </figure>
                            <div className="home-research-index__copy">
                                <p>{area.shortName}</p>
                                <h3>{area.researchTitle}</h3>
                                <span>{area.researchSummary}</span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="home-research-index__controls" aria-label="Research area carousel controls">
                    <button type="button" onClick={() => moveRail(researchRailRef, -1)} aria-label="Previous research areas">
                        ‹
                    </button>
                    <button type="button" onClick={() => moveRail(researchRailRef, 1)} aria-label="Next research areas">
                        ›
                    </button>
                </div>
            </div>
        </section>
        </>
    );
}

export default Home;
