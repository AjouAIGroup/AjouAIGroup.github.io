import { CONTACT_LABS } from "../../data/contactDirectory";
import { Link } from "react-router-dom";
import "./Contact.css";

function ContactIdentity({ lab }) {
    return (
        <div className="contact-page__identity">
            {lab.logo ? (
                <img src={lab.logo} alt={lab.logoAlt} />
            ) : (
                <p>{lab.shortName}</p>
            )}
        </div>
    );
}

function Contact() {
    return (
        <div data-reveal data-reveal-load-delay="60" className="contact-page">
            <header data-reveal className="tab-header page-head contact-page__head">
                <h1>Apply</h1>
                <p className="page-head__summary">
                    Find the lab that matches your interests, prepare a concise
                    application note, and contact the appropriate research group.
                </p>
            </header>

            <section
                className="contact-page__introduction"
                aria-labelledby="apply-introduction-title">
                <div>
                    <h2 id="apply-introduction-title">We welcome motivated students.</h2>
                </div>
                <div className="contact-page__introduction-copy">
                    <p>
                        AAIG laboratories welcome students whose curiosity and
                        preparation connect with a specific research direction.
                        Each lab reviews opportunities independently.
                    </p>
                    <Link to="/lab">Explore the laboratories ↗</Link>
                </div>
            </section>

            <section className="contact-page__directory" aria-labelledby="apply-labs-title">
                <div className="contact-page__section-head">
                    <h2 id="apply-labs-title">Open laboratories</h2>
                    <p>
                        Contact each laboratory directly to confirm current openings,
                        application timing, and required materials.
                    </p>
                </div>
                {CONTACT_LABS.map((lab) => (
                    <article key={lab.key} className="contact-page__lab">
                        <div className="contact-page__lab-primary">
                            <div className="contact-page__lab-heading">
                                <ContactIdentity lab={lab} />
                                <h2>{lab.name}</h2>
                            </div>
                            <div className="contact-page__fit">
                                <h3>Research fit</h3>
                                <p>{lab.researchTitle}</p>
                                <ul aria-label={`${lab.shortName} research topics`}>
                                    {lab.topics.map((topic) => (
                                        <li key={topic}>{topic}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="contact-page__guidance">
                                <h3>What to send</h3>
                                <p>{lab.guidance}</p>
                                {lab.note ? <p className="contact-page__note">{lab.note}</p> : null}
                            </div>
                        </div>
                        <div className="contact-page__lab-secondary">
                            <div className="contact-page__prospective">
                                <h3>Prospective student</h3>
                                <p>{lab.studentProfile}</p>
                            </div>
                            <div className="contact-page__contact">
                                <h3>Contact</h3>
                                <p className="contact-page__contact-name">{lab.contactName}</p>
                                <p>{lab.contactRole}</p>
                                <a href={`mailto:${lab.contactEmail}`}>{lab.contactEmail}</a>
                                <a
                                    className="contact-page__website"
                                    href={lab.href}
                                    target="_blank"
                                    rel="noreferrer">
                                    Visit lab website ↗
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Contact;
