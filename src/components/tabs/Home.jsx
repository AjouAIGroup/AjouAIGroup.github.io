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
    const railRef = useRef(null);
    const laboratoriesRailRef = useRef(null);
    const newsItems = useMemo(() => getLatestNewsItems(5), []);
    const orderedResearchAreas = useMemo(() => shuffleItems(LABORATORIES), []);
    const orderedLaboratories = useMemo(() => shuffleItems(LABORATORIES), []);
    const publicationSnapshot = useMemo(
        () => getPublicationYearSnapshot(),
        [],
    );
    const latestPublications = useMemo(() => getLatestPublications(3), []);

    const moveRail = (targetRef, direction) => {
        const rail = targetRef.current;
        if (!rail) {
            return;
        }

        rail.scrollBy({
            left: direction * Math.max(rail.clientWidth * 0.82, 320),
            behavior: "smooth",
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
                    <div className="home-news-carousel__controls" aria-label="News carousel controls">
                        <button type="button" onClick={() => moveRail(railRef, -1)} aria-label="Previous news">
                            ←
                        </button>
                        <button type="button" onClick={() => moveRail(railRef, 1)} aria-label="Next news">
                            →
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={railRef}
                className="home-news-carousel__rail"
                tabIndex="0"
                role="region"
                aria-label="Latest AAIG news. Scroll horizontally to browse."
                onKeyDown={(event) => handleRailKeyDown(railRef, event)}>
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
        </section>
        <section
            data-reveal
            data-reveal-load-delay="120"
            className="home-laboratories-index"
            aria-labelledby="home-laboratories-title">
            <div className="home-laboratories-index__head">
                <div>
                    <h2 id="home-laboratories-title">Laboratories</h2>
                </div>
                <div className="home-laboratories-index__actions">
                    <Link className="home-laboratories-index__all" to="/lab">
                        Explore laboratories ↗
                    </Link>
                    <div className="home-laboratories-index__controls" aria-label="Laboratories carousel controls">
                        <button type="button" onClick={() => moveRail(laboratoriesRailRef, -1)} aria-label="Previous laboratories">
                            ←
                        </button>
                        <button type="button" onClick={() => moveRail(laboratoriesRailRef, 1)} aria-label="Next laboratories">
                            →
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={laboratoriesRailRef}
                className="home-laboratories-index__rail"
                tabIndex="0"
                role="region"
                aria-label="AAIG laboratories. Scroll horizontally to browse."
                onKeyDown={(event) => handleRailKeyDown(laboratoriesRailRef, event)}>
                {orderedLaboratories.map((lab) => (
                    <Link key={lab.key} className="home-laboratories-index__card" to="/lab">
                        <div className="home-laboratories-index__identity">
                            {lab.logo ? (
                                <img src={lab.logo} alt={lab.logoAlt} />
                            ) : (
                                <p>{lab.shortName}</p>
                            )}
                        </div>
                        <p className="home-laboratories-index__lab">{lab.shortName}</p>
                        <h3>{lab.name}</h3>
                        <span>{lab.summary}</span>
                    </Link>
                ))}
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
                <Link className="home-publication-index__link" to="/publication">
                    View all publications ↗
                </Link>
            </div>
            <div className="home-publication-index__list">
                {latestPublications.map((publication) => (
                    <Link
                        key={publication.id}
                        className="home-publication-index__item"
                        to={`/publication?q=${encodeURIComponent(publication.title)}`}>
                        <p>{publication.research_meta.published_place}</p>
                        <h3>{publication.title}</h3>
                        <span>{publication.research_meta.author}</span>
                    </Link>
                ))}
            </div>
        </section>
        <section
            data-reveal
            data-reveal-load-delay="160"
            className="home-publication-snapshot"
            aria-labelledby="home-publication-snapshot-title">
            <div className="home-publication-snapshot__intro">
                <p className="home-publication-snapshot__label">
                    {publicationSnapshot.year} publications
                </p>
                <h2 id="home-publication-snapshot-title">
                    Current publication snapshot
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

            <div className="home-research-index__grid">
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
        </section>
        </>
    );
}

export default Home;
