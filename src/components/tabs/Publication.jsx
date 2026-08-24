import "./Publication.css";
import PublicationCard from "./Publication.Card";
import { useEffect, useMemo, useState } from "react";
import PublicationButton from "./Publication.Button";
import {
    getAllPublications,
    getPublicationCategories,
} from "../../utils/publicationData";
import { useLocation } from "react-router-dom";
import {
    RESEARCH_CATEGORY_LABELS,
    resolveResearchAreaKey,
} from "../../utils/researchData";

const areaCategory = getPublicationCategories();
const publications = getAllPublications();
function Publication() {
    const location = useLocation();
    const [selectedArea, setSelectedArea] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectedArea = (area) => {
        setSelectedArea(area);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryFromParams = params.get("q")?.trim() ?? "";
        const areaFromParams = params.get("area")?.trim() ?? "";
        const normalizedAreaFromParams =
            areaFromParams === "all"
                ? "all"
                : resolveResearchAreaKey(areaFromParams);

        const hasValidArea = areaCategory.includes(normalizedAreaFromParams);

        setSearchQuery(queryFromParams);
        setSelectedArea(hasValidArea ? normalizedAreaFromParams : "all");
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
    }, [searchQuery, selectedArea]);

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
                    <section className="publication__controls-group page-controls__group">
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
                <div className="publication__list">
                    {filteredPublications.map((tpub, index) => (
                        <PublicationCard
                            key={`${tpub.key}-${index}`}
                            publicationId={tpub.id}
                            category={tpub.category}
                            meta={tpub.research_meta}
                            title={tpub.title}
                            revealDelay={`${Math.min(index, 5) * 60}ms`}
                            revealLoadDelay={`${120 + Math.min(index, 5) * 60}`}
                        />
                    ))}
                    {filteredPublications.length === 0 && (
                        <p className="publication__empty">
                            No publications match your selected category and
                            search query.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Publication;
