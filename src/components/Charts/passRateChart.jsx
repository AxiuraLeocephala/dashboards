import { useMemo } from "react";
import "./../../styles/passRateChart.css";

const PassRateChart = ({ rows }) => {
    const { successRate, successCount, total } = useMemo(() => {
        if (!rows.length) return { successRate: 0, successCount: 0, total: 0 };

        const successValues = new Set(["Сдано", "1", 1, true]);

        let successCount = 0;

        rows.forEach((r) => {
            if (successValues.has(r.result)) {
                successCount++;
            }
        });

        const total = rows.length;
        const successRate = total ? (successCount / total) * 100 : 0;

        return { successRate, successCount, total };
    }, [rows]);

    return (
        <div className="srs-container">
            <div className="srs-title">Успешная сдача</div>

            <div className="srs-value">
                {successRate.toFixed(1)}%
            </div>

            <div className="srs-meta">
                {successCount} / {total}
            </div>
        </div>
    );
}

export default PassRateChart;