import VisionImage from "../../assets/images/research_concepts/optimized/multi-modal-wide.webp";
import SpeechImage from "../../assets/images/research_concepts/optimized/application-wide.webp";
import RoboticsImage from "../../assets/images/home/optimized/resource-robotics-platform.webp";
import KnowledgeImage from "../../assets/images/research_concepts/optimized/core-wide.webp";
import "./Research.css";

const RESEARCH_AREAS = [
    {
        lab: "CVL Lab",
        title: "Computer Vision & Learning",
        description:
            "We develop robust visual recognition and representation-learning methods that remain reliable across changing environments and real-world data.",
        themes: ["Visual Recognition", "Representation Learning", "Robust AI"],
        image: VisionImage,
        href: "https://cvl-lab.github.io/",
    },
    {
        lab: "SAIL",
        title: "Speech AI & Generative Models",
        description:
            "We study speech synthesis, speech language models, and generative approaches for audio, talking-head, and video generation.",
        themes: ["Speech Synthesis", "Speech Language Models", "Generative Models"],
        image: SpeechImage,
        href: "https://sites.google.com/view/speechailab",
    },
    {
        lab: "HEI Lab",
        title: "Embodied Intelligence",
        description:
            "We build adaptive robots through foundation models, human–robot interaction, and lifelong learning in changing physical environments.",
        themes: ["Robot Learning", "Human–Robot Interaction", "Lifelong Learning"],
        image: RoboticsImage,
        href: "https://heilaboratory.github.io/",
    },
    {
        lab: "iKnow Lab",
        title: "Knowledge-Centered AI",
        description:
            "We explore recommendation systems, multimodal understanding, large language models, and federated learning for intelligent knowledge systems.",
        themes: ["Recommendation", "Multimodal AI", "Large Language Models"],
        image: KnowledgeImage,
        href: "https://iknow.ajou.ac.kr/",
    },
];

function Research() {
    return (
        <div data-reveal data-reveal-load-delay="60" className="research-wrapper aaig-research">
            <header data-reveal className="tab-header page-head page-head--research">
                <h1>Research</h1>
                <p className="page-head__summary">
                    AAIG connects four labs working across vision, speech,
                    embodied intelligence, and knowledge-based AI.
                </p>
            </header>

            <section className="aaig-research__areas" aria-labelledby="research-area-details-title">
                <div className="aaig-research__head">
                    <p>AAIG RESEARCH AREAS</p>
                    <h2 id="research-area-details-title">Four Perspectives on Artificial Intelligence</h2>
                </div>

                <div className="aaig-research__grid">
                    {RESEARCH_AREAS.map((area, index) => (
                        <article
                            key={area.lab}
                            data-reveal
                            data-reveal-load-delay={`${110 + index * 55}`}
                            style={{ "--reveal-delay": `${index * 55}ms` }}
                            className="aaig-research__card">
                            <figure className="aaig-research__media">
                                <img src={area.image} alt="" loading="lazy" decoding="async" />
                            </figure>
                            <div className="aaig-research__copy">
                                <p className="aaig-research__lab">{area.lab}</p>
                                <h3>{area.title}</h3>
                                <p>{area.description}</p>
                                <ul aria-label={`${area.title} themes`}>
                                    {area.themes.map((theme) => (
                                        <li key={theme}>{theme}</li>
                                    ))}
                                </ul>
                                <a href={area.href} target="_blank" rel="noreferrer">
                                    Visit {area.lab} ↗
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Research;
