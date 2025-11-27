import React, { useState, useMemo } from "react";
import DistrictMultiBarChart from "./DistrictRankingChart";
import RankCard from "./DistrictRankCard";

const DistrictRanking = ({ seriesData, chartThemeOptions }) => {
    if (!seriesData || !seriesData.districts) return null;

    const [rankBy, setRankBy] = useState("enrollment");

    const sortedDistricts = useMemo(() => {
        const list = [...seriesData.districts];

        if (rankBy === "enrollment") {
            return list.sort((a, b) => b.enrolled - a.enrolled);
        }
        if (rankBy === "pass") {
            return list.sort((a, b) => b.passed - a.passed);
        }

        return list;
    }, [rankBy, seriesData]);

    console.log("sortedData ::",sortedDistricts);

    return (
        <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h6>District Ranking</h6>

                <select
                    value={rankBy}
                    onChange={(e) => setRankBy(e.target.value)}
                    style={{
                        backgroundColor: "var(--btn-bg)",
                        color: "var(--text-color)",
                        borderColor: "var(--border-color)",
                    }}
                >
                    <option value="enrollment">Rank by Enrollment</option>
                    <option value="pass">Rank by Pass %</option>
                </select>
            </div>

            {rankBy === "enrollment" ? (
                <>
                    <DistrictMultiBarChart
                        seriesData={{ districts: sortedDistricts }}
                        chartThemeOptions={chartThemeOptions}
                    />
                </>
            ) : (
                <>
                    <RankCard districts={sortedDistricts} />
                </>
            )}
        </div>
    );
};

export default DistrictRanking;
