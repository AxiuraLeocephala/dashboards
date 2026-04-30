import { useMemo } from "react";
import "./../../styles/averageAcademicPerformance.css";

const AverageAcademicPerformance = ({ rows }) => {
    const average = useMemo(() => {
        if (!rows.length) return 0;

        const values = rows
            .map((r) => Number(r["percent"]))
            .filter((v) => !isNaN(v));

        if (!values.length) return 0;

        const sum = values.reduce((acc, v) => acc + v, 0);
        return sum / values.length;
    }, [rows]);

    const level = useMemo(() => {
        if (average >= 85) return "excellent";
        if (average >= 70) return "good";
        if (average >= 50) return "medium";
        if (average >= 30) return "bad";
        return "critical";
    }, [average]);

    return (
        <div className="atl-container">
            <div className="atl-title">Средний результат</div>
            <div className={`atl-light atl-${level}`}/>
            <div className="atl-value">
                {average.toFixed(2)}
            </div>
        </div>
    );
}

export default AverageAcademicPerformance;