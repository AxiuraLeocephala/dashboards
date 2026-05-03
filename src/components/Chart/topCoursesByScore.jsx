import {
    ResponsiveContainer,
    Cell,
    Tooltip,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts"
import avg from "../utils/avg";
import groupBy from "../utils/groupBy";

function TopCoursesByScore({ rows, COLORS }) {
    const byCourse = groupBy(rows, "course_name");
    const data = Object.entries(byCourse).map(([name, arr]) => ({
        name, avg: avg(arr.map(r => r.percent)),
    })).sort((a, b) => b.avg - a.avg);
    return (
        <div className="chart-card">
            <h3 className="chart-title">Топ-курсы по среднему баллу</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v}%`} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} formatter={v => `${v.toFixed(1)}%`} />
                    <Bar dataKey="avg" name="Ср. балл" radius={[4, 4, 0, 0]}>
                        {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TopCoursesByScore;