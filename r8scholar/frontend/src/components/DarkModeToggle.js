import React from "react";
import { MdBrightnessMedium } from "react-icons/md";
import "../style.css";

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    }, []);

    React.useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        darkMode ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    }, [darkMode]);

    return (
        <div className="darkmode-toggle">
            <MdBrightnessMedium id="darkmode-toggle" size="20px" onClick={() => setDarkMode(!darkMode)} />
        </div>
    );
}
