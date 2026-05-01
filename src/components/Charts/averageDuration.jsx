import { useMemo } from "react";
import "./../../styles/averageDuration.css";

const AverageDuration = ({ rows }) => {
    const { avgSeconds, count } = useMemo(() => {
        if (!rows.length) return { avgSeconds: 0, count: 0 };

        const durations = rows
            .map((r) => Number(r.duration_sec))
            .filter((v) => !isNaN(v) && v > 0);

        if (!durations.length) return { avgSeconds: 0, count: 0 };

        const sum = durations.reduce((acc, v) => acc + v, 0);
        const avgSeconds = sum / durations.length;

        return { avgSeconds, count: durations.length };
    }, [rows]);

    const formatTime = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = Math.floor(sec % 60);

        if (h > 0) return `${h}ч ${m}м`;
        if (m > 0) return `${m}м ${s}с`;
        return `${s}с`;
    };

    return (
        <div className="ad-container">
            <div className="ad-title">Среднее время прохождения</div>

            <div className="ad-value">
                {formatTime(avgSeconds)}
            </div>

            <div className="ad-meta">
                по {count} попыткам
            </div>
        </div>
    );
}

export default AverageDuration;