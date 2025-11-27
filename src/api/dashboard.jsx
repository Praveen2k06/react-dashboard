import { useEffect, useState } from "react";

const useDashboardData = (year) => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        if (!year) return;

        fetch(`/data/dashboard_${year}.json`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`File not found: dashboard_${year}.json`);
                }
                return res.json();
            })
            .then(data => setDashboardData(data))
            .catch(err => console.error("Error fetching dashboard:", err));
    }, [year]);

    return dashboardData;
};

export default useDashboardData;
