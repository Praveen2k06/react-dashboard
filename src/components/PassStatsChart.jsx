import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const StackedBarChart = ({ seriesData, chartThemeOptions }) => {
    const values = Object.values(seriesData || {});
    const labels = Object.keys(seriesData || {});

    const yAxisLabels = values.map((v) => (v > 1000 ? `${v.toLocaleString()}` : `${v} assessments taken`));

    const data = {
        labels,
        datasets: [
            {
                label: "Performance",
                data: values.map((v) => (v / 22500) * 100),
                backgroundColor: ["#76C6FF", "#54CCE2", "#4CCD9D", "#F38484"],
                borderRadius: 4,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.raw.toFixed(2)}%`;
                    },
                },
            },
            datalabels: {
                anchor: "center",
                align: "center",
                color: chartThemeOptions.chart.foreColor,
                font: { weight: "bold", size: 12 },
                formatter: function (value, context) {
                    return labels[context.dataIndex];
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index) {
                        return yAxisLabels[index];
                    },
                    color: chartThemeOptions.chart.foreColor,
                    font: { size: 14 },
                },
                title: {
                    display: true,
                    text: "Pass Percentage",
                    color: chartThemeOptions.chart.foreColor,
                    font: { size: 14 },
                },
                grid: { display: false },
            },
            x: {
                min: 0,
                max: 100,
                ticks: {
                    callback: (val) => `${val}%`,
                    color: chartThemeOptions.chart.foreColor,
                    font: { size: 14 },
                },
                title: {
                    display: true,
                    text: "Performance",
                    color: chartThemeOptions.chart.foreColor,
                    font: { size: 14 },
                },
                grid: { color: "white" },
                border: { color: "white" },
            },
        },
    };

    return <Bar data={data} options={options} height={150} />;
};

export default StackedBarChart;
