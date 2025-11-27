import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DistrictMultiBarChart = ({ seriesData, chartThemeOptions }) => {
    if (!seriesData || !seriesData.districts) return null;

    const sortedDistricts = [...seriesData.districts].sort((a, b) => a.rank - b.rank);
    const districts = sortedDistricts.map(d => d.district);
    const ranks = sortedDistricts.map(d => d.rank);
    const maleRange = [];
    const femaleRange = [];
    const othersRange = [];
    const passedData = [];
    const assessmentData = [];

    sortedDistricts.forEach(d => {
        const m = d.male;
        const f = d.female;
        const o = d.others;

        maleRange.push([0, m]);
        femaleRange.push([m, m + f]);
        othersRange.push([m + f, m + f + o]);

        passedData.push(d.completionRatePercent ?? 0);
        assessmentData.push(
            d.enrolled && d.assessmentCompleted
                ? Math.round((d.assessmentCompleted / d.enrolled) * 100)
                : 0
        );
    });

    const data = {
        labels: districts,
        datasets: [
            {
                label: "Male",
                data: maleRange,
                backgroundColor: "#4DA3FF",
                stack: "stack1",
                yAxisID: "y",
            },
            {
                label: "Female",
                data: femaleRange,
                backgroundColor: "#FF4DB8",
                stack: "stack1",
                yAxisID: "y",
            },
            {
                label: "Others",
                data: othersRange,
                backgroundColor: "#C590FF",
                stack: "stack1",
                yAxisID: "y",
            },
            {
                label: "Passed",
                data: passedData,
                backgroundColor: "#4AC06A",
                stack: "stack2",
                yAxisID: "y1"
            },
            {
                label: "Assessment Completed",
                data: assessmentData,
                backgroundColor: "#FFB84D",
                stack: "stack3",
                yAxisID: "y1"
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                display:false,
            },
            legend: {
                position: "top",
                labels: {
                    color: chartThemeOptions.chart.foreColor
                }
            },
            tooltip: {
                callbacks: {
                    label: ctx => {
                        if (Array.isArray(ctx.raw)) {
                            const [start, end] = ctx.raw;
                            return `${ctx.dataset.label}: ${(end - start).toLocaleString()}`;
                        }
                        return `${ctx.dataset.label}: ${ctx.raw}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: false,
                categoryPercentage: 1,
                barPercentage: 1,
                title: {
                    display: true,
                    text: "Top 10 Districts",
                    color: chartThemeOptions.chart.foreColor
                },
                ticks: {
                    color: chartThemeOptions.chart.foreColor,
                    maxRotation: 45,
                    minRotation: 45,
                    align: 'right',
                    crossAlign: 'near',
                    callback: function (value, index) {
                        return `${districts[index]}\nRank - ${ranks[index]}`;
                    },
                },
                grid: {
                    display: false
                }
            },
            y: {
                stacked: false,
                title: {
                    display: true,
                    text: "Number of users",
                    color: chartThemeOptions.chart.foreColor
                },
                ticks: {
                    color: chartThemeOptions.chart.foreColor
                },
                grid: {
                    color: chartThemeOptions.chart.foreColor
                }
            },
            y1: {
                stacked: false,
                position: "right",
                title: {
                    display: true,
                    text: "Passcompletion %",
                    color: chartThemeOptions.chart.foreColor,
                    rotation: 270
                },
                ticks: {
                    color: chartThemeOptions.chart.foreColor,
                    callback: function (value) {
                        return value + "%";
                    }
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    return <Bar data={data} options={options} height={"100%"} />;
};

export default DistrictMultiBarChart;