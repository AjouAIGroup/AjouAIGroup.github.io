import { useState } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const formatNumber = (value) =>
    new Intl.NumberFormat("ko-KR").format(Number(value) || 0);

// Rounds the axis up to a 1·2·5 step so the labels stay readable numbers.
const buildTicks = (maxValue, targetCount = 4) => {
    const raw = Math.max(1, maxValue) / targetCount;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const step =
        [1, 2, 5, 10].map((unit) => unit * magnitude).find((v) => v >= raw) ??
        10 * magnitude;
    const top = Math.max(step, Math.ceil(maxValue / step) * step);
    return Array.from({ length: top / step + 1 }, (_, index) => index * step);
};

const describeDay = (isoDate) => {
    const date = new Date(`${isoDate}T00:00:00Z`);
    return `${isoDate.slice(5).replace("-", "/")} (${WEEKDAYS[date.getUTCDay()]})`;
};

const AnalyticsChart = ({ series = [], days }) => {
    const [showTable, setShowTable] = useState(false);
    const ticks = buildTicks(
        Math.max(0, ...series.map((item) => item.pageViews)),
    );
    const top = ticks.at(-1);
    // A 30-day axis has room for about one label every five days.
    const labelEvery = series.length > 10 ? 5 : 1;
    const toPercent = (value) => `${(value / top) * 100}%`;

    return (
        <figure className="admin-chart">
            <figcaption className="admin-chart__head">
                <strong>최근 {days}일 일별 추이</strong>
                <span className="admin-chart__legend">
                    <span className="admin-chart__key admin-chart__key--views">
                        페이지뷰
                    </span>
                    <span className="admin-chart__key admin-chart__key--visits">
                        방문
                    </span>
                </span>
            </figcaption>

            <div className="admin-chart__frame" aria-hidden="true">
                <div className="admin-chart__axis">
                    {ticks.map((tick) => (
                        <span key={tick} style={{ bottom: toPercent(tick) }}>
                            {formatNumber(tick)}
                        </span>
                    ))}
                </div>
                <div className="admin-chart__plot">
                    {ticks.map((tick) => (
                        <span
                            key={tick}
                            className="admin-chart__grid"
                            style={{ bottom: toPercent(tick) }}
                        />
                    ))}
                    {series.map((item) => (
                        <div className="admin-chart__day" key={item.date}>
                            <span
                                className="admin-chart__bar admin-chart__bar--views"
                                style={{ height: toPercent(item.pageViews) }}
                            />
                            <span
                                className="admin-chart__bar admin-chart__bar--visits"
                                style={{ height: toPercent(item.visits) }}
                            />
                            <span className="admin-chart__tip">
                                <strong>{describeDay(item.date)}</strong>
                                페이지뷰 {formatNumber(item.pageViews)}
                                <br />
                                방문 {formatNumber(item.visits)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="admin-chart__dates">
                    {series.map((item, index) => (
                        <span key={item.date}>
                            {(series.length - 1 - index) % labelEvery === 0
                                ? item.date.slice(5).replace("-", "/")
                                : ""}
                        </span>
                    ))}
                </div>
            </div>

            <button
                className="admin-button admin-chart__table-toggle"
                type="button"
                aria-expanded={showTable}
                aria-controls="admin-series-table"
                onClick={() => setShowTable((current) => !current)}>
                {showTable ? "숫자 표 닫기" : "숫자 표로 보기"}
            </button>

            <table
                id="admin-series-table"
                className={`admin-series-table${showTable ? " is-open" : ""}`}>
                <caption>최근 {days}일 일별 페이지뷰와 방문</caption>
                <thead>
                    <tr>
                        <th scope="col">날짜</th>
                        <th scope="col">페이지뷰</th>
                        <th scope="col">방문</th>
                    </tr>
                </thead>
                <tbody>
                    {series
                        .slice()
                        .reverse()
                        .map((item) => (
                            <tr key={item.date}>
                                <th scope="row">{describeDay(item.date)}</th>
                                <td>{formatNumber(item.pageViews)}</td>
                                <td>{formatNumber(item.visits)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </figure>
    );
};

export default AnalyticsChart;
