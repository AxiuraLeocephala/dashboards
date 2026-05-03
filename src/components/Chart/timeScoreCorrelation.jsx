import {
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    ScatterChart,
    Scatter
} from "recharts"

const TimeScoreCorrelation = ({ rows, C }) => {
    const sample = rows.slice(0, 250).map(r => ({ dur: Math.round(r.duration_sec / 60), pct: r.percent }));

    return (
        <div className="chart-card">
        <h3 className="chart-title">Корреляция времени и балла</h3>
        <ResponsiveContainer width="100%" height={260}>
            <ScatterChart margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="dur" name="Минуты" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Время (мин)", fill: "#64748b", fontSize: 11, position: "insideBottom", offset: 0 }} />
                <YAxis dataKey="pct" name="Балл" tick={{ fontSize: 11, fill: "#94a3b8" }} label={{ value: "Балл %", fill: "#64748b", fontSize: 11, angle: -90, position: "insideLeft" }} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
                    content={({ payload }) => payload?.[0] ? <div className="custom-tooltip">{payload[0].payload.dur} мин · {payload[0].payload.pct}%</div> : null} />
                <Scatter data={sample} fill={C.purple} opacity={0.7} />
            </ScatterChart>
        </ResponsiveContainer>
        </div>
    );
}

export default TimeScoreCorrelation;