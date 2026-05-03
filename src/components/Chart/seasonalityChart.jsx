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

const SeasonalityChart = ({ rows, C }) => {
    const dow = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const map = {};
    rows.forEach(r => {
        const d = r.start_time instanceof Date ? (r.start_time.getDay() + 6) % 7 : 0;
        map[d] = (map[d] || 0) + 1;
    });
    const data = dow.map((name, i) => ({ name, count: map[i] || 0 }));

    return (
        <div className="chart-card">
            <h3 className="chart-title">Сезонность: активность по дням недели</h3>
            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                    <Bar dataKey="count" fill={C.cyan} radius={[10, 10, 10, 10]} name="Попыток">
                        {data.map((d, i) => <Cell key={i} fill={i >= 5 ? C.red : C.cyan} />)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default SeasonalityChart;