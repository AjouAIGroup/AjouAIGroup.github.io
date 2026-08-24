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
import VisionLearningImage from "../../assets/images/research_areas/aaig-vision-learning.webp";
import SpeechGenerativeImage from "../../assets/images/research_areas/aaig-speech-generative.webp";
import EmbodiedIntelligenceImage from "../../assets/images/research_areas/aaig-embodied-intelligence.webp";
import KnowledgeAiImage from "../../assets/images/research_areas/aaig-knowledge-ai.webp";
import "./Home.css";

const NEWS_IMAGES = [
    CampusImage,
    ResearchImage,
    SeminarImage,
    GpuImage,
    WorkshopImage,
];

const RESEARCH_AREAS = [
    {
        lab: "CVL Lab",
        title: "Computer Vision & Learning",
        summary:
            "Robust visual recognition and representation learning for reliable perception in real-world settings.",
        image: VisionLearningImage,
    },
    {
        lab: "SAIL",
        title: "Speech AI & Generative Models",
        summary:
            "Speech synthesis, speech language models, and generative approaches for audio and visual media.",
        image: SpeechGenerativeImage,
    },
    {
        lab: "HEI Lab",
        title: "Embodied Intelligence",
        summary:
            "Foundation models and lifelong learning for robots that adapt and collaborate with people.",
        image: EmbodiedIntelligenceImage,
    },
    {
        lab: "iKnow Lab",
        title: "Knowledge-Centered AI",
        summary:
            "Recommendation, multimodal understanding, large language models, and federated learning.",
        image: KnowledgeAiImage,
    },
];

function Home() {
    const railRef = useRef(null);
    const newsItems = useMemo(() => getLatestNewsItems(5), []);

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
                <Link className="home-research-index__all" to="/lab">
                    Explore laboratories ↗
                </Link>
            </div>

            <div className="home-research-index__grid">
                {RESEARCH_AREAS.map((area) => (
                    <Link
                        key={area.lab}
                        className="home-research-index__card"
                        to="/lab">
                        <figure className="home-research-index__media">
                            <img src={area.image} alt="" loading="lazy" decoding="async" />
                        </figure>
                        <div className="home-research-index__copy">
                            <p>{area.lab}</p>
                            <h3>{area.title}</h3>
                            <span>{area.summary}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
        </>
    );
}

export default Home;
