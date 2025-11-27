import React from "react";
import Chart from "react-apexcharts";

const DonutChart = ({seriesData,chartThemeOptions}) => {
    const series = Object.values(seriesData || {});

    const options = {
        chart: {
            ...chartThemeOptions.chart,
            type: "donut",
            width: "100%",
            toolbar: { show: false },
        },
        labels: ["Assessment Completed", "Assessment Not Completed"],
        colors: ["#00C4FF", "#FF9D6C"],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#fff",
                            formatter: () => "All Districts",
                        },
                        value: {
                            show: true,
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#fff",
                            formatter: function (val, opts) {
                                const total = opts.w?.globals?.seriesTotals.reduce((a, b) => a + b, 0);
                                return total;
                            },
                        },
                        total: {
                            show: true,
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                const percent = ((opts.w.globals.series[opts.seriesIndex] / total) * 100).toFixed(1);
                return `${percent}%`;
            },
            style: {
                fontSize: "14px",
                fontWeight: "600",
                colors: ["#fff"],
            },
        },
        fill: { type: "gradient" },
        legend: { show: false },
    };

    return <Chart options={options} series={series} type="donut" height={"100%"} />;
};

export default DonutChart;