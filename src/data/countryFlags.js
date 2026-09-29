import au from "../assets/flags/au.svg";
import ca from "../assets/flags/ca.svg";
import cn from "../assets/flags/cn.svg";
import fr from "../assets/flags/fr.svg";
import gb from "../assets/flags/gb.svg";
import gr from "../assets/flags/gr.svg";
import hk from "../assets/flags/hk.svg";
import hu from "../assets/flags/hu.svg";
import it from "../assets/flags/it.svg";
import jp from "../assets/flags/jp.svg";
import kr from "../assets/flags/kr.svg";
import ma from "../assets/flags/ma.svg";
import mo from "../assets/flags/mo.svg";
import nl from "../assets/flags/nl.svg";
import nz from "../assets/flags/nz.svg";
import se from "../assets/flags/se.svg";
import us from "../assets/flags/us.svg";
import vn from "../assets/flags/vn.svg";

// Flags are images rather than emoji because Windows has no flag emoji and
// shows the two-letter region code instead. SVGs come from flag-icons (MIT,
// see src/assets/flags/LICENSE). Names are matched in this order, so a
// territory such as Macau is found before the China it is listed with.
// Add a country here when a venue in content/deadlines/venues.json needs it.
const COUNTRY_FLAGS = [
    { name: "Hong Kong", src: hk },
    { name: "Macau", src: mo },
    { name: "South Korea", src: kr },
    { name: "United Kingdom", src: gb },
    { name: "Netherlands", src: nl },
    { name: "Australia", src: au },
    { name: "New Zealand", src: nz },
    { name: "Canada", src: ca },
    { name: "Sweden", src: se },
    { name: "France", src: fr },
    { name: "Greece", src: gr },
    { name: "Hungary", src: hu },
    { name: "Morocco", src: ma },
    { name: "Italy", src: it },
    { name: "Japan", src: jp },
    { name: "China", src: cn },
    { name: "Vietnam", src: vn },
    { name: "USA", src: us },
];

// One flag per country in a "City, Country; City, Country" location.
export const getLocationFlags = (location = "") =>
    String(location)
        .split(";")
        .map((place) =>
            COUNTRY_FLAGS.find((country) => place.includes(country.name)),
        )
        .filter(Boolean)
        .filter((flag, index, flags) => flags.indexOf(flag) === index);
