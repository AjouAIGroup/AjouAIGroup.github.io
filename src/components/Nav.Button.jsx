import { Link } from "react-router-dom";
import { scrollWindowTo } from "../utils/scrollMotion";
import { isPrimaryPlainClick } from "../utils/pointerEvents";

export default function NavButton({ children, tabKey, isSelected, onSelect }) {
    const to = tabKey === "home" ? "/" : `/${tabKey}`;

    const handleClick = (event) => {
        onSelect?.(event);
        if (!isSelected || !isPrimaryPlainClick(event)) {
            return;
        }

        event.preventDefault();
        scrollWindowTo({ top: 0 });
    };

    return (
        <Link
            to={to}
            state={{ scroll: { mode: "window-top" } }}
            className={`nav__button nav__button--${tabKey} ${isSelected ? "is-active" : ""}`}
            data-tab={tabKey}
            onClick={handleClick}
            aria-current={isSelected ? "page" : undefined}>
            {children}
        </Link>
    );
}
