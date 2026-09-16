import { useEffect, useMemo, useState } from "react";
import {
    DEADLINE_DISPLAY_TIMEZONE,
    formatDeadlineInDisplayTimezone,
    formatDeadlineTimeInDisplayTimezone,
    getDeadlineCalendarEvents,
    getDeadlineDayParts,
    toDeadlineDayKey,
} from "../../utils/deadlineData";

const WEEKDAYS = [
    { short: "Sun", long: "Sunday" },
    { short: "Mon", long: "Monday" },
    { short: "Tue", long: "Tuesday" },
    { short: "Wed", long: "Wednesday" },
    { short: "Thu", long: "Thursday" },
    { short: "Fri", long: "Friday" },
    { short: "Sat", long: "Saturday" },
];

const MAX_CHIPS_PER_DAY = 2;

// Grid geometry only needs the weekday of the first of the month and the month
// length. Anchoring those on UTC keeps the layout identical no matter which
// timezone the browser runs in; the deadlines themselves are already resolved
// to Korea Standard Time before they reach this component.
const monthAnchor = (year, month) => new Date(Date.UTC(year, month - 1, 1));

const MONTH_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
});

const DAY_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
});

const toMonthIndex = (year, month) => year * 12 + (month - 1);

const fromMonthIndex = (monthIndex) => ({
    year: Math.floor(monthIndex / 12),
    month: (monthIndex % 12) + 1,
});

const formatMonth = (monthIndex) => {
    const { year, month } = fromMonthIndex(monthIndex);
    return MONTH_LABEL_FORMATTER.format(monthAnchor(year, month));
};

const formatDayKey = (dayKey, formatter) => {
    const [year, month, day] = dayKey.split("-").map(Number);
    return formatter.format(new Date(Date.UTC(year, month - 1, day)));
};

const buildWeeks = (year, month) => {
    const leadingBlanks = monthAnchor(year, month).getUTCDay();
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const cells = [
        ...Array.from({ length: leadingBlanks }, () => null),
        ...Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            return { day, key: toDeadlineDayKey(year, month, day) };
        }),
    ];

    while (cells.length % WEEKDAYS.length !== 0) {
        cells.push(null);
    }

    const weeks = [];
    for (let index = 0; index < cells.length; index += WEEKDAYS.length) {
        weeks.push(cells.slice(index, index + WEEKDAYS.length));
    }

    return weeks;
};

