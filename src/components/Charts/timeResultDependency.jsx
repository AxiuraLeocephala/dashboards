import { useMemo } from "react";
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import "./../../styles/timeResultDependency.css";

const TimeResultDependency = ({ rows }) => {
    const parseTime = (value) => {
        if (!value) return null;

        if (typeof value === "number") {
            return Math.round(value * 86400);
        }

        if (typeof value === "string") {
            const [d, t] = value.split(" ");
            if (!d || !t) return null;

            const [day, month, year] = d.split(".").map(Number);
            const [h, m] = t.split(":").map(Number);

            return new Date(year, month - 1, day, h, m);
        }

        if (value instanceof Date) return value;

        return null;
    };

    const data = useMemo(() => {
        if (!rows.length) return [];

        return rows
            .map((r) => {
                const date = parseTime(r.start_time);
                const duration = Number(r.duration_sec);
                const rawScore = Number(r.raw_score);

                if (!date || isNaN(duration) || isNaN(rawScore)) return null;

                return {
                    time: duration / 60,
                    result: rawScore
                };
            })
            .filter(Boolean);
    }, [rows]);

    return (
        <div className="tvr-container">
            <div className="tvr-title">Зависимость: время → результат</div>

            <div className="tvr-chart">
                <ResponsiveContainer width="100%" height={340}>
                    <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            type="number"
                            dataKey="time"
                            name="Время"
                            unit=" мин"
                            domain={["auto", "auto"]}
                        />

                        <YAxis
                            type="number"
                            dataKey="result"
                            name="Результат"
                            unit="%"
                            domain={[0, 100]}
                        />

                        <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            formatter={(value, name) => {
                                if (name === "result") return `${value.toFixed(1)}%`;
                                return `${value.toFixed(1)} мин`;
                            }}
                        />

                        <Scatter
                            name="Попытки"
                            data={data}
                            fill="#3b82f6"
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TimeResultDependency;