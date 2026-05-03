import avg from "../utils/avg";
import pct from "../utils/pct";
import groupBy from "../utils/groupBy";

const FacultyTable = ({ rows, C, COLORS }) => {
    const byFac = groupBy(rows, "faculty");
    const data = Object.entries(byFac).map(([name, arr]) => ({
        name, count: arr.length,
        passRate: pct(arr, r => r.result === "Сдано"),
        avg: avg(arr.map(r => r.percent)),
        avgDur: (avg(arr.map(r => r.duration_sec)) / 60).toFixed(1),
    })).sort((a, b) => b.passRate - a.passRate);

    return (
        <div className="chart-card">
            <h3 className="chart-title">Статистика по факультетам</h3>
            <table className="data-table">
                <thead><tr><th>Факультет</th><th>Попыток</th><th>Сдаваемость</th><th>Ср. балл</th><th>Ср. время</th></tr></thead>
                <tbody>
                {data.map((d, i) => (
                    <tr key={d.name}>
                    <td><span className="rank-badge" style={{ background: COLORS[i % COLORS.length] }}>{i + 1}</span>{d.name}</td>
                    <td>{d.count}</td>
                    <td><span className="pct-bar"><span style={{ width: `${d.passRate}%`, background: d.passRate > 60 ? C.green : C.red }} />{d.passRate.toFixed(1)}%</span></td>
                    <td>{d.avg.toFixed(1)}%</td>
                    <td>{d.avgDur} мин</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default FacultyTable;