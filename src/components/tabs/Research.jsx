import { useMemo } from "react";
import { LABORATORIES } from "../../data/laboratories";
import { shuffleItems } from "../../utils/collections";
import "./Research.css";

function Research() {
    const orderedResearchAreas = useMemo(() => shuffleItems(LABORATORIES), []);

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
                    <h2 id="research-area-details-title">Research by Laboratory</h2>
                </div>

                <div className="aaig-research__grid">
                    {orderedResearchAreas.map((area, index) => (
                        <article
                            key={area.key}
                            data-reveal
                            data-reveal-load-delay={`${110 + index * 55}`}
                            style={{ "--reveal-delay": `${index * 55}ms` }}
                            className="aaig-research__card">
                            <figure className="aaig-research__media">
                                <img
                                    src={area.researchImage}
                                    alt={`${area.researchTitle} research concept`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </figure>
                            <div className="aaig-research__copy">
                                <p className="aaig-research__lab">{area.shortName}</p>
                                <h3>{area.researchTitle}</h3>
                                <p>{area.researchDescription}</p>
                                <dl className="aaig-research__details">
                                    {area.researchDetails.map((detail) => (
                                        <div key={detail.title}>
                                            <dt>{detail.title}</dt>
                                            <dd>{detail.items.join(" / ")}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <a href={area.href} target="_blank" rel="noreferrer">
                                    Visit {area.shortName} ↗
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
