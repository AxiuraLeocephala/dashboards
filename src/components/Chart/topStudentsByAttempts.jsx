import groupBy from "../utils/groupBy";

const TopStudentsByAttempts = ({ rows, C, COLORS }) => {
    const byStudent = groupBy(rows, "student_id");
    const data = Object.entries(byStudent).map(([id, arr]) => ({
        id, count: arr.length, name: `${arr[0].surname} ${arr[0].name[0]}.`,
    })).sort((a, b) => b.count - a.count).slice(0, 10);
    return (
        <div className="chart-card">
            <h3 className="chart-title">Студенты с наибольшим числом попыток</h3>
            <table className="data-table">
                <thead><tr><th>#</th><th>Студент</th><th>ID</th><th>Попыток</th></tr></thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={d.id}>
                        <td><span className="rank-badge" style={{ background: COLORS[i % 3] }}>{i + 1}</span></td>
                        <td>{d.name}</td><td className="muted">{d.id}</td>
                        <td><b style={{ color: C.amber }}>{d.count}</b></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopStudentsByAttempts;