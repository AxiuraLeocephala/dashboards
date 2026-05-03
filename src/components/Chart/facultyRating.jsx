import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Legend
} from "recharts"
import groupBy from "./../utils/groupBy";
import pct from "./../utils/pct";
import avg from "./../utils/avg";

const FacultyRating = ({ rows, C })  => {
    const byFac = groupBy(rows, "faculty");
    const data = Object.entries(byFac).map(([name, arr]) => ({
        name,
        passRate: pct(arr, r => r.result === "Сдано"),
        avg: avg(arr.map(r => r.percent)),
        count: arr.length,
        avgDur: avg(arr.map(r => r.duration_sec)) / 60,
    })).sort((a, b) => b.passRate - a.passRate);

    return (
        <div className="chart-card full-width">
            <h3 className="chart-title">Рейтинг факультетов по сдаваемости</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical" barSize={18} margin={{ left: 30 }} barGap={10}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#cbd5e1" }} width={55} />
                    <Tooltip 
                    contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
                    formatter={(v, n) => [
                        n === "passRate" ? `${v.toFixed(1)}%` : `${v.toFixed(1)}%`, 
                        n === "passRate" ? "Сдаваемость" : "Ср. балл"
                        ]} 
                    />
                    <Bar dataKey="passRate" name="Сдаваемость" fill="rgb(241, 199, 210)" radius={[10, 10, 10, 10]} />
                    <Bar dataKey="avg" name="Ср. балл" fill="rgb(40, 173, 242)" radius={[10, 10, 10, 10]} />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default FacultyRating;