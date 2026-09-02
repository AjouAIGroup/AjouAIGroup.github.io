import "./AAIG.css";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import AAIG_HERO from "../../assets/brand/aaig-hero-campus-v2.webp";
import { SITE } from "../../config/site";
import { LABORATORIES } from "../../data/laboratories";
import { shuffleItems } from "../../utils/collections";

function AaigHero({ isHome }) {
    const laboratories = useMemo(() => shuffleItems(LABORATORIES), []);

    if (isHome) {
        return (
            <section className="aaig-hero" aria-labelledby="aaig-hero-title">
                <img
                    className="aaig-hero__background"
                    src={AAIG_HERO}
                    alt=""
                    decoding="async"
                />
                <div className="aaig-hero__veil" aria-hidden="true" />
                <div className="aaig-hero__identity">
                    <h1 id="aaig-hero-title" className="aaig-hero__title">
                        Ajou Artificial Intelligence Group
                    </h1>
                    <div className="aaig-hero__wordmark" aria-hidden="true">
                        <div>Ajou</div>
                        <div>Artificial</div>
                        <div className="aaig-hero__wordmark-intelligence">Intelligence</div>
                        <div>Group</div>
                    </div>
                    <p>Ajou University</p>
                </div>
                <section className="aaig-hero__laboratories" aria-label="Laboratories">
                    {laboratories.map((lab, index) => (
                        <Link
                            key={lab.key}
                            className={`aaig-hero__laboratory aaig-hero__laboratory--${lab.key}`}
                            style={{ "--laboratory-enter-delay": `${280 + index * 90}ms` }}
                            to="/lab">
                            <div className="aaig-hero__laboratory-identity">
                                {lab.logo ? (
                                    <img
                                        className={`aaig-hero__laboratory-logo aaig-hero__laboratory-logo--${lab.key}`}
                                        src={lab.logo}
                                        alt={lab.logoAlt}
                                    />
                                ) : (
                                    <span>{lab.shortName}</span>
                                )}
                            </div>
                            <div className="aaig-hero__laboratory-copy">
                                <p className="aaig-hero__laboratory-label">{lab.shortName}</p>
                                <h2>{lab.heroTitle ?? lab.name}</h2>
                                <p className="aaig-hero__laboratory-summary">{lab.heroSummary ?? lab.summary}</p>
                            </div>
                            <ul className="aaig-hero__laboratory-topics" aria-label={`${lab.shortName} research topics`}>
                                {lab.topics.slice(0, 2).map((topic) => (
                                    <li key={topic}>{topic}</li>
                                ))}
                            </ul>
                        </Link>
                    ))}
                </section>
            </section>
        );
    }

    return <h1 className="aaig-page-title">{SITE.name}</h1>;
}

export default AaigHero;
