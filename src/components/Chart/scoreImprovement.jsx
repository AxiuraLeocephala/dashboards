import {
    ResponsiveContainer,
    Cell,
    Tooltip,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import groupBy from "../utils/groupBy";

const ScoreImprovement = ({ rows, C, COLORS }) => {
    const byStudent = groupBy(rows, "student_id");
    const improvements = [];
    Object.values(byStudent).forEach(attempts => {
        const sorted = [...attempts].sort((a, b) => a.attempt_no - b.attempt_no);
        for (let i = 1; i < sorted.length; i++) {
            improvements.push(sorted[i].percent - sorted[i - 1].percent);
        }
    });

    const buckets = { "< -10": 0, "-10 — 0": 0, "0 — 10": 0, "10 — 20": 0, "> 20": 0 };
    improvements.forEach(d => {
        if (d < -10) buckets["< -10"]++;
        else if (d < 0) buckets["-10 — 0"]++;
        else if (d < 10) buckets["0 — 10"]++;
        else if (d < 20) buckets["10 — 20"]++;
        else buckets["> 20"]++;
    });
    const data = Object.entries(buckets).map(([name, value]) => ({ name, value }));

    return (
        <div className="chart-card">
            <h3 className="chart-title">Улучшение балла между попытками</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {data.map((d, i) => <Cell key={i} fill={d.name.startsWith("<") || d.name.startsWith("-") ? C.red : COLORS[i % COLORS.length]} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ScoreImprovement;