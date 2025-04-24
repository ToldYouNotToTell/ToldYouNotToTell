import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <i className={`fas ${theme === "dark" ? "fa-moon" : "fa-sun"}`}></i>
    </button>
  );
};