"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function TotalGoalChart() {
     const chartRef = useRef(null);
     const chartInstance = useRef(null);

     useEffect(() => {
          if (chartInstance.current) {
               chartInstance.current.destroy();
          }

          const bitsMonth = [
               "Jan", "Feb", "Mar", "Afril", "May",
               "Jan", "Feb", "Mar", "Afril", "May",
               "Feb", "Mar", "Afril", "May",
          ];

          const bitsData = [0, 10, 0, 65, 0, 25, 0, 35, 20, 100, 40, 75, 50, 85, 60];

          const ctx = chartRef.current.getContext("2d");

          const gradient = ctx.createLinearGradient(0, 0, 0, 450);
          gradient.addColorStop(0, "rgba(15, 205, 225,0.41)");
          gradient.addColorStop(0.2, "rgba(255, 255, 255, 0)");

          chartInstance.current = new Chart(ctx, {
               type: "line",
               data: {
                    labels: bitsMonth,
                    datasets: [
                         {
                              label: "Visitor",
                              data: bitsData,
                              backgroundColor: gradient,
                              borderColor: "#0FCDE1",
                              pointRadius: 0,
                              borderWidth: 1,
                              fill: true,
                              tension: 0.4,
                         },
                    ],
               },
               options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                         x: {
                              grid: {
                                   display: false,
                                   drawBorder: false,
                              },
                              border: {
                                   display: false,
                              },
                              ticks: {
                                   display: false,
                              },
                         },
                         y: {
                              grid: {
                                   display: false,
                                   drawBorder: false,
                              },
                              border: {
                                   display: false,
                              },
                              ticks: {
                                   display: false,
                              },
                         },
                    },
                    plugins: {
                         legend: { display: false },
                         tooltip: { enabled: false },
                    },
               },
          });
     }, []);

     return (
          <div style={{ width: "100%", height: "65px" }}>
               <canvas ref={chartRef} id="totalGoal" />
          </div>
     );
}
