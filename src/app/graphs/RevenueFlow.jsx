"use client";

import { useEffect, useRef } from "react";
import {
     Chart,
     LineElement,
     PointElement,
     LineController,
     CategoryScale,
     LinearScale,
     Filler,
     Tooltip,
     Legend,
} from "chart.js";

Chart.register(
     LineElement,
     PointElement,
     LineController,
     CategoryScale,
     LinearScale,
     Filler,
     Tooltip,
     Legend
);

export default function TotalEarnChart() {
     const canvasRef = useRef(null);
     let chartInstance = useRef(null);

     useEffect(() => {
          const ctx = canvasRef.current.getContext("2d");

          const bitsMonth = [
               "Jan",
               "Feb",
               "Mar",
               "Afril",
               "May",
               "Jan",
               "Feb",
               "Mar",
               "Afril",
               "May",
               "Feb",
               "Mar",
               "Afril",
               "May",
          ];

          const bitsData = [
               0, 10, 0, 65, 0, 25, 0, 35, 20, 100, 40, 75, 50, 85, 60,
          ];

          // Gradient same as your code
          const gradient = ctx.createLinearGradient(0, 0, 0, 450);
          gradient.addColorStop(0, "rgba(15, 205, 225,0.41)");
          gradient.addColorStop(0.2, "rgba(255, 255, 255, 0)");

          // Destroy old chart
          if (chartInstance.current) {
               chartInstance.current.destroy();
          }
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
                              pointBackgroundColor: "#fff",
                              pointBorderColor: "#0FCDE1",
                              borderWidth: 1,
                              fill: true,
                              tension: 0.4,
                         },
                    ],
               },
               options: {
                    layout: {
                         padding: {
                              bottom: -20,
                         },
                    },
                    maintainAspectRatio: false,
                    responsive: true,
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
                         legend: {
                              position: "top",
                              display: false,
                         },
                         title: {
                              display: false,
                              text: "Visitor: 2k",
                         },
                         tooltip: {
                              enabled: false,
                         },
                    },
               },
          });

          return () => chartInstance.current?.destroy();
     }, []);

     return (
          <div className="w-full h-[68px]">
               <canvas id="totalEarn" ref={canvasRef}></canvas>
          </div>
     );
}
