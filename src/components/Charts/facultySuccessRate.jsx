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
import "./../../styles/facultySuccessRate.css";

export default function FacultySuccessRate({ rows }) {
    const data = useMemo(() => {
        if (!rows.length) return [];

        const successValues = new Set(["Сдано", "1", 1, true]);

        const map = {};

        rows.forEach((r) => {
            const faculty = r.faculty || "Неизвестно";
            const isSuccess = successValues.has(r.result);

            if (!map[faculty]) {
                map[faculty] = { success: 0, total: 0 };
            }

            map[faculty].total += 1;
            if (isSuccess) map[faculty].success += 1;
        });

        const result = Object.entries(map).map(([faculty, val]) => ({
            faculty,
            rate: val.total ? (val.success / val.total) * 100 : 0,
            success: val.success,
            total: val.total
        }));

        return result.sort((a, b) => b.rate - a.rate);
    }, [rows]);

    const COLORS = [
        "#16a34a",
        "#22c55e",
        "#84cc16",
        "#eab308",
        "#f97316",
        "#ef4444"
    ];

    return (
        <div className="fsr-container">
            <div className="fsr-title">% успешной сдачи по факультетам</div>

            <div className="fsr-chart">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis
                            type="category"
                            dataKey="faculty"
                            width={140}
                        />
                        <Tooltip
                            formatter={(v, _, obj) =>
                                `${v.toFixed(1)}% (${obj.payload.success}/${obj.payload.total})`
                            }
                        />

                        <Bar dataKey="rate" radius={[6, 6, 6, 6]}>
                            <LabelList
                                dataKey="rate"
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