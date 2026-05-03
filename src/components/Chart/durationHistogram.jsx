import {
    ResponsiveContainer,
    Tooltip,
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

const DurationHistogram = ({ rows, C }) => {
    const buckets = Array.from({ length: 10 }, (_, i) => ({ name: `${i}–${i + 1}`, count: 0 }));
    rows.forEach(r => {
        const min = r.duration_sec / 60;
        const idx = Math.min(9, Math.floor(min));
        buckets[idx].count++;
    });

    return (
        <div className="chart-card">
            <h3 className="chart-title">Гистограмма продолжительности тестов</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={buckets} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} label={{ value: "Минуты", fill: "#64748b", fontSize: 11, position: "insideBottom", offset: -2 }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                    <Bar dataKey="count" fill={C.orange} radius={[10, 10, 10, 10]} name="Попыток" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default DurationHistogram;