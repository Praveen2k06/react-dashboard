import React, { useState} from "react";
import "./App.css";
import StackedBarChart from "./components/PassStatsChart";
import DonutChart from "./components/AssessmentDonut";
import PieChart from "./components/GradeBreakdownPie";
import SummaryCards from "./components/SummaryCards";
import SwitchToggle from "./components/ToggleSwitch/switchToggle";
import {useTheme} from "./theme/ThemeProvider";
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";
import useDashboardData from "./api/dashboard";
import GroupedbarChart from "./components/CourseProgressChart";
import {FaCalendarAlt} from "react-icons/fa";
import {districts, monthRanges, quarterRanges} from "./components/configs/dashboard-configs";
import DistrictRanking from "./components/DistrictRanking";


const App = () => {
    const { theme, toggleTheme, chartThemeOptions } = useTheme();
    const [selectedDistrict, setSelectedDistrict] = useState("All District");
    const [period, setPeriod] = useState("monthly");
    const [index, setIndex] = useState(0);
    const ranges = period === "monthly" ? monthRanges : quarterRanges;
    const [year, setYear] = useState("2024");

    const dashboardData = useDashboardData(year);

    if (!dashboardData) return null;

    const handlePrevious = () => {
        if (index > 0) setIndex(index - 1);
    };

    const handleNext = () => {
        if (index < ranges.length - 1) setIndex(index + 1);
    };

    const handleChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const filterByDistrictData = (data, key = null) => {
        if (selectedDistrict === "All District" || !data) return data;

        if (Array.isArray(data)) {
            return data.filter(d => d.district === selectedDistrict);
        }

        if (key && Array.isArray(data[key])) {
            return { ...data, [key]: data[key].filter(d => d.district === selectedDistrict) };
        }
        return data;
    };

    return (
        <div className="container-fluid p-3 w-100" style={{minHeight: "100vh"}}>
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2">
                <h3>Dashboard</h3>

                <div className="d-flex gap-2">
                    <select
                        className="form-select form-select-sm border"
                        style={{
                            backgroundColor: "var(--btn-bg)",
                            color: "var(--text-color)",
                            borderColor: "var(--border-color)",
                        }}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>

                    <SwitchToggle toggleTheme={toggleTheme} theme={theme}/>

                    <div className="d-flex gap-2 align-items-center">
                        <BiLeftArrow style={{ cursor: "pointer" }} onClick={handlePrevious}/>
                        <button
                            className={`btn border btn-sm period-btn ${period === "monthly" ? "active" : ""}`}
                            style={{
                                backgroundColor: period === "monthly" ? "var(--highlight-bg)" : "var(--btn-bg)",
                                color: "var(--text-color)",
                                borderColor: "var(--border-color)",
                            }}
                            onClick={() => setPeriod("monthly")}
                        >
                            Monthly
                        </button>

                        <button
                            className={`btn border btn-sm period-btn ${period === "quarterly" ? "active" : ""}`}
                            style={{
                                backgroundColor: period === "quarterly" ? "var(--highlight-bg)" : "var(--btn-bg)",
                                color: "var(--text-color)",
                                borderColor: "var(--border-color)",
                            }}
                            onClick={() => setPeriod("quarterly")}
                        >
                            Quarterly
                        </button>
                        <BiRightArrow style={{ cursor: "pointer" }} onClick={handleNext}/>
                    </div>

                    <label className="text-nowrap text-center d-flex align-items-center gap-3 p-2 border rounded"
                           style={{
                               backgroundColor: "var(--btn-bg)",
                               color: "var(--text-color)",
                               borderColor: "var(--border-color)",
                           }}
                    >
                        <FaCalendarAlt /> {ranges[index]?.start} - {ranges[index]?.end}
                    </label>

                    <select
                        className="form-select form-select-sm border"
                        style={{
                            backgroundColor: "var(--btn-bg)",
                            color: "var(--text-color)",
                            borderColor: "var(--border-color)",
                        }}
                        value={selectedDistrict}
                        onChange={handleChange}
                    >
                        {districts.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <SummaryCards data={dashboardData?.summary}/>

            {/* Charts Section */}
            <div className="row g-3">
                <div className="col-lg-7 col-md-12">
                    <div className="p-3 border rounded" style={{height:"300px"}}>
                        <h6 className="fw-bold">Course Progress Rate</h6>
                        <GroupedbarChart
                            seriesData={filterByDistrictData(dashboardData?.courseProgress)}
                            chartThemeOptions={chartThemeOptions}
                        />
                    </div>
                </div>

                <div className="col-lg-5 col-md-12">
                    <div className="p-3 border rounded" style={{height:"300px"}}>
                        <h6 className="fw-bold">Performance Overview</h6>
                        <StackedBarChart
                            seriesData={dashboardData?.passStats}
                            chartThemeOptions={chartThemeOptions}
                        />
                    </div>
                </div>

                <div className="col-lg-5 col-md-12">
                    <div className="p-3 border rounded">
                        <h6 className="fw-bold">Average Assessment Score</h6>
                        <DonutChart
                            seriesData={dashboardData?.assessmentCompletion}
                            chartThemeOptions={chartThemeOptions}
                        />
                    </div>
                </div>

                <div className="col-lg-7 col-md-12">
                    <div className="p-3 border rounded">
                        <h6 className="fw-bold">Learner Details Breakdown</h6>
                        <PieChart
                            seriesData={dashboardData?.gradeBreakdown}
                            chartThemeOptions={chartThemeOptions}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-3 p-3 border rounded">
                <DistrictRanking
                    seriesData={filterByDistrictData(dashboardData?.districtRanking, "districts")}
                    chartThemeOptions={chartThemeOptions}
                />
            </div>
        </div>
    );
};
export default App;