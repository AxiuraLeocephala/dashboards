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
import "./../../styles/monthlyResults.css";

const MonthlyResults = ({ rows }) => {
    const parseDate = (value) => {
    if (!value) return null;

    if (value instanceof Date) return value;

    if (typeof value === "number") {
        return new Date(Math.round((value - 25569) * 86400 * 1000));
    }

    if (typeof value === "string") {
        const [datePart, timePart] = value.split(" ");
        if (!datePart || !timePart) return null;

        const [day, month, year] = datePart.split(".").map(Number);
        const [hours, minutes] = timePart.split(":").map(Number);

        return new Date(year, month - 1, day, hours, minutes);
    }

    return null;
};

    const data = useMemo(() => {
        if (!rows.length) return [];

        const map = {};

        rows.forEach((r) => {
            const date = parseDate(r.start_time);
            if (!date) return;

            if (date.getFullYear() !== 2025) return;

            const month = date.getMonth();
            const percent = Number(r.percent);

            if (isNaN(percent)) return;

            if (!map[month]) {
                map[month] = { sum: 0, count: 0 };
            }

            map[month].sum += percent;
            map[month].count += 1;
        });

        const monthNames = [
            "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ];

        return Array.from({ length: 12 }).map((_, i) => ({
            month: monthNames[i],
            avg: map[i] ? map[i].sum / map[i].count : 0
        }));
    }, [rows]);

    return (
        <div className="mr-container">
            <div className="mr-title">Результаты по месяцам</div>

            <div className="mr-chart">
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />

                        <Line
                            type="monotone"
                            dataKey="avg"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MonthlyResults;