import {
    ResponsiveContainer,
    Tooltip,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import groupBy from "../utils/groupBy";

function AttemptsPerQuiz({ rows, C }) {
    const byQuiz = groupBy(rows, "quiz_id");
    const data = Object.entries(byQuiz).map(([id, arr]) => ({ name: id, count: arr.length }))
        .sort((a, b) => b.count - a.count).slice(0, 12);
    return (
        <div className="chart-card">
            <h3 className="chart-title">Кол-во попыток на тест</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} barSize={22}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                    <Bar dataKey="count" fill={C.indigo} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AttemptsPerQuiz;