function DeadlineMonthGrid({ venues, now }) {
    const events = useMemo(() => getDeadlineCalendarEvents(venues), [venues]);

    const eventsByDay = useMemo(() => {
        const grouped = new Map();

        [...events]
            .sort(
                (left, right) =>
                    Date.parse(left.deadlineAt) - Date.parse(right.deadlineAt),
            )
            .forEach((event) => {
                const dayEvents = grouped.get(event.dayKey) ?? [];
                dayEvents.push(event);
                grouped.set(event.dayKey, dayEvents);
            });

        return grouped;
    }, [events]);

    const todayParts = useMemo(
        () => getDeadlineDayParts(now.toISOString()),
        [now],
    );
    const todayMonthIndex = toMonthIndex(todayParts.year, todayParts.month);

    const monthBounds = useMemo(() => {
        const monthIndexes = events.map((event) =>
            toMonthIndex(event.year, event.month),
        );

        return {
            min: Math.min(todayMonthIndex, ...monthIndexes),
            max: Math.max(todayMonthIndex, ...monthIndexes),
        };
    }, [events, todayMonthIndex]);

    const [monthIndex, setMonthIndex] = useState(todayMonthIndex);
    const [selectedDayKey, setSelectedDayKey] = useState(null);

    // A narrowed filter can drop the month the reader was looking at out of the
    // available range, so pull the view back inside it instead of showing a
    // month the controls can no longer navigate to.
    const visibleMonthIndex = Math.min(
        Math.max(monthIndex, monthBounds.min),
        monthBounds.max,
    );

    useEffect(() => {
        setSelectedDayKey(null);
    }, [visibleMonthIndex, venues]);

    const { year, month } = fromMonthIndex(visibleMonthIndex);
    const weeks = useMemo(() => buildWeeks(year, month), [year, month]);
    const monthLabel = formatMonth(visibleMonthIndex);

    const monthEventCount = useMemo(
        () =>
            events.filter(
                (event) =>
                    toMonthIndex(event.year, event.month) === visibleMonthIndex,
            ).length,
        [events, visibleMonthIndex],
    );

    const nextMonthWithEvents = useMemo(() => {
        const upcoming = events
            .map((event) => toMonthIndex(event.year, event.month))
            .filter((index) => index > visibleMonthIndex);

        return upcoming.length ? Math.min(...upcoming) : null;
    }, [events, visibleMonthIndex]);

    const selectedEvents = selectedDayKey
        ? (eventsByDay.get(selectedDayKey) ?? [])
        : [];

    const isAtStart = visibleMonthIndex <= monthBounds.min;
    const isAtEnd = visibleMonthIndex >= monthBounds.max;

    return (
        <section
            data-reveal
            className="calendar-month"
            aria-labelledby="calendar-month-title">
            <div className="calendar-month__head">
                <div className="calendar-month__heading">
                    <h2 id="calendar-month-title">Deadline calendar</h2>
                    <p>
                        {monthEventCount} deadline
                        {monthEventCount === 1 ? "" : "s"} in {monthLabel} ·
                        Times shown in {DEADLINE_DISPLAY_TIMEZONE}
                    </p>
                </div>
                <div
                    className="calendar-month__nav"
                    role="group"
                    aria-label="Change calendar month">
                    <button
                        type="button"
                        className="calendar-month__step"
                        onClick={() => setMonthIndex(visibleMonthIndex - 1)}
                        disabled={isAtStart}
                        aria-label={`Show ${formatMonth(visibleMonthIndex - 1)}`}>
                        <span aria-hidden="true">‹</span>
                    </button>
                    <p className="calendar-month__label" aria-live="polite">
                        {monthLabel}
                    </p>
                    <button
                        type="button"
                        className="calendar-month__step"
                        onClick={() => setMonthIndex(visibleMonthIndex + 1)}
                        disabled={isAtEnd}
                        aria-label={`Show ${formatMonth(visibleMonthIndex + 1)}`}>
                        <span aria-hidden="true">›</span>
                    </button>
                    <button
                        type="button"
                        className="calendar-month__today"
                        onClick={() => setMonthIndex(todayMonthIndex)}
                        disabled={visibleMonthIndex === todayMonthIndex}>
                        Today
                    </button>
                </div>
            </div>

            <table className="calendar-month__table">
                <caption className="calendar-month__caption">
                    {monthLabel} conference deadlines. Select a highlighted day
                    to read its full schedule.
                </caption>
                <thead>
                    <tr>
                        {WEEKDAYS.map((weekday) => (
                            <th key={weekday.short} scope="col">
                                <abbr title={weekday.long}>
                                    {weekday.short}
                                </abbr>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, weekIndex) => (
                        <tr
                            key={
                                week.find(Boolean)?.key ?? `week-${weekIndex}`
                            }>
                            {week.map((cell, cellIndex) => {
                                if (!cell) {
                                    return (
                                        <td
                                            key={`blank-${cellIndex}`}
                                            className="calendar-month__cell calendar-month__cell--blank"
                                        />
                                    );
                                }

                                const dayEvents =
                                    eventsByDay.get(cell.key) ?? [];
                                const isToday = cell.key === todayParts.key;
                                const isSelected = cell.key === selectedDayKey;
                                const isPast = cell.key < todayParts.key;
                                const cellClassName = [
                                    "calendar-month__cell",
                                    isToday ? "is-today" : "",
                                    isPast ? "is-past" : "",
                                    dayEvents.length ? "has-events" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ");

                                if (!dayEvents.length) {
                                    return (
                                        <td
                                            key={cell.key}
                                            className={cellClassName}>
                                            <div className="calendar-month__day">
                                                <span className="calendar-month__day-number">
                                                    {cell.day}
                                                </span>
                                            </div>
                                        </td>
                                    );
                                }

                                const visibleEvents = dayEvents.slice(
                                    0,
                                    MAX_CHIPS_PER_DAY,
                                );
                                const hiddenCount =
                                    dayEvents.length - visibleEvents.length;

                                return (
                                    <td
                                        key={cell.key}
                                        className={cellClassName}>
                                        <button
                                            type="button"
                                            className="calendar-month__day calendar-month__day--interactive"
                                            aria-pressed={isSelected}
                                            onClick={() =>
                                                setSelectedDayKey(
                                                    isSelected
                                                        ? null
                                                        : cell.key,
                                                )
                                            }
                                            aria-label={`${formatDayKey(cell.key, DAY_LABEL_FORMATTER)}, ${dayEvents.length} deadline${dayEvents.length === 1 ? "" : "s"}`}>
                                            <span className="calendar-month__day-number">
                                                {cell.day}
                                            </span>
                                            <span
                                                className="calendar-month__day-events"
                                                aria-hidden="true">
                                                {visibleEvents.map((event) => (
                                                    <span
                                                        key={event.id}
                                                        className={`calendar-month__chip calendar-month__chip--${event.tone}`}>
                                                        <span className="calendar-month__chip-venue">
                                                            {event.venueName}
                                                        </span>
                                                        <span className="calendar-month__chip-label">
                                                            {event.shortLabel}
                                                        </span>
                                                    </span>
                                                ))}
                                                {hiddenCount ? (
                                                    <span className="calendar-month__chip-more">
                                                        +{hiddenCount} more
                                                    </span>
                                                ) : null}
                                            </span>
                                        </button>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="calendar-month__readout" aria-live="polite">
                {selectedEvents.length ? (
                    <div className="calendar-month__detail">
                        <h3>
                            {formatDayKey(selectedDayKey, DAY_LABEL_FORMATTER)}
                        </h3>
                        <ul>
                            {selectedEvents.map((event) => (
                                <li key={event.id}>
                                    <div className="calendar-month__detail-copy">
                                        <p
                                            className={`calendar-month__detail-kind calendar-month__detail-kind--${event.tone}`}>
                                            {event.shortLabel}
                                        </p>
                                        <p className="calendar-month__detail-venue">
                                            {event.venueName}
                                        </p>
                                        <p className="calendar-month__detail-label">
                                            {event.label}
                                        </p>
                                    </div>
                                    <div className="calendar-month__detail-time">
                                        <time dateTime={event.deadlineAt}>
                                            {formatDeadlineTimeInDisplayTimezone(
                                                event.deadlineAt,
                                            )}{" "}
                                            KST
                                        </time>
                                        <small>
                                            {formatDeadlineInDisplayTimezone(
                                                event.deadlineAt,
                                            )}{" "}
                                            · Official timezone:{" "}
                                            {event.timezoneLabel}
                                        </small>
                                        <a
                                            href={event.cfpUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="animated-underline">
                                            Official CFP{" "}
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : monthEventCount ? (
                    <p className="calendar-month__hint">
                        Select a highlighted day to see its deadlines in full.
                    </p>
                ) : (
                    <p className="calendar-month__hint">
                        No tracked deadlines fall in {monthLabel}.
                        {nextMonthWithEvents ? (
                            <>
                                {" "}
                                <button
                                    type="button"
                                    className="calendar-month__jump animated-underline"
                                    onClick={() =>
                                        setMonthIndex(nextMonthWithEvents)
                                    }>
                                    Jump to {formatMonth(nextMonthWithEvents)}
                                </button>
                            </>
                        ) : null}
                    </p>
                )}
            </div>
        </section>
    );
}

export default DeadlineMonthGrid;
