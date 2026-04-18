"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function RevenueFlowChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let incomeData = [1, 5, 2, 2, 6, 7, 8, 7, 3, 4, 1, 3];
      let expenseData = [5, 2, 4, 2, 5, 8, 3, 7, 3, 4, 1, 3];

      try {
        const res = await fetch("/api/stats/monthly");
        if (res.ok) {
          const stats = await res.json();
          if (stats.income.some(v => v > 0) || stats.expense.some(v => v > 0)) {
            incomeData = stats.income;
            expenseData = stats.expense;
          }
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const month = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const dataSetsLight = [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: incomeData.map((_, i) => i === new Date().getMonth() ? "rgba(16, 185, 129, 1)" : "rgba(16, 185, 129, 0.1)"),
          hoverBackgroundColor: "rgba(16, 185, 129, 0.8)",
          borderWidth: 0,
          borderRadius: 8,
          barPercentage: 0.6,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: expenseData.map((_, i) => i === new Date().getMonth() ? "rgba(244, 63, 94, 1)" : "rgba(244, 63, 94, 0.1)"),
          hoverBackgroundColor: "rgba(244, 63, 94, 0.8)",
          borderWidth: 0,
          borderRadius: 8,
          barPercentage: 0.6,
        }
      ];
      if (!chartRef.current) return;
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
              stacked: false,
              grid: { color: "rgb(243, 246, 255)", drawBorder: false },
              ticks: { color: "#6B7280" },
            },
            y: {
              beginAtZero: true,
              grid: { color: "rgb(243, 246, 255)", drawBorder: false },
              ticks: {
                callback: (value) => `$${value}`,
                color: "#6B7280",
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: "255px" }}>
      <canvas ref={chartRef} id="revenueFlow" />
    </div>
  );
}
