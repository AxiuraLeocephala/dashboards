import {
    ResponsiveContainer,
    Tooltip,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import avg from "../utils/avg";
import groupBy from "../utils/groupBy";

function AvgDurationByQuiz({ rows, C }) {
    const byQuiz = groupBy(rows, "quiz_name");
    const data = Object.entries(byQuiz).map(([name, arr]) => ({
        name, avgDur: avg(arr.map(r => r.duration_sec)) / 60,
    })).sort((a, b) => b.avgDur - a.avgDur);
    return (
        <div className="chart-card">
            <h3 className="chart-title">Среднее время по тесту / курсу</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} layout="vertical" barSize={16} margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v.toFixed(0)}м`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#cbd5e1" }} width={80} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} formatter={v => `${v.toFixed(1)} мин`} />
                    <Bar dataKey="avgDur" fill={C.pink} radius={[4, 4, 4, 4]} name="Ср. время" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AvgDurationByQuiz;