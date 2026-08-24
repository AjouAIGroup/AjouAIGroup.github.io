import "./Publication.css";
import PublicationCard from "./Publication.Card";
import { useEffect, useMemo, useState } from "react";
import PublicationButton from "./Publication.Button";
import {
    getAllPublications,
    getPublicationCategories,
    getPublicationYear,
    getPublicationYears,
} from "../../utils/publicationData";
import { useLocation } from "react-router-dom";
import {
    RESEARCH_CATEGORY_LABELS,
    resolveResearchAreaKey,
} from "../../utils/researchData";

const areaCategory = getPublicationCategories();
const publicationYears = getPublicationYears();
const publications = getAllPublications();
function Publication() {
    const location = useLocation();
    const [selectedArea, setSelectedArea] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectedArea = (area) => {
        setSelectedArea(area);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFromParams = params.get("q")?.trim() ?? "";
        const areaFromParams = params.get("area")?.trim() ?? "";
        const yearFromParams = params.get("year")?.trim() ?? "";
        const normalizedAreaFromParams =
            areaFromParams === "all"
                ? "all"
                : resolveResearchAreaKey(areaFromParams);

        const hasValidArea = areaCategory.includes(normalizedAreaFromParams);
        const hasValidYear = publicationYears.includes(yearFromParams);

        setSearchQuery(queryFromParams);
        setSelectedArea(hasValidArea ? normalizedAreaFromParams : "all");
        setSelectedYear(hasValidYear ? yearFromParams : "all");
    }, [location.search]);

    const filteredPublications = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return publications.filter((publicationItem) => {
            const areaMatch =
                selectedArea === "all" ||
                selectedArea === publicationItem.category;

            if (!areaMatch) {
                return false;
            }

            const yearMatch =
                selectedYear === "all" ||
                selectedYear === getPublicationYear(publicationItem);

            if (!yearMatch) {
                return false;
            }

            if (!normalizedQuery) {
                return true;
            }

            const searchParts = [
                publicationItem.title,
                publicationItem.research_meta.author,
                publicationItem.research_meta.published_place,
            ];

            const searchTarget = searchParts.join(" ").toLowerCase();

            return searchTarget.includes(normalizedQuery);
        });
    }, [searchQuery, selectedArea, selectedYear]);

    const groupedPublications = useMemo(() => {
        const groups = new Map();

        filteredPublications.forEach((publicationItem) => {
            const year = getPublicationYear(publicationItem);
            const items = groups.get(year) ?? [];
            items.push(publicationItem);
            groups.set(year, items);
        });

        return Array.from(groups, ([year, items]) => ({ year, items }));
    }, [filteredPublications]);

    return (
        <div data-reveal data-reveal-load-delay="60" className="publication">
            <div
                data-reveal
                className="tab-header page-head page-head--publication">
                <h1>Publications</h1>
                <p className="page-head__summary">
                    Search and filter the publication archive by research area,
                    title, authors, and venue.
                </p>
            </div>

            <div
                data-reveal
                className="publication__controls page-panel page-panel--compact page-panel--section-start page-controls"
                aria-label="Filter publications">
                <div className="publication__controls-grid page-controls__grid">
                    <section className="publication__controls-group publication__controls-group--area page-controls__group">
                        <div className="publication__controls-head">
                            <p className="publication__controls-label page-controls__label">
                                Filter by research area
                            </p>
                        </div>
                        <div
                            className="publication__filter page-controls__actions"
                            role="group"
                            aria-label="Filter publications by area">
                            {areaCategory.map((area, i) => (
                                <PublicationButton
                                    key={area + i}
                                    areaKey={area}
                                    isSelected={selectedArea === area}
                                    onSelect={() => handleSelectedArea(area)}>
                                    {RESEARCH_CATEGORY_LABELS[area] ||
                                        area.charAt(0).toUpperCase() +
                                            area.slice(1)}
                                </PublicationButton>
                            ))}
                        </div>
                    </section>

                    <section className="publication__controls-group page-controls__group">
                        <div className="publication__controls-head">
                            <p className="publication__controls-label page-controls__label">
                                Filter by year
                            </p>
                        </div>
                        <div
                            className="publication__filter publication__year-filter page-controls__actions"
                            role="group"
                            aria-label="Filter publications by year">
                            <PublicationButton
                                areaKey="all"
                                isSelected={selectedYear === "all"}
                                onSelect={() => setSelectedYear("all")}>
                                All years
                            </PublicationButton>
                            {publicationYears.map((year) => (
                                <PublicationButton
                                    key={year}
                                    areaKey={`year-${year}`}
                                    isSelected={selectedYear === year}
                                    onSelect={() => setSelectedYear(year)}>
                                    {year}
                                </PublicationButton>
                            ))}
                        </div>
                    </section>

                    <section className="publication__controls-group page-controls__group">
                        <div className="publication__controls-head">
                            <label
                                className="publication__search-label page-controls__label"
                                htmlFor="publication-search">
                                Search publications
                            </label>
                        </div>
                        <div className="publication__search-layout">
                            <div className="publication__search-input-wrap">
                                <input
                                    id="publication-search"
                                    type="search"
                                    className="publication__search-input"
                                    placeholder="Search by title, authors, or venue"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <section
                data-reveal
                className="publication__archive page-panel"
                aria-labelledby="publication-archive-title">
                <div className="publication__section-head">
                    <div>
                        <h2 id="publication-archive-title">
                            Publications Archive
                        </h2>
                        <p>
                            {filteredPublications.length} result
                            {filteredPublications.length === 1 ? "" : "s"} in
                            the current view
                        </p>
                    </div>
                </div>
                <div className="publication__archive-groups">
                    {groupedPublications.map((group, groupIndex) => (
                        <section
                            key={group.year}
                            className="publication__year-group"
                            aria-labelledby={`publication-year-${group.year}`}>
                            <h3
                                id={`publication-year-${group.year}`}
                                className="publication__year-heading">
                                {group.year}
                            </h3>
                            <div className="publication__list">
                                {group.items.map((tpub, index) => (
                                    <PublicationCard
                                        key={`${tpub.key}-${index}`}
                                        publicationId={tpub.id}
                                        category={tpub.category}
                                        meta={tpub.research_meta}
                                        title={tpub.title}
                                        revealDelay={`${Math.min(index, 5) * 60}ms`}
                                        revealLoadDelay={`${120 + Math.min(groupIndex + index, 5) * 60}`}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                    {groupedPublications.length === 0 && (
                        <p className="publication__empty">
                            No publications match your selected filters and
                            search query.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Publication;
