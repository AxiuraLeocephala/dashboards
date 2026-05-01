import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import templateFile from "./../data/Moodle_MARGU_analytics_template.xlsx";
import AverageAcademicPerformance from "./Charts/averageAcademicPerformance";
import PassRateChart from "./Charts/passRateChart";
import AverageDuration from "./Charts/averageDuration";
import FacultyRating from "./Charts/facultyRationg";
import FacultySuccessRate from "./Charts/facultySuccessRate";
import HardestCourses from "./Charts/hardestCourses";
import EasiestCourses from "./Charts/easiestCoursees";
import MonthlyResults from "./Charts/monthlyResults";
import SuccessTrend from "./Charts/successTrend";
import TimeDistribution from "./Charts/timeDistribution";
import TimeResultDependency from "./Charts/timeResultDependency";
import "./../styles/dashboards.css";

const Dashboards = ({ file }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeDashboard, setActiveDashboard] = useState("main");

    useEffect(() => {
        const parseFile = async () => {
            setLoading(true);
            setError("");

            try {
                const arrayBuffer = file ? await file.arrayBuffer() : await templateFile.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: "array" });

                if (!workbook.SheetNames[0]) throw new Error("В файле не найдено ни одного листа.");

                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(sheet);
                setRows(json);
            } catch {
                setError("Не удалось прочитать XLSX. Проверьте файл и попробуйте снова.");
            } finally {
                setLoading(false);
            }
        };

        parseFile();
    }, [file]);

    const metrics = useMemo(() => {
        if (!rows.length) return null;

        const parseDate = (value) => {
            if (!value) return null;
            if (value instanceof Date) return value;
            if (typeof value === "number") return new Date(Math.round((value - 25569) * 86400 * 1000));
            return null;
        };

        const attemptsByStudent = {};
        const byFaculty = {};
        const riskGroups = {};

        let passCount = 0;
        let totalPercent = 0;
        let totalDuration = 0;
        let validPercent = 0;
        let validDuration = 0;

        rows.forEach((r) => {
            const sid = r.student_id;
            const grp = r.group || "Не указана";
            const faculty = r.faculty || "Не указан";
            const result = r.result;
            const percent = Number(r.percent);
            const durationSec = Number(r.duration_sec);

            attemptsByStudent[sid] = (attemptsByStudent[sid] || 0) + 1;
            riskGroups[grp] = riskGroups[grp] || { total: 0, failed: 0 };
            byFaculty[faculty] = byFaculty[faculty] || { total: 0, passed: 0, percentSum: 0, valid: 0 };

            riskGroups[grp].total += 1;
            byFaculty[faculty].total += 1;

            if (result === "Сдано") {
                passCount += 1;
                byFaculty[faculty].passed += 1;
            } else {
                riskGroups[grp].failed += 1;
            }

            if (!Number.isNaN(percent)) {
                totalPercent += percent;
                validPercent += 1;
                byFaculty[faculty].percentSum += percent;
                byFaculty[faculty].valid += 1;
            }

            if (!Number.isNaN(durationSec)) {
                totalDuration += durationSec;
                validDuration += 1;
            }
        });

        const uniqueStudents = Object.keys(attemptsByStudent).length;
        const retries = Object.values(attemptsByStudent).filter((n) => n > 1).length;
        const avgAttempts = uniqueStudents ? rows.length / uniqueStudents : 0;
        const passRate = rows.length ? (passCount / rows.length) * 100 : 0;
        const avgPercent = validPercent ? totalPercent / validPercent : 0;
        const avgDurationMin = validDuration ? totalDuration / validDuration / 60 : 0;

        const topFaculty = Object.entries(byFaculty)
            .map(([name, val]) => ({ name, passRate: (val.passed / val.total) * 100, avg: val.valid ? val.percentSum / val.valid : 0 }))
            .sort((a, b) => b.passRate - a.passRate)
            .slice(0, 5);

        const riskyGroups = Object.entries(riskGroups)
            .filter(([, val]) => val.total >= 5)
            .map(([name, val]) => ({ name, failRate: (val.failed / val.total) * 100, total: val.total }))
            .sort((a, b) => b.failRate - a.failRate)
            .slice(0, 5);

        const dates = rows.map((r) => parseDate(r.start_time)).filter(Boolean);
        const minDate = dates.length ? new Date(Math.min(...dates)) : null;
        const maxDate = dates.length ? new Date(Math.max(...dates)) : null;

        return {
            totalAttempts: rows.length,
            uniqueStudents,
            retries,
            avgAttempts,
            passRate,
            avgPercent,
            avgDurationMin,
            topFaculty,
            riskyGroups,
            period: minDate && maxDate ? `${minDate.toLocaleDateString("ru-RU")} — ${maxDate.toLocaleDateString("ru-RU")}` : "—",
        };
    }, [rows]);

    if (loading) return <p className="dashboards-state">Загружаем и анализируем данные...</p>;
    if (error) return <p className="dashboards-state dashboards-error">{error}</p>;
    if (!metrics) return <p className="dashboards-state">В таблице нет данных для визуализации.</p>;

    return (
        <section className="dashboards dashboards-theme">
            <header className="dashboards-header">
                <h1>Аналитика тестирования Moodle</h1>
                <p>Период данных: {metrics.period} · Источник: {file ? file.name : "Moodle_MARGU_analytics_template.xlsx"}</p>
            </header>

            <div className="dashboard-tabs">
                <button className={activeDashboard === "main" ? "active" : ""} onClick={() => setActiveDashboard("main")}>Основной</button>
                <button className={activeDashboard === "performance" ? "active" : ""} onClick={() => setActiveDashboard("performance")}>Успеваемость</button>
                <button className={activeDashboard === "behavior" ? "active" : ""} onClick={() => setActiveDashboard("behavior")}>Поведение и риск</button>
            </div>

            {activeDashboard === "main" && (
                <>
                    <div className="kpi-grid">
                        <article className="kpi-card"><h3>Всего попыток</h3><p>{metrics.totalAttempts}</p></article>
                        <article className="kpi-card"><h3>Уникальных студентов</h3><p>{metrics.uniqueStudents}</p></article>
                        <article className="kpi-card"><h3>Доля успешных сдач</h3><p>{metrics.passRate.toFixed(1)}%</p></article>
                        <article className="kpi-card"><h3>Средний балл</h3><p>{metrics.avgPercent.toFixed(1)}%</p></article>
                        <article className="kpi-card"><h3>Средняя длительность</h3><p>{metrics.avgDurationMin.toFixed(1)} мин</p></article>
                        <article className="kpi-card"><h3>Студенты с пересдачами</h3><p>{metrics.retries} <small>({(metrics.avgAttempts).toFixed(2)} попытки/студ.)</small></p></article>
                    </div>
                    <div className="charts-grid">
                        <article className="chart-card"><MonthlyResults rows={rows} /></article>
                        <article className="chart-card"><SuccessTrend rows={rows} /></article>
                    </div>
                </>
            )}

            {activeDashboard === "performance" && (
                <>
                    <div className="kpi-grid">
                        <article className="kpi-card"><AverageAcademicPerformance rows={rows} /></article>
                        <article className="kpi-card"><PassRateChart rows={rows} /></article>
                        <article className="kpi-card"><AverageDuration rows={rows} /></article>
                    </div>
                    <div className="charts-grid">
                        <article className="chart-card"><FacultyRating rows={rows} /></article>
                        <article className="chart-card"><FacultySuccessRate rows={rows} /></article>
                        <article className="chart-card"><EasiestCourses rows={rows} /></article>
                        <article className="chart-card"><HardestCourses rows={rows} /></article>
                    </div>
                </>
            )}

            {activeDashboard === "behavior" && (
                <>
                    <div className="charts-grid">
                        <article className="chart-card"><TimeDistribution rows={rows} /></article>
                        <article className="chart-card"><TimeResultDependency rows={rows} /></article>
                    </div>
                    <div className="tables-grid">
                        <article className="chart-card">
                            <h3>Топ факультетов по успешности</h3>
                            {metrics.topFaculty.map((f) => <p className="stats-row" key={f.name}><span>{f.name}</span><span>{f.passRate.toFixed(1)}% · ср. балл {f.avg.toFixed(1)}%</span></p>)}
                        </article>
                        <article className="chart-card">
                            <h3>Группы риска по доле несдач</h3>
                            {metrics.riskyGroups.map((g) => <p className="stats-row" key={g.name}><span>{g.name}</span><span>{g.failRate.toFixed(1)}% несдач · {g.total} попыток</span></p>)}
                        </article>
                    </div>
                </>
            )}
        </section>
    );
};

export default Dashboards;
