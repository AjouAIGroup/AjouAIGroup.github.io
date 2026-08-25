import { useEffect, useMemo, useState } from "react";
import {
    DEADLINE_AREAS,
    DEADLINE_DISPLAY_TIMEZONE,
    formatDeadlineInDisplayTimezone,
    getAllVenues,
    getCountdownLabel,
    getDefaultMilestoneId,
    getVenueStatusMeta,
} from "../../utils/deadlineData";
import "./Calendar.css";

const ALL_AREAS = "all";

const LOCATION_FLAGS = [
    ["Hong Kong", "🇭🇰"],
    ["Macau", "🇲🇴"],
    ["South Korea", "🇰🇷"],
    ["United Kingdom", "🇬🇧"],
    ["Netherlands", "🇳🇱"],
    ["Australia", "🇦🇺"],
    ["Canada", "🇨🇦"],
    ["Sweden", "🇸🇪"],
    ["France", "🇫🇷"],
    ["Greece", "🇬🇷"],
    ["Hungary", "🇭🇺"],
    ["Morocco", "🇲🇦"],
    ["Italy", "🇮🇹"],
    ["Japan", "🇯🇵"],
    ["China", "🇨🇳"],
    ["USA", "🇺🇸"],
];

const getLocationFlags = (location = "") =>
    location
        .split(";")
        .map((place) =>
            LOCATION_FLAGS.find(([country]) => place.includes(country))?.[1],
        )
        .filter(Boolean)
        .filter((flag, index, flags) => flags.indexOf(flag) === index);

function CalendarVenue({ venue, selectedMilestones, onSelectMilestone, now }) {
    const milestoneId =
        selectedMilestones[venue.id] ?? getDefaultMilestoneId(venue, now ?? new Date());
    const milestone = venue.milestones.find((item) => item.id === milestoneId);
    const status = getVenueStatusMeta(venue.status);
    const locationFlags = getLocationFlags(venue.event?.location);

    return (
        <article data-reveal className="calendar__venue">
            <div className="calendar__venue-heading">
                <div>
                    <div className="calendar__venue-meta">
                        <span>{venue.areas.map((area) => DEADLINE_AREAS.find((item) => item.key === area)?.label ?? area).join(" · ")}</span>
                        <span>{status.label}</span>
                    </div>
                    <h2>{venue.name}</h2>
                    <p>{venue.full_name}</p>
                </div>
                <a href={venue.cfp_url} target="_blank" rel="noreferrer" className="calendar__link animated-underline">
                    Official CFP <span aria-hidden="true">↗</span>
                </a>
            </div>

            {venue.event ? (
                <dl className="calendar__event">
                    <div>
                        <dt>Event</dt>
                        <dd>{venue.event.dates}</dd>
                    </div>
                    <div>
                        <dt>Location</dt>
                        <dd>
                            {locationFlags.length ? (
                                <span className="calendar__location-flags" aria-hidden="true">
                                    {locationFlags.join(" ")}
                                </span>
                            ) : null}
                            {venue.event.location}
                        </dd>
                    </div>
                    <div>
                        <dt>Venue</dt>
                        <dd>{venue.event.venue}</dd>
                    </div>
                </dl>
            ) : null}

            {milestone ? (
                <div className="calendar__deadline">
                    <div className="calendar__milestones" role="group" aria-label={`${venue.name} submission stages`}>
                        {venue.milestones.map((item) => {
                            const isSelected = item.id === milestone.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={isSelected ? "is-active" : ""}
                                    aria-pressed={isSelected}
                                    onClick={() => onSelectMilestone(venue.id, item.id)}>
                                    {item.short_label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="calendar__deadline-detail" aria-live="polite">
                        <div>
                            <p>{milestone.label}</p>
                            <time dateTime={milestone.deadline_at}>
                                {formatDeadlineInDisplayTimezone(milestone.deadline_at)} KST
                            </time>
                            <small>Official deadline timezone: {milestone.timezone_label}</small>
                        </div>
                        <strong>{getCountdownLabel(milestone.deadline_at, now)}</strong>
                    </div>
                </div>
            ) : (
                <p className="calendar__unannounced">The current CFP has not published track-specific deadlines.</p>
            )}
        </article>
    );
}

function Calendar() {
    const [selectedArea, setSelectedArea] = useState(ALL_AREAS);
    const [query, setQuery] = useState("");
    const [selectedMilestones, setSelectedMilestones] = useState({});
    const [now, setNow] = useState(null);
    const venues = useMemo(() => getAllVenues(), []);

    useEffect(() => {
        const updateNow = () => setNow(new Date());
        updateNow();
        const timer = window.setInterval(updateNow, 60_000);
        return () => window.clearInterval(timer);
    }, []);

    const filteredVenues = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return venues.filter((venue) => {
            const matchingArea = selectedArea === ALL_AREAS || venue.areas.includes(selectedArea);
            const searchable = `${venue.name} ${venue.full_name}`.toLowerCase();
            return matchingArea && (!normalizedQuery || searchable.includes(normalizedQuery));
        });
    }, [query, selectedArea, venues]);

    return (
        <div data-reveal data-reveal-load-delay="60" className="calendar">
            <header data-reveal className="tab-header page-head page-head--calendar">
                <h1>Conference Calendar</h1>
                <p className="page-head__summary">
                    Official submission schedules across the AAIG research community. All displayed times are Korea Standard Time.
                </p>
            </header>

            <section data-reveal className="calendar__controls" aria-label="Conference calendar controls">
                <div className="calendar__filters" role="group" aria-label="Filter conferences by research area">
                    <button type="button" className={selectedArea === ALL_AREAS ? "is-active" : ""} onClick={() => setSelectedArea(ALL_AREAS)}>All venues</button>
                    {DEADLINE_AREAS.map((area) => (
                        <button key={area.key} type="button" className={selectedArea === area.key ? "is-active" : ""} onClick={() => setSelectedArea(area.key)}>{area.label}</button>
                    ))}
                </div>
                <label className="calendar__search">
                    <span>Search conferences</span>
                    <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="CVPR, NeurIPS, ACL" />
                </label>
            </section>

            <section className="calendar__list" aria-labelledby="calendar-list-title">
                <div className="calendar__list-heading">
                    <h2 id="calendar-list-title">Conference schedule</h2>
                    <p>{filteredVenues.length} venues · Times displayed in {DEADLINE_DISPLAY_TIMEZONE}</p>
                </div>
                {filteredVenues.map((venue) => (
                    <CalendarVenue
                        key={venue.id}
                        venue={venue}
                        selectedMilestones={selectedMilestones}
                        now={now}
                        onSelectMilestone={(venueId, milestoneId) => setSelectedMilestones((current) => ({ ...current, [venueId]: milestoneId }))}
                    />
                ))}
                {!filteredVenues.length ? <p className="calendar__empty">No conferences match this view.</p> : null}
            </section>
        </div>
    );
}

export default Calendar;
