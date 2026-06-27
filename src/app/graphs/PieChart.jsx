"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart({ active = 60, disabled = 20, admissions = 20 }) {
     const chartRef = useRef(null);
     const chartInstance = useRef(null);

     useEffect(() => {
          if (chartInstance.current) {
               chartInstance.current.destroy();
          }
          if (!chartRef.current) return;
          const pieChart = chartRef.current.getContext("2d");

          const data = {
               labels: ["Active", "Disabled", "Admissions", "Other"],
               datasets: [
                    {
                         label: "Student Breakdown",
                         data: [active, disabled, admissions, Math.max(0, 100 - (active + disabled + admissions))],
                         backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#64748b"],
                         borderColor: "#ffffff",
                         hoverOffset: 18,
                         borderWidth: 4,
                    },
               ],
          };

          const customDatalabels = {
               id: "customDatalabels",
               afterDatasetsDraw(chart) {
                    const { ctx, data } = chart;
                    ctx.save();
                    data.datasets[0].data.forEach((value, index) => {
                         if (value <= 0) return;
                         const pos = chart.getDatasetMeta(0).data[index].tooltipPosition();
                         ctx.font = "bold 10px sans-serif";
                         ctx.fillStyle = "#1A202C";
                         ctx.textAlign = "center";
                         ctx.textBaseline = "middle";
                         ctx.fillText(`${value}%`, pos.x, pos.y);
                    });
               },
          };

          chartInstance.current = new Chart(pieChart, {
               type: "doughnut",
               data,
               options: {
                    maintainAspectRatio: false,
                    layout: { padding: 10 },
                    plugins: { legend: { display: false } },
               },
               plugins: [customDatalabels],
          });
     }, [active, disabled, admissions]);

     return (
          <div className="w-full h-full">
               <canvas ref={chartRef} id="pie_chart"></canvas>
          </div>
     );
}
