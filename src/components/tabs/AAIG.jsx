import "./AAIG.css";
import AAIG_FULL_LOGO from "../../assets/brand/aaig-full-logo.png";
import AAIG_HERO from "../../assets/brand/aaig-hero-campus-v2.webp";
import { SITE } from "../../config/site";

function AAIG({ isHome }) {
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
                    <div className="aaig-hero__full-logo" aria-hidden="true">
                        <img src={AAIG_FULL_LOGO} alt="" />
                    </div>
                    <p>Ajou University</p>
                </div>
            </section>
        );
    }

    return <h1 className="aaig-page-title">{SITE.name}</h1>;
}

export default AAIG;
