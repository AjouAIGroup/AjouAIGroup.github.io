import "./Footer.css";
import AjouUniversityLogo from "../assets/brand/ajou-university-logo.png";
import { AJOU_LOCATION } from "../config/location";
import { SITE } from "../config/site";

function Footer() {
    return (
        <footer className="footer" aria-label="AAIG site footer">
            <div className="footer__inner">
                <div className="footer__identity">
                    <p className="footer__name">{SITE.title}</p>
                    <p className="footer__copyright">
                        © {new Date().getFullYear()} {SITE.name}
                    </p>
                </div>
                <address className="footer__address">
                    <span>{AJOU_LOCATION.building}</span>
                    {AJOU_LOCATION.englishAddress.slice(1).map((line) => (
                        <span key={line}>{line}</span>
                    ))}
                    <a
                        href={AJOU_LOCATION.mapsUrl}
                        target="_blank"
                        rel="noreferrer">
                        Directions ↗
                    </a>
                </address>
                <img
                    className="footer__university-logo"
                    src={AjouUniversityLogo}
                    alt="Ajou University"
                />
            </div>
        </footer>
    );
}

export default Footer;
