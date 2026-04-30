import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import templateFile from "./../data/Moodle_MARGU_analytics_template.xlsx";
import AverageAcademicPerformance from "./Charts/averageAcademicPerformance";
import SuccessRate from "./Charts/successRate";
import "./../styles/dashboards.css";

const palette = ["#6366f1", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

const Dashboards = ({ file }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        try {
            const parseFile = async () => {
                const arrayBuffer = file ? await file.arrayBuffer() : await templateFile.arrayBuffer()
                
                const workbook = XLSX.read(arrayBuffer, { type: "array" });
                if (!workbook.SheetNames[0]) throw new Error("В файле не найдено ни одного листа.");

                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(sheet);
                setRows(json);
            };

            parseFile();
            setLoading(false);
        } catch (e) {
            setError("Не удалось прочитать XLSX. Проверьте файл и попробуйте снова.");
        } finally {
            setLoading(false);
        }
            
    }, [file]);

    const dashboardData = useMemo(() => {
        if (!rows.length) {
            return null;
        }

        const columns = Object.keys(rows[0] ?? {});
        const numericColumns = columns.filter(column => 
            rows.some(row => 
                typeof row[column] === "number" && Number.isFinite(row[column]
                ))
            );

        const categoryColumn = columns.find(column => 
            rows.some(row => 
                typeof row[column] === "string" && row[column].trim().length > 0
            )
        ) ?? columns[0];

        const metricColumn = numericColumns[0];

        const totalRecords = rows.length;
        const totalValue = metricColumn ? rows.reduce((acc, row) => 
            acc + (Number.isFinite(row[metricColumn]) ? row[metricColumn] : 0), 0) : 0;

        const grouped = rows.reduce((acc, row) => {
            const category = String(row[categoryColumn] || "Без категории");
            const value = metricColumn && Number.isFinite(row[metricColumn]) ? row[metricColumn] : 1;
            acc[category] = (acc[category] || 0) + value;
            return acc;
        }, {});

        const topCategories = Object.entries(grouped)
        .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

        return {
            columns,
            metricColumn,
            totalRecords,
            totalValue: Number(totalValue.toFixed(2)),
            topCategories,
        };
    }, [rows]);

    if (loading) return <p className="dashboards-state">Загружаем и анализируем данные...</p>;
    if (error) return <p className="dashboards-state dashboards-error">{error}</p>;
    if (!dashboardData) return <p className="dashboards-state">В таблице нет данных для визуализации.</p>;

    return (
        <section className="dashboards">
            <header className="dashboards-header">
                <h1>Дашборд по XLSX данным</h1>
                <p>Источник: {file ? file.name : "Moodle_MARGU_analytics_template.xlsx"}</p>
            </header>

            <section>
            </section>

            <div className="kpi-grid">
                <article className="kpi-card">
                    <AverageAcademicPerformance rows={rows}/>
                </article>
                <article className="kpi-card">
                    <h3>Колонок</h3>
                    <p>{dashboardData.columns.length}</p>
                </article>
                <article className="kpi-card">
                    <h3>Сумма по метрике</h3>
                    <p>{dashboardData.totalValue}</p>
                    <small>
                        {dashboardData.metricColumn ? `Поле: ${dashboardData.metricColumn}` : "Метрика не найдена"}
                    </small>
                </article>
            </div>

            <div className="charts-grid">
                <article className="chart-card">
                    <h3>Топ категорий (Bar)</h3>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={dashboardData.topCategories}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </article>

                <article className="chart-card">
                    <h3>Доля успешных попыток</h3>
                    <SuccessRate rows={rows}/>
                </article>
            </div>
        </section>
    );
};

export default Dashboards;
