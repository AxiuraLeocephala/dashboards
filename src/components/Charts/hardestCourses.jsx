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
import "./../../styles/hardestCourses.css";

const HardestCourses = ({ rows }) => {
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
            .sort((a, b) => a.avg - b.avg)
            .slice(0, 5);
    }, [rows]);

    const COLORS = [
        "#dc2626",
        "#ef4444",
        "#f97316",
        "#f59e0b",
        "#eab308"
    ];

    return (
        <div className="hc-container">
            <div className="hc-title">Топ-5 самых сложных курсов</div>

            <div className="hc-chart">
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

export default HardestCourses;