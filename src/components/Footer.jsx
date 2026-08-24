import "./Footer.css";
import { SITE } from "../config/site";

function Footer() {
    return (
        <footer className="footer" aria-label="AAIG site footer">
            <div className="footer__inner">
                <p className="footer__name">{SITE.title}</p>
                <p className="footer__copyright">
                    © {new Date().getFullYear()} {SITE.name}
                </p>
            </div>
        </footer>
    );
}

export default Footer;
