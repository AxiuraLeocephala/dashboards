import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./../../styles/facultyRating.css";

const FacultyRating = ({ rows }) => {
    const data = useMemo(() => {
        if (!rows.length) return [];

        const map = {};

        rows.forEach((r) => {
            const faculty = r.faculty || "Неизвестно";
            const score = Number(r.percent);

            if (isNaN(score)) return;

            if (!map[faculty]) {
                map[faculty] = { sum: 0, count: 0 };
            }

            map[faculty].sum += score;
            map[faculty].count += 1;
        });

        const result = Object.entries(map).map(([faculty, val]) => ({
            faculty,
            avg: val.sum / val.count
        }));

        return result.sort((a, b) => b.avg - a.avg);
    }, [rows]);

    const COLORS = [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4"
    ];

    return (
        <div className="fr-container">
            <div className="fr-title">Рейтинг факультетов</div>

            <div className="fr-chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis
                            type="category"
                            dataKey="faculty"
                            width={120}
                        />
                        <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />

                        <Bar dataKey="avg" radius={[6, 6, 6, 6]}>
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default FacultyRating;