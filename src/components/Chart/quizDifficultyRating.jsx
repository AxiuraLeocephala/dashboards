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
import pct from "../utils/pct";
import groupBy from "../utils/groupBy";

const QuizDifficultyRating = ({ rows, C }) => {
    const byQuiz = groupBy(rows, "quiz_name");
    const data = Object.entries(byQuiz).map(([name, arr]) => ({
        name, passRate: pct(arr, r => r.result === "Сдано"), count: arr.length,
    })).sort((a, b) => a.passRate - b.passRate).slice(0, 10);
    
    return (
        <div className="chart-card">
            <h3 className="chart-title">Рейтинг сложности тестов (низкий % сдачи)</h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} layout="vertical" barSize={16} margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#cbd5e1" }} width={80} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} formatter={v => `${v.toFixed(1)}%`} />
                    <Bar dataKey="passRate" name="% сдачи" fill={C.red} radius={[0, 4, 4, 0]}>
                        {data.map((_, i) => <Cell key={i} fill={`hsl(${10 + i * 8}, 80%, 55%)`} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default QuizDifficultyRating;