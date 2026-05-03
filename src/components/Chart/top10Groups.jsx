import {
    ResponsiveContainer,
    Tooltip,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts"
import pct from "../utils/pct";
import avg from "../utils/avg";
import groupBy from "../utils/groupBy";

const Top10Groups = ({ rows, C }) => {
    const byGroup = groupBy(rows, "group");
    const data = Object.entries(byGroup).map(([name, arr]) => ({
        name, passRate: pct(arr, r => r.result === "Сдано"), avg: avg(arr.map(r => r.percent)), count: arr.length,
    })).sort((a, b) => b.avg - a.avg).slice(0, 10);

    return (
        <div className="chart-card">
            <h3 className="chart-title">Топ-10 групп по успеваемости</h3>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} layout="vertical" barSize={16} margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#cbd5e1" }} width={50} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} formatter={v => `${v.toFixed(1)}%`} />
                    <Bar dataKey="avg" name="Ср. балл" fill={C.cyan} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Top10Groups;