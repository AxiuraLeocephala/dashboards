import { useMemo } from "react";
import {
    ResponsiveContainer,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    LineChart,
    Line
} from "recharts";
import "./../../styles/timeDistribution.css";

const TimeDistribution = ({ rows }) => {
    const data = useMemo(() => {
        if (!rows.length) return [];

        const values = rows
            .map((r) => Number(r.duration_sec))
            .filter((v) => !isNaN(v) && v > 0);

        if (!values.length) return [];

        const mean =
            values.reduce((a, b) => a + b, 0) / values.length;

        const std =
            Math.sqrt(
                values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) /
                values.length
            );

        // гистограмма
        const binSize = Math.max(30, Math.round(std / 2));

        const bins = {};

        values.forEach((v) => {
            const bin = Math.floor(v / binSize) * binSize;
            bins[bin] = (bins[bin] || 0) + 1;
        });

        const hist = Object.entries(bins)
            .map(([x, y]) => ({
                x: Number(x),
                y
            }))
            .sort((a, b) => a.x - b.x);

        // аппроксимация
        const normalCurve = hist.map((p) => {
            const x = p.x;
            const pdf =
                (1 / (std * Math.sqrt(2 * Math.PI))) *
                Math.exp(-0.5 * Math.pow((x - mean) / std, 2));

            return {
                x,
                y: pdf * values.length * binSize
            };
        });

        return { hist, normalCurve, mean, std };
    }, [rows]);

    return (
        <div className="td-container">
            <div className="td-title">
                Распределение времени прохождения
            </div>

            <div className="td-meta">
                μ = {data.mean.toFixed(0)}s · σ = {data.std.toFixed(0)}s
            </div>

            <div className="td-chart">
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="x"
                            type="category"
                            allowDuplicatedCategory={false}
                            label={{ value: "Время (сек)", position: "insideBottom", offset: -5 }}
                        />

                        <YAxis />

                        <Tooltip />

                        {/* гистограмма */}
                        <Scatter
                            data={data.hist}
                            fill="#94a3b8"
                        />

                        {/* нормальное распределение */}
                        <Line
                            data={data.normalCurve}
                            type="monotone"
                            dataKey="y"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default TimeDistribution;