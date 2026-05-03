import {
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    ScatterChart,
    Scatter
} from "recharts"
import pct from "../utils/pct";
import avg from "../utils/avg";
import groupBy from "../utils/groupBy";

const GroupComparison = ({ rows, C }) => {
    const byGroup = groupBy(rows, "group");
    const data = Object.entries(byGroup).map(([name, arr]) => ({
        name, passRate: pct(arr, r => r.result === "Сдано"),
        avg: avg(arr.map(r => r.percent)), count: arr.length,
    }));

    return (
        <div className="chart-card">
            <h3 className="chart-title">Сравнение групп одного факультета</h3>
            <ResponsiveContainer width="100%" height={260}>
                <ScatterChart margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="avg" name="Ср. балл" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Ср. балл", fill: "#64748b", fontSize: 11, position: "insideBottom", offset: 0 }} />
                    <YAxis dataKey="passRate" name="Сдаваемость" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Сдаваемость %", fill: "#64748b", fontSize: 11, angle: -90, position: "insideLeft" }} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
                        content={({ payload }) => payload?.[0] ? 
                            <div className="custom-tooltip">
                                <b>{payload[0].payload.name}</b>
                                <br />Ср. балл: {payload[0].payload.avg.toFixed(1)}%<br />
                                Сдаваемость: {payload[0].payload.passRate.toFixed(1)}%
                            </div> 
                            : 
                            null
                        } />
                    <Scatter data={data} fill={C.purple} radius={[10, 10, 10, 10]} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GroupComparison;