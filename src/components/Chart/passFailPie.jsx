import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
} from "recharts"
import "./../../styles/passFailPie.css";

const PassFailPie = ({ rows, C }) => {
    const passed = rows.filter(r => r.result === "Сдано").length;
    const failed = rows.length - passed;
    const data = [
        { 
            name: "Сдали", 
            value: passed 
        }, 
        { 
            name: "Не сдали", 
            value: failed 
        }
    ]

    return (
        <div className="chart-card">
            <h3 className="chart-title">Сдача / несдача</h3>
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                        <Cell fill="rgb(42, 154, 215)" /><Cell fill="rgb(242, 155, 73)" />
                    </Pie>
                    <Tooltip 
                    formatter={(v) => v.toLocaleString()} 
                    contentStyle={{
                        background: '#171821',
                        // border: '1px solid #6E5CEA',
                        borderRadius: 8,
                        color: '#fff', // Белый текст
                    }}/>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PassFailPie;