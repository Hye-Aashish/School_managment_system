"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart() {
     const chartRef = useRef(null);
     const chartInstance = useRef(null);

     useEffect(() => {

          if (chartInstance.current) {
               chartInstance.current.destroy();
          }

          const pieChart = chartRef.current.getContext("2d");

          const data = {
               labels: [10, 20, 30],
               datasets: [
                    {
                         label: "My First Dataset",
                         data: [15, 20, 35, 40],
                         backgroundColor: ["#1A202C", "#61C660", "#F8CC4B", "#EDF2F7"],
                         borderColor: ["#ffffff", "#ffffff", "#ffffff", "#1A202C"],
                         hoverOffset: 18,
                         borderWidth: 0,
                    },
               ],
          };

          // Custom plugin for labels inside slices
          const customDatalabels = {
               id: "customDatalabels",
               afterDatasetsDraw(chart) {
                    const { ctx, data } = chart;
                    ctx.save();

                    data.datasets[0].data.forEach((value, index) => {
                         const pos = chart.getDatasetMeta(0).data[index].tooltipPosition();

                         ctx.font = "bold 12px sans-serif";
                         ctx.fillStyle = data.datasets[0].borderColor[index];
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
                    layout: {
                         padding: {
                              left: 10,
                              right: 10,
                              top: 10,
                              bottom: 10,
                         },
                    },
                    plugins: {
                         legend: {
                              display: false,
                         },
                    },
               },
               plugins: [customDatalabels],
          });
     }, []);

     return (
          <div style={{ width: "230px", height: "168px" }}>
               <canvas ref={chartRef} id="pie_chart"></canvas>
          </div>
     );
}
