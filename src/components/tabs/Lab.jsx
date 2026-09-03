import { useMemo } from "react";
import CvlPortrait from "../../assets/images/laboratories/cvl-jongbin-ryu.webp";
import HeiPortrait from "../../assets/images/laboratories/hei-gicheon-kang.jpg";
import IknowPortrait from "../../assets/images/laboratories/iknow-hyunsouk-cho.jpg";
import LamdaPortrait from "../../assets/images/laboratories/lamda-kyung-ah-sohn.webp";
import SailPortrait from "../../assets/images/laboratories/sail-sanghoon-lee.jpg";
import { LABORATORIES } from "../../data/laboratories";
import { STUDENT_REPRESENTATIVES } from "../../data/contactDirectory";
import { shuffleItems } from "../../utils/collections";
import "./Lab.css";

const FACULTY = [
    {
        name: "Jongbin Ryu",
        koreanName: "유종빈",
        lab: "MMAI Lab",
        role: "Associate Professor",
        department: "Department of Software and Computer Engineering, Ajou University",
        email: "jongbinryu@ajou.ac.kr",
        interests: "Deep Learning · Computer Vision · Machine Learning",
        href: "https://mmai-laboratory.github.io/",
        portrait: CvlPortrait,
    },
    {
        name: "Sanghoon Lee",
        koreanName: "이상훈",
        lab: "SAIL",
        role: "Assistant Professor",
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
        role: "Assistant Professor",
        department: "Department of Software, Ajou University",
        email: "gckang@ajou.ac.kr",
        interests: "Physical AI, Robot Learning, Human-Robot Interaction",
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
    {
        name: "Kyung-Ah Sohn",
        koreanName: "손경아",
        lab: "LAMDA Lab",
        role: "Professor",
        department:
            "Departments of Software and Computer Engineering & Artificial Intelligence, Ajou University",
        email: "kasohn@ajou.ac.kr",
        interests: "Machine Learning · Data Mining · Biomedical Informatics",
        href: "https://sites.google.com/site/kasohn/group",
        portrait: LamdaPortrait,
    },
];

function ExternalLink({ href, children, className }) {
    return (
        <a className={className} href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
}

function Lab() {
    // A fresh page load creates a new lab order; faculty follows that same order.
    const orderedLabs = useMemo(() => shuffleItems(LABORATORIES), []);
    const orderedRepresentatives = useMemo(() => {
        const labOrder = new Map(
            orderedLabs.map((lab, index) => [lab.shortName, index]),
        );

        return [...STUDENT_REPRESENTATIVES].sort(
            (first, second) => labOrder.get(first.lab) - labOrder.get(second.lab),
        );
    }, [orderedLabs]);
    const facultyByLab = useMemo(
        () => new Map(FACULTY.map((member) => [member.lab, member])),
        [],
    );

    return (
        <div data-reveal data-reveal-load-delay="60" className="lab-page">
            <header data-reveal className="tab-header page-head page-head--lab">
                <h1>Laboratories</h1>
                <p className="page-head__summary">
                    AAIG brings together five research labs working across
                    vision, speech, embodied intelligence, and knowledge-based
                    AI.
                </p>
            </header>

            <section className="lab-page__directory" aria-label="Laboratory directory">
                <div className="lab-page__grid">
                    {orderedLabs.map((lab) => {
                        const faculty = facultyByLab.get(lab.shortName);

                        return (
                            <article
                                key={lab.key}
                                className={`lab-page__item lab-page__item--${lab.key}`}>
                            <div className="lab-page__item-head">
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
                                {faculty ? (
                                    <a
                                        className="lab-page__faculty-identity"
                                        href={`mailto:${faculty.email}`}
                                        aria-label={`Email ${faculty.name}`}>
                                        <img
                                            src={faculty.portrait}
                                            alt={`${faculty.name} portrait`}
                                        />
                                        <span>
                                            <strong>{faculty.name}</strong>
                                            <small>{faculty.koreanName}</small>
                                        </span>
                                    </a>
                                ) : null}
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
                        );
                    })}
                </div>
            </section>

            <section className="lab-page__representatives" aria-labelledby="representatives-title">
                <div className="lab-page__directory-head">
                    <h2 id="representatives-title">Student Representatives</h2>
                </div>
                <div className="lab-page__representative-grid">
                    {orderedRepresentatives.map((member) => (
                        <article key={member.lab} className="lab-page__representative">
                            <p className="lab-page__number">{member.lab}</p>
                            <h3>
                                {member.name}
                                <span>{member.koreanName}</span>
                            </h3>
                            <p className="lab-page__faculty-role">{member.role}</p>
                            {member.email ? (
                                <a className="lab-page__email" href={`mailto:${member.email}`}>
                                    {member.email}
                                </a>
                            ) : null}
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Lab;
