import { getLocationFlags } from "../data/countryFlags";
import "./CountryFlags.css";

// Decorative: the location text beside the flags already names each place.
function CountryFlags({ location, className = "" }) {
    const flags = getLocationFlags(location);
    if (!flags.length) return null;

    return (
        <span
            className={`country-flags ${className}`.trim()}
            aria-hidden="true">
            {flags.map((flag) => (
                <img
                    key={flag.name}
                    className="country-flags__flag"
                    src={flag.src}
                    alt=""
                    width="16"
                    height="12"
                    decoding="async"
                />
            ))}
        </span>
    );
}

export default CountryFlags;
