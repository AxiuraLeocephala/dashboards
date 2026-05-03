import avg from "../utils/avg";
import groupBy from "../utils/groupBy";

const TopStudentsByScore = ({ rows, C, COLORS }) => {
    const byStudent = groupBy(rows, "student_id");
    const data = Object.entries(byStudent).map(([id, arr]) => ({
        id, avg: avg(arr.map(r => r.percent)), name: `${arr[0].surname} ${arr[0].name[0]}.`,
    })).sort((a, b) => b.avg - a.avg).slice(0, 10);
    return (
        <div className="chart-card">
            <h3 className="chart-title">Рейтинг студентов по среднему баллу</h3>
            <table className="data-table">
                <thead><tr><th>#</th><th>Студент</th><th>ID</th><th>Ср. балл</th></tr></thead>
                <tbody>
                {data.map((d, i) => (
                    <tr key={d.id}>
                    <td><span className="rank-badge" style={{ background: COLORS[i % 3] }}>{i + 1}</span></td>
                    <td>{d.name}</td><td className="muted">{d.id}</td>
                    <td><b style={{ color: C.green }}>{d.avg.toFixed(1)}%</b></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopStudentsByScore;