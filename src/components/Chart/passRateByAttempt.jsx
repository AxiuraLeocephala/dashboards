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
import groupBy from "../utils/groupBy";
import "./../../styles/passRateByAttempt.css";

const PassRateByAttempt = ({ rows, C }) => {
    const byAttempt = groupBy(rows, "attempt_no");
    const data = [1, 2, 3].map(n => ({
        name: `Попытка ${n}`, passRate: pct(byAttempt[n] || [], r => r.result === "Сдано"),
        count: (byAttempt[n] || []).length,
    }));

    return (
        <div className="chart-card">
            <h3 className="chart-title">Сдаваемость по номеру попытки</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} barSize={60}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v}%`} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
                        formatter={(v, n) => [n === "passRate" ? `${v.toFixed(1)}%` : v, n === "passRate" ? "Сдаваемость" : "Попыток"]} />
                    <Bar dataKey="passRate" name="Сдаваемость" fill={C.teal} radius={[10, 10, 10, 10]} />
                </BarChart>
            </ResponsiveContainer>
            <div className="attempt-stats">
                {data.map(d => 
                    <div key={d.name} className="attempt-stat">
                        <span>{d.name}</span>
                        <span>{d.count} попыток</span>
                        <b>{d.passRate.toFixed(1)}%</b>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PassRateByAttempt;