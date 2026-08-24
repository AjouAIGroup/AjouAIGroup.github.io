import { CONTACT_LABS } from "../../data/contactDirectory";
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
                <h1>Contact</h1>
                <p className="page-head__summary">
                    Contact a laboratory directly to discuss research fit,
                    available opportunities, and application requirements.
                </p>
            </header>

            <section className="contact-page__directory" aria-label="AAIG laboratory contacts">
                {CONTACT_LABS.map((lab) => (
                    <article key={lab.key} className="contact-page__lab">
                        <div className="contact-page__lab-heading">
                            <ContactIdentity lab={lab} />
                            <h2>{lab.name}</h2>
                        </div>
                        <div className="contact-page__guidance">
                            <h3>Application inquiry</h3>
                            <p>{lab.guidance}</p>
                            {lab.note ? <p className="contact-page__note">{lab.note}</p> : null}
                        </div>
                        <div className="contact-page__contact">
                            <h3>Contact point</h3>
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
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Contact;
