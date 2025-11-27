import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme;
        return "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const chartThemeOptions = {
        theme: { mode: theme },
        chart: {
            foreColor: theme === "dark" ? "#ffffff" : "#1f1f1f",
            toolbar: { show: false },
        },
        tooltip: { theme },
        xaxis: { labels: { style: { colors: theme === "dark" ? "#ffffff" : "#1f1f1f" }}},
        yaxis: { labels: { style: { colors: theme === "dark" ? "#ffffff" : "#1f1f1f" }}},
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, chartThemeOptions }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
