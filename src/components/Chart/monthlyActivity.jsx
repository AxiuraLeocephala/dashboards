import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar
} from "recharts"
import "./../../styles/monthlyActivity.css";

const MonthlyActivity = ({ rows, C }) => {
    const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
    const map = {};
    rows.forEach(r => {
        const m = typeof r.start_time === "number" ? (
            new Date(Math.round((r.start_time - 25569) * 86400 * 1000)).getMonth()
        ) : (0);
        map[m] = (map[m] || 0) + 1;
    });
    const data = monthNames.map((name, i) => ({ name, count: map[i] || 0 }));

    return (
        <div className="chart-card">
            <h3 className="chart-title">Активность тестирования по месяцам</h3>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} barSize={20} barGap={5}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#171821" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <Tooltip 
                    contentStyle={{
                        background: '#171821',
                        border: '1px solid #6E5CEA',
                        borderRadius: 8,
                        color: '#fff', // Белый текст
                    }}
                    cursor="pointer"/>
                    <Bar dataKey="count" fill="#6E5CEA" radius={[10, 10, 10, 10]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlyActivity;