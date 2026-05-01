import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList
} from "recharts";
import "./../../styles/easiestCourses.css";

const EasiestCourses = ({ rows }) => {
    const data = useMemo(() => {
        if (!rows.length) return [];

        const map = {};

        rows.forEach((r) => {
            const course =
                r.course_name || `course_${r.course_id || "unknown"}`;
            const percent = Number(r.percent);

            if (isNaN(percent)) return;

            if (!map[course]) {
                map[course] = { sum: 0, count: 0 };
            }

            map[course].sum += percent;
            map[course].count += 1;
        });

        const result = Object.entries(map).map(([course, val]) => ({
            course,
            avg: val.sum / val.count
        }));

        return result
            .sort((a, b) => b.avg - a.avg)
            .slice(0, 5);
    }, [rows]);

    const COLORS = [
        "#16a34a",
        "#22c55e",
        "#4ade80",
        "#86efac",
        "#bbf7d0"
    ];

    return (
        <div className="ec-container">
            <div className="ec-title">Топ-5 самых лёгких курсов</div>

            <div className="ec-chart">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis
                            type="category"
                            dataKey="course"
                            width={180}
                        />
                        <Tooltip formatter={(v) => `${v.toFixed(1)}%`} />

                        <Bar dataKey="avg" radius={[6, 6, 6, 6]}>
                            <LabelList
                                dataKey="avg"
                                position="right"
                                formatter={(v) => `${v.toFixed(1)}%`}
                            />
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default EasiestCourses;