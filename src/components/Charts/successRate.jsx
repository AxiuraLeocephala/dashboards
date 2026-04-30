import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./../../styles/successRate.css";

const SuccessRate = ({ rows }) => {
    const { successCount, failCount, rate } = useMemo(() => {
        if (!rows.length) return { successCount: 0, failCount: 0, rate: 0 };

        const successValues = new Set(["Cдано", "Не сдано", "1", 1, true]);

        let successCount = 0;
        let failCount = 0;

        rows.forEach((r) => {
            const res = r.result;
            if (successValues.has(res)) successCount++;
            else failCount++;
        });

        const total = successCount + failCount;
        const rate = total ? (successCount / total) * 100 : 0;

        return { successCount, failCount, rate };
    }, [rows]);

    const data = [
        { name: "Успешно", value: successCount },
        { name: "Неуспешно", value: failCount }
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className="scr-container">
            <div className="scr-chart">
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="scr-center-label">
                <div className="scr-value">{rate.toFixed(1)}%</div>
                <div className="scr-subtitle">успешность</div>
            </div>
        </div>
    );
}

export default SuccessRate