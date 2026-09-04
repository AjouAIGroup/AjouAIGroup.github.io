import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavButton from "./Nav.Button";
import { resolveTabFromPath } from "../routes/routeUtils";
import { scrollWindowTo } from "../utils/scrollMotion";
import { NAV_ITEMS } from "../config/site";
import { isPrimaryPlainClick } from "../utils/pointerEvents";
import AJOU_AI_GROUP_LOGO from "../assets/brand/ajou-ai-group-logo.png";
import "./Nav.css";

const MOBILE_NAV_QUERY = "(max-width: 57rem)";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileNav, setIsMobileNav] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation();
    const selectedTab = resolveTabFromPath(location.pathname);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const marker = document.querySelector("[data-nav-scroll-sentinel]");
        if (!marker || typeof IntersectionObserver === "undefined") {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setHasScrolled(!entry.isIntersecting),
            { threshold: 0 },
        );

        observer.observe(marker);
        return () => observer.disconnect();
    }, [location.pathname]);

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            typeof window.matchMedia !== "function"
        ) {
            return undefined;
        }

        const mediaQueryList = window.matchMedia(MOBILE_NAV_QUERY);
        const syncMobileState = (eventOrList) => {
            const matches =
                "matches" in eventOrList
                    ? eventOrList.matches
                    : mediaQueryList.matches;
            setIsMobileNav(matches);
            if (!matches) {
                setIsMenuOpen(false);
            }
        };

        syncMobileState(mediaQueryList);
        if (typeof mediaQueryList.addEventListener === "function") {
            mediaQueryList.addEventListener("change", syncMobileState);
        } else {
            mediaQueryList.addListener(syncMobileState);
        }

        return () => {
            if (typeof mediaQueryList.removeEventListener === "function") {
                mediaQueryList.removeEventListener("change", syncMobileState);
            } else {
                mediaQueryList.removeListener(syncMobileState);
            }
        };
    }, []);

    useEffect(() => {
        if (!isMobileNav || !isMenuOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen, isMobileNav]);

    const toggleMenu = () => {
        if (!isMobileNav) {
            return;
        }
        setIsMenuOpen((prev) => !prev);
    };

    const handleSelectTab = (event) => {
        if (event?.currentTarget instanceof HTMLElement) {
            event.currentTarget.blur();
        }

        setIsMenuOpen(false);
    };

    const handleLogoClick = (event) => {
        handleSelectTab(event);
        if (selectedTab !== "home" || !isPrimaryPlainClick(event)) {
            return;
        }

        event.preventDefault();
        scrollWindowTo({ top: 0 });
    };

    return (
        <>
            <div
                className="nav__scroll-sentinel"
                data-nav-scroll-sentinel
                aria-hidden="true"
            />
            {isMobileNav ? (
                <div
                    className={`nav__overlay ${isMenuOpen ? "is-visible" : ""}`}
                    onClick={toggleMenu}></div>
            ) : null}
            <div
                className={`nav animated-surface is-nav-visible ${isMenuOpen ? "is-menu-open" : ""} ${hasScrolled ? "is-scrolled" : ""}`}>
                <div className="nav__header">
                    <Link
                        to="/"
                        state={{ scroll: { mode: "window-top" } }}
                        className="nav__logo"
                        onClick={handleLogoClick}
                        aria-label="Go to Home">
                        <img
                            className="nav__brand-mark"
                            src={AJOU_AI_GROUP_LOGO}
                            alt="Ajou AI Group"
                            width={1600}
                            height={516}
                        />
                    </Link>
                    {isMobileNav ? (
                        <div className="nav__header-actions">
                            <button
                                type="button"
                                className="nav__toggle btn btn--icon btn--sm interactive-button"
                                onClick={toggleMenu}
                                aria-expanded={isMenuOpen}
                                aria-controls="nav-links"
                                aria-label={
                                    isMenuOpen
                                        ? "Close navigation menu"
                                        : "Open navigation menu"
                                }>
                                <span
                                    className="nav__toggle-icon"
                                    aria-hidden="true">
                                    {isMenuOpen ? "✕" : "☰"}
                                </span>
                            </button>
                        </div>
                    ) : null}
                </div>
                <div
                    id="nav-links"
                    className={`nav__links animated-surface ${isMobileNav && !isMenuOpen ? "is-hidden" : ""}`}>
                    {NAV_ITEMS.map((tabItem, i) => (
                        <div key={tabItem.key + i} className="nav__item">
                            <NavButton
                                tabKey={tabItem.key}
                                isSelected={selectedTab === tabItem.key}
                                onSelect={handleSelectTab}>
                                {tabItem.label}
                            </NavButton>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
