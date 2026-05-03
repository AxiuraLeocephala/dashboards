import { CheckCheck, BadgeCheck, ChevronsDownUp, Timer } from "lucide-react";

import KPICard from "./kpiCard";
import pct from "./../utils/pct";
import avg from "./../utils/avg";
import "./../../styles/overviewKPIs.css";

const OverviewKPIs = ({ rows }) => {
    const total = rows.length;
    const passRate = pct(rows, r => r.result === "Сдано");
    const medianPct = [...rows].sort((a, b) => a.percent - b.percent)[Math.floor(total / 2)]?.percent ?? 0;
    const avgDur = avg(rows.map(r => r.duration_sec)) / 60;
    const avgScore = avg(rows.map(r => r.percent));
    return (
        <div className="kpi-row">
            <KPICard 
            icon={<CheckCheck />}
            title="Всего попыток" 
            value={total.toLocaleString()}
            />
            <KPICard 
            icon={<BadgeCheck />}
            title="Процент сдачи" 
            value={`${passRate.toFixed(1)}%`} 
            sub={`${rows.filter(r => r.result === "Сдано").length} из ${total}`}
            />
            <KPICard 
            icon={<ChevronsDownUp />} 
            title="Средний балл" 
            value={`${avgScore.toFixed(1)}%`} 
            sub={`Медиана: ${medianPct}%`}
            />
            <KPICard 
            icon={<Timer />} 
            title="Среднее время" 
            value={`${avgDur.toFixed(1)} мин`}
            />
        </div>
    );
}

export default OverviewKPIs;