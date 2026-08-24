import "./Footer.css";
import { SITE } from "../config/site";

function Footer() {
    return (
        <footer
            className="footer site-shell"
            aria-labelledby="site-footer-title">
            <div className="footer__inner">
                <section className="footer__panel">
                    <div className="footer__identity">
                        <p className="footer__kicker">
                            {SITE.name}
                        </p>
                        <p id="site-footer-title" className="footer__title">
                            Website template under preparation
                        </p>
                    </div>

                    <div className="footer__meta-grid">
                        <section
                            className="footer__group"
                            aria-labelledby="footer-contact-title">
                            <h2
                                id="footer-contact-title"
                                className="footer__group-title">
                                Contact
                            </h2>
                            <p className="footer__text">
                                Contact details will be added soon.
                            </p>
                        </section>

                        <section
                            className="footer__group"
                            aria-labelledby="footer-address-title">
                            <h2
                                id="footer-address-title"
                                className="footer__group-title">
                                Address
                            </h2>
                            <address className="footer__text footer__address">
                                Address details will be added soon.
                            </address>
                        </section>
                    </div>

                    <div className="footer__bottom">
                        <p className="footer__copyright">
                            © {new Date().getFullYear()} {SITE.name}
                        </p>
                    </div>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
