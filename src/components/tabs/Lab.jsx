import { useMemo } from "react";
import CvlLogo from "../../assets/images/laboratories/cvl-logo.svg";
import CvlPortrait from "../../assets/images/laboratories/cvl-jongbin-ryu.webp";
import HeiLogo from "../../assets/images/laboratories/hei-logo.png";
import HeiPortrait from "../../assets/images/laboratories/hei-gicheon-kang.jpg";
import IknowLogo from "../../assets/images/laboratories/iknow-logo.png";
import IknowPortrait from "../../assets/images/laboratories/iknow-hyunsouk-cho.jpg";
import SailPortrait from "../../assets/images/laboratories/sail-sanghoon-lee.jpg";
import "./Lab.css";

const LABS = [
    {
        key: "cvl",
        shortName: "CVL Lab",
        name: "Computer Vision & Learning Lab",
        summary:
            "Research in computer vision, deep learning, and machine learning, spanning visual recognition and robust learning methods.",
        topics: ["Computer Vision", "Deep Learning", "Machine Learning"],
        href: "https://cvl-lab.github.io/",
        logo: CvlLogo,
        logoAlt: "CVL Lab logo",
    },
    {
        key: "sail",
        shortName: "SAIL",
        name: "Speech Artificial Intelligence Lab",
        summary:
            "Research on speech synthesis, speech language models, and generative models for audio, talking-head, and video generation.",
        topics: ["Speech Synthesis", "Speech Language Models", "Generative Models"],
        href: "https://sites.google.com/view/speechailab",
    },
    {
        key: "hei",
        shortName: "HEI Lab",
        name: "Human-Centered Embodied Intelligence Lab",
        summary:
            "Building robots that learn, adapt, and interact with people through foundation models for robotics, human–robot interaction, and lifelong learning.",
        topics: ["Robot Learning", "Human–Robot Interaction", "Lifelong Learning"],
        href: "https://heilaboratory.github.io/",
        logo: HeiLogo,
        logoAlt: "HEI Lab logo",
    },
    {
        key: "iknow",
        shortName: "iKnow Lab",
        name: "intelligence and Knowledge Lab",
        summary:
            "Research on recommendation systems, multimodal understanding, large language models, and federated learning.",
        topics: ["Recommendation", "Multimodal AI", "Large Language Models"],
        href: "https://iknow.ajou.ac.kr/",
        logo: IknowLogo,
        logoAlt: "iKnow Lab logo",
    },
];

const FACULTY = [
    {
        name: "Jongbin Ryu",
        koreanName: "유종빈",
        lab: "CVL Lab",
        role: "Associate Professor",
        department: "Department of Software and Computer Engineering, Ajou University",
        email: "jongbinryu@ajou.ac.kr",
        interests: "Deep Learning · Computer Vision · Machine Learning",
        href: "https://cvl-lab.github.io/",
        portrait: CvlPortrait,
    },
    {
        name: "Sanghoon Lee",
        koreanName: "이상훈",
        lab: "SAIL",
        role: "Faculty",
        department: "Department of Software, Ajou University",
        email: "sanghoonlee@ajou.ac.kr",
        interests: "Artificial Intelligence · Speech Synthesis",
        href: "https://sites.google.com/view/speechailab",
        portrait: SailPortrait,
    },
    {
        name: "Gicheon Kang",
        koreanName: "강기천",
        lab: "HEI Lab",
        role: "Faculty",
        department: "Department of Software, Ajou University",
        email: "gckang@ajou.ac.kr",
        interests: "Physical AI · Robot Learning · Human–Robot Interaction",
        href: "https://heilaboratory.github.io/",
        portrait: HeiPortrait,
    },
    {
        name: "Hyunsouk Cho",
        koreanName: "조현석",
        lab: "iKnow Lab",
        role: "Associate Professor",
        department:
            "Departments of Software and Computer Engineering & Artificial Intelligence, Ajou University",
        email: "hyunsouk@ajou.ac.kr",
        interests:
            "Recommendation Systems · Multimodal Understanding · Large Language Models",
        href: "https://iknow.ajou.ac.kr/",
        portrait: IknowPortrait,
    },
];

function shuffle(items) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const nextIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[nextIndex]] = [
            shuffled[nextIndex],
            shuffled[index],
        ];
    }

    return shuffled;
}

function ExternalLink({ href, children, className }) {
    return (
        <a className={className} href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
}

function Lab() {
    // A fresh page load creates a new lab order; faculty follows that same order.
    const orderedLabs = useMemo(() => shuffle(LABS), []);
    const orderedFaculty = useMemo(() => {
        const labOrder = new Map(
            orderedLabs.map((lab, index) => [lab.shortName, index]),
        );

        return [...FACULTY].sort(
            (first, second) => labOrder.get(first.lab) - labOrder.get(second.lab),
        );
    }, [orderedLabs]);

    return (
        <div data-reveal data-reveal-load-delay="60" className="lab-page">
            <header data-reveal className="tab-header page-head page-head--lab">
                <h1>Laboratories</h1>
                <p className="page-head__summary">
                    AAIG brings together four research labs working across
                    vision, speech, embodied intelligence, and knowledge-based
                    AI.
                </p>
            </header>

            <section className="lab-page__directory" aria-labelledby="lab-directory-title">
                <div className="lab-page__directory-head">
                    <p className="lab-page__eyebrow">AAIG LAB DIRECTORY</p>
                    <h2 id="lab-directory-title">Four Labs, One Research Community</h2>
                </div>

                <div className="lab-page__grid">
                    {orderedLabs.map((lab) => (
                        <article key={lab.key} className="lab-page__item">
                            <div className="lab-page__identity">
                                {lab.logo ? (
                                    <img
                                        className="lab-page__logo"
                                        src={lab.logo}
                                        alt={lab.logoAlt}
                                    />
                                ) : (
                                    <p className="lab-page__wordmark">{lab.shortName}</p>
                                )}
                            </div>
                            <h3>{lab.name}</h3>
                            <p>{lab.summary}</p>
                            <ul className="lab-page__topics" aria-label={`${lab.name} research topics`}>
                                {lab.topics.map((topic) => (
                                    <li key={topic}>{topic}</li>
                                ))}
                            </ul>
                            <ExternalLink href={lab.href} className="lab-page__link">
                                Visit lab website ↗
                            </ExternalLink>
                        </article>
                    ))}
                </div>
            </section>

            <section className="lab-page__faculty" aria-labelledby="faculty-title">
                <div className="lab-page__directory-head">
                    <p className="lab-page__eyebrow">FACULTY</p>
                    <h2 id="faculty-title">Faculty</h2>
                </div>

                <div className="lab-page__faculty-grid">
                    {orderedFaculty.map((member) => (
                        <article key={member.name} className="lab-page__faculty-card">
                            <figure className="lab-page__portrait">
                                <img src={member.portrait} alt={`${member.name} portrait`} />
                            </figure>
                            <p className="lab-page__number">{member.lab}</p>
                            <h3>
                                {member.name}
                                <span>{member.koreanName}</span>
                            </h3>
                            <p className="lab-page__faculty-role">{member.role}</p>
                            <p>{member.department}</p>
                            <p className="lab-page__faculty-interest">{member.interests}</p>
                            <a className="lab-page__email" href={`mailto:${member.email}`}>
                                {member.email}
                            </a>
                            <ExternalLink href={member.href} className="lab-page__link">
                                Visit lab website ↗
                            </ExternalLink>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Lab;
