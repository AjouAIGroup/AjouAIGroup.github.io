import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
    formatNewsDate,
    getLatestNewsItems,
    getNewsTypeMeta,
} from "../../utils/newsData";
import CampusImage from "../../assets/images/home/optimized/cvl-lab-home-bg.webp";
import GpuImage from "../../assets/images/home/optimized/resource-gpu-nodes.webp";
import ResearchImage from "../../assets/images/research_concepts/optimized/multi-modal-wide.webp";
import SeminarImage from "../../assets/images/photo/20241127.jpg";
import WorkshopImage from "../../assets/images/photo/20240826_1.jpg";
import { LABORATORIES } from "../../data/laboratories";
import { shuffleItems } from "../../utils/collections";
import "./Home.css";

const NEWS_IMAGES = [
    CampusImage,
    ResearchImage,
    SeminarImage,
    GpuImage,
    WorkshopImage,
];

function Home() {
    const railRef = useRef(null);
    const laboratoriesRailRef = useRef(null);
    const newsItems = useMemo(() => getLatestNewsItems(5), []);
    const orderedResearchAreas = useMemo(() => shuffleItems(LABORATORIES), []);
    const orderedLaboratories = useMemo(() => shuffleItems(LABORATORIES), []);

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
            data-reveal-load-delay="100"
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
        </>
    );
}

export default Home;
