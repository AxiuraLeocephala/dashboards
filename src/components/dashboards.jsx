import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { History, BookOpenCheck, Grid2x2Check, Users, ChartBar } from "lucide-react";

import templateFile from "./../data/Moodle_MARGU_analytics_template.xlsx";
import OverviewKPIs from "./Chart/overviewKPIs";
import MonthlyActivity from "./Chart/monthlyActivity";
import PassFailPie from "./Chart/passFailPie";
import FacultyRating from "./Chart/facultyRating";
import FacultyTable from "./Chart/facultyTable";
import Top10Groups from "./Chart/top10Groups";
import GroupComparison from "./Chart/groupComparison";
import GroupDynamics from "./Chart/groupDynamics";
import QuizDifficultyRating from "./Chart/quizDifficultyRating"
import TopCoursesByScore from "./Chart/topCoursesByScore";
import AttemptsPerQuiz from "./Chart/attemptsPerQuiz";
import PassRateByAttempt from "./Chart/passRateByAttempt";
import FirstAttemptDistribution from "./Chart/firstAttemptDistribution";
import ScoreImprovement from "./Chart/scoreImprovement";
import TimeScoreCorrelation from "./Chart/timeScoreCorrelation";
import DurationHistogram from "./Chart/durationHistogram";
import AvgDurationByQuiz from "./Chart/avgDurationByQuiz";
import SeasonalityChart from "./Chart/seasonalityChart";
import TopStudentsByAttempts from "./Chart/topStudentsByAttempts";
import TopStudentsByScore from "./Chart/topStudentsByScore";
import "./../styles/dashboards.css";

const Dashboards = ({ file }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const TABS = [
        { id: "overview", icon: <ChartBar />, label: `Общие KPI` },
        { id: "faculty", icon: <Users />, label: "Факультеты и группы" },
        { id: "courses", icon: <BookOpenCheck />, label: "Курсы и тесты" },
        { id: "attempts", icon: <Grid2x2Check />, label: "Анализ попыток" },
        { id: "time", icon: <History/>, label: `Время и студенты` },
    ];
    const [tab, setTab] = useState(TABS[0].id);
    const C = {
        blue: "#3b82f6", cyan: "#06b6d4", green: "#10b981", amber: "#f59e0b",
        red: "#ef4444", purple: "#8b5cf6", pink: "#ec4899", indigo: "#6366f1",
        teal: "#14b8a6", orange: "#f97316",
    };
    const COLORS = Object.values(C);

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

    if (loading) return <p className="dashboards-state">Загружаем и анализируем данные...</p>;
    if (error) return <p className="dashboards-state dashboards-error">{error}</p>;

    return (
        <section className="dashboards dashboards-theme">
            <header className="app-header">
                <div className="header-inner">
                    <div className="header-brand">
                        {/* <span className="brand-icon">📈</span> */}
                        <div>
                            <h1>Аналитика тестирования</h1>
                            <p>Moodle МAРГУ · 2025 · {rows.length} записей</p>
                        </div>
                    </div>
                    <div className="header-meta">
                        <span className="meta-tag">
                            {rows.filter(r => r.result === "Сдано").length} сдали
                        </span>
                        <span className="meta-tag danger">
                            {rows.filter(r => r.result === "Не сдано").length} не сдали
                        </span>
                    </div>
                </div>
            </header>
            
            <div className="dashboard-parent">
            <nav className="tab-bar">
                {TABS.map(t => (
                    <button 
                    key={t.id} 
                    className={`tab-btn${tab === t.id ? " active" : ""}`} 
                    onClick={() => setTab(t.id)}
                    >
                        {t.icon}{t.label}
                    </button>
                ))}
            </nav>

            <div className="dashboard-main">
                {tab === "overview" && (
                    <>
                        <OverviewKPIs rows={rows}/>
                        <div className="grid-2">
                            <MonthlyActivity rows={rows} C={C}/>
                            <PassFailPie rows={rows} C={C}/>
                        </div>
                    </>
                )}

                {tab === "faculty" && (
                    <>
                        <FacultyRating rows={rows} C={C}/>
                        <div className="grid-2">
                            <FacultyTable rows={rows} C={C} COLORS={COLORS}/>
                            <Top10Groups rows={rows} C={C}/>
                        </div>
                        <div className="grid-2">
                            <GroupComparison rows={rows} C={C}/>
                            <GroupDynamics rows={rows}  C={C}/>
                        </div>
                    </>
                )}

                {tab === "courses" && (
                    <>
                        <div className="grid-2">
                            <QuizDifficultyRating rows={rows} C={C}/>
                            <TopCoursesByScore rows={rows} COLORS={COLORS}/>
                        </div>
                        <AttemptsPerQuiz rows={rows} C={C}/>
                    </>
                )}

                {tab === "attempts" && (
                    <>
                        <div className="grid-2">
                            <PassRateByAttempt rows={rows} C={C}/>
                            <FirstAttemptDistribution rows={rows} C={C}/>
                        </div>
                        <ScoreImprovement rows={rows} C={C} COLORS={COLORS}/>
                    </>
                )}

                {tab === "time" && (
                    <>
                        <div className="grid-2">
                            <TimeScoreCorrelation rows={rows} C={C}/>
                            <DurationHistogram rows={rows} C={C}/>
                        </div>
                        <div className="grid-2">
                            <AvgDurationByQuiz rows={rows} C={C}/>
                            <SeasonalityChart rows={rows} C={C}/>
                        </div>
                        <div className="grid-2">
                            <TopStudentsByAttempts rows={rows} C={C} COLORS={COLORS}/>
                            <TopStudentsByScore rows={rows} C={C} COLORS={COLORS}/>
                        </div>
                    </>
                )}
            </div>
            </div>
        </section>
    );
};

export default Dashboards;
