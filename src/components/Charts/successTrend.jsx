import { useMemo } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import "./../../styles/successTrend.css";

const SuccessTrend = ({ rows }) => {
    const parseDate = (value) => {
        if (!value) return null;

        if (value instanceof Date) return value;

        if (typeof value === "number") {
            return new Date(Math.round((value - 25569) * 86400 * 1000));
        }

        if (typeof value === "string") {
            const [d, t] = value.split(" ");
            if (!d || !t) return null;

            const [day, month, year] = d.split(".").map(Number);
            const [h, m] = t.split(":").map(Number);

            return new Date(year, month - 1, day, h, m);
        }

        return null;
    };

    const data = useMemo(() => {
        if (!rows.length) return [];

        const map = {};

        rows.forEach((r) => {
            const date = parseDate(r.start_time);
            if (!date) return;

            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

            if (!map[key]) {
                map[key] = { success: 0, total: 0 };
            }

            const percent = Number(r.percent);
            const isSuccess =
                r.result === "success" ||
                r.result === "passed" ||
                percent >= 50;

            map[key].total += 1;
            if (isSuccess) map[key].success += 1;
        });

        const sorted = Object.entries(map)
            .map(([key, v]) => ({
                month: key,
                rate: (v.success / v.total) * 100
            }))
            .sort((a, b) => a.month.localeCompare(b.month));

        const windowSize = 3;

        const withTrend = sorted.map((item, index, arr) => {
            const start = Math.max(0, index - windowSize + 1);
            const slice = arr.slice(start, index + 1);

            const avg =
                slice.reduce((acc, cur) => acc + cur.rate, 0) /
                slice.length;

            return {
                ...item,
                trend: avg
            };
        });

        return withTrend;
    }, [rows]);

    return (
        <div className="st-container">
            <div className="st-title">Тренд успеваемости</div>

            <div className="st-chart">
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />

                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="trend"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default SuccessTrend;