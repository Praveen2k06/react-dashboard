import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({seriesData,chartThemeOptions}) => {
    console.log("ssssss ::",seriesData)
    const series = seriesData?.map(item => item.percent);
    const labels = seriesData?.map(item => item.label);

    const options = {
        chart: {
            ...chartThemeOptions.chart,
            type: "pie",
            width: "100%",
            toolbar: { show: false },
        },
        colors: ["#6BC6FF", "#00C9A7", "#FFC285", "#FF9CA1", "#DDE8FF"],
        labels: labels,
        legend: { position: "right" },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: { width: 300 },
                    legend: { position: "bottom" },
                },
            },
        ],
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return series[opts.seriesIndex] + "%";
            },
            style: {
                fontSize: "14px",
                fontWeight: "600",
                colors: ["#fff"],
            },
        },
    };

    return <Chart options={options} series={series} type="pie" height={"100%"} />;
};

export default PieChart;
