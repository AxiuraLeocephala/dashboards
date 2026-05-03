import {
    ResponsiveContainer,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line
} from "recharts"
import pct from "../utils/pct";
import avg from "../utils/avg";
import groupBy from "../utils/groupBy";

const GroupDynamics = ({ rows, C }) => {
    const byGroup = groupBy(rows, "group");
    const g = Object.keys(byGroup)[0];
    const arr = byGroup[g] || [];
    const byAttempt = groupBy(arr, "attempt_no");
    const data = [1, 2, 3].map(n => ({
        attempt: `Попытка ${n}`,
        passRate: pct(byAttempt[n] || [], r => r.result === "Сдано"),
        avg: avg((byAttempt[n] || []).map(r => r.percent)),
    }));
    return (
        <div className="chart-card">
            <h3 className="chart-title">Динамика попыток внутри группы ({g})</h3>
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="attempt" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} formatter={v => `${v.toFixed(1)}%`} />
                    <Line type="monotone" dataKey="avg" stroke={C.amber} strokeWidth={3} dot={{ r: 5 }} name="Ср. балл" />
                    <Line type="monotone" dataKey="passRate" stroke={C.green} strokeWidth={3} dot={{ r: 5 }} name="Сдаваемость" />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GroupDynamics;