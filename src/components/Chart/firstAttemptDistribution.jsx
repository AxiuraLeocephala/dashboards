import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
import groupBy from "../utils/groupBy";

const FirstAttemptDistribution = ({ rows, C }) => {
    const byStudent = groupBy(rows, "student_id");
    let passedFirst = 0, passedLater = 0, failed = 0;
    Object.values(byStudent).forEach(attempts => {
        const sorted = [...attempts].sort((a, b) => a.attempt_no - b.attempt_no);
        if (sorted[0]?.result === "Сдано") passedFirst++;
        else if (sorted.some(a => a.result === "Сдано")) passedLater++;
        else failed++;
    });
    const data = [
        { name: "Сдали с 1-й", value: passedFirst },
        { name: "Сдали повторно", value: passedLater },
        { name: "Не сдали", value: failed },
    ];

    return (
        <div className="chart-card">
            <h3 className="chart-title">Распределение: сдача с 1-й попытки</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie 
                    data={data} c
                    x="50%" 
                    cy="50%" 
                    outerRadius={85} 
                    dataKey="value" 
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} labelLine={false}
                    >
                        <Cell fill={C.green} /><Cell fill={C.amber} /><Cell fill={C.red} />
                    </Pie>
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default FirstAttemptDistribution;