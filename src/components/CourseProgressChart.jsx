import React from "react";
import Chart from "react-apexcharts";

const GroupedbarChart = ({ seriesData, chartThemeOptions }) => {
    console.log("seriesData ::",seriesData);
    const districts = seriesData?.map(item => item.district);
    const belowValues = seriesData?.map(item => item.below);
    const averageValues = seriesData?.map(item => item.average);
    const goodValues = seriesData?.map(item => item.good);

    const options = {
        chart: {
            ...chartThemeOptions.chart,
            type: "bar",
            height: "100%",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "40%",
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: districts,
            title: {
                text: "Districts",
                style: { fontSize: "14px", fontWeight: 600, color: chartThemeOptions.chart.foreColor },
            },
        },
        yaxis: {
            title: {
                text: "Course Progress %",
                style: { fontSize: "14px", fontWeight: 600, color: chartThemeOptions.chart.foreColor },
            },
            max: 100,
        },
        tooltip: {
            theme: chartThemeOptions.theme.mode,
            style: {
                fontSize: "13px",
                fontWeight: 600,
                color: chartThemeOptions.chart.foreColor,
            },
        },
        colors: ["#FF6B6B", "#4BCF91", "#6AB8FF"],
        legend: {
            show: true,
            position: "top",
            labels: { colors: chartThemeOptions.chart.foreColor },
        },
    };

    const series = [
        { name: "Below", data: belowValues },
        { name: "Average", data: averageValues },
        { name: "Good", data: goodValues },
    ];

    return (
        <div style={{ overflowX: "auto", paddingBottom: "20px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
            <div style={{ width: "1200px" }}>
                <Chart options={options} series={series} type="bar" height="250px" />
            </div>
        </div>
    );
};

export default GroupedbarChart;
