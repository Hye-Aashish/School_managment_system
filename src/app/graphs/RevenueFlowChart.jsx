"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function RevenueFlowChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const month = [
      "Jan", "Feb", "Mar", "April", "May", "Jun",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Light mode datasets (same as your code)
    const dataSetsLight = [
      {
        label: "My First Dataset",
        data: [1, 5, 2, 2, 6, 7, 8, 7, 3, 4, 1, 3],
        backgroundColor: [
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(250, 204, 21, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)"
        ],
        borderWidth: 0,
        borderRadius: 5,
      },
      {
        label: "My First Dataset 2",
        data: [5, 2, 4, 2, 5, 8, 3, 7, 3, 4, 1, 3],
        backgroundColor: [
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(255, 120, 75, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)"
        ],
        borderWidth: 0,
        borderRadius: 5,
      },
      {
        label: "My First Dataset 3",
        data: [2, 5, 3, 2, 5, 6, 9, 7, 3, 4, 1, 3],
        backgroundColor: [
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(74, 222, 128, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)",
          "rgba(237, 242, 247, 1)", "rgba(237, 242, 247, 1)"
        ],
        borderWidth: 0,
        borderRadius: 5,
      }
    ];

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: month,
        datasets: dataSetsLight,
      },
      options: {
        maintainAspectRatio: false,

        scales: {
          x: {
            stacked: true,
            grid: {
              color: "rgb(243, 246, 255)",
              drawBorder: false,
            },
            ticks: {
              color: "#6B7280",
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              color: "rgb(243, 246, 255)",
              drawBorder: false,
            },
            ticks: {
              callback: (value) => `${value}%`,
              color: "#6B7280",
            },
          },
        },

        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

  }, []);

  return (
    <div style={{ width: "100%", height: "255px" }}>
      <canvas ref={chartRef} id="revenueFlow" />
    </div>
  );
}
