import { NavLink } from "react-router-dom";
import "./navbar.css";
import ColorModeSwitch from "../../theme/themeToggle";
import {  useState,useEffect, } from "react";

export default function navbar() {
  const storedMode = localStorage.getItem("mode");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [darkMode, setDarkMode] = useState(storedMode === "dark");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("mode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
    return (
    <header>
      <nav>
        <div className="logo-container"></div>
        <div className="container__navLink">
          <NavLink to="/Homepage">Homepage</NavLink>
          <NavLink to="BMI">BMI</NavLink>
          <NavLink to="about">Calories</NavLink>
          <NavLink to="recipes">Recipes</NavLink>

          <ColorModeSwitch darkMode={darkMode} toggleMode={toggleMode} />
        </div>
      </nav>
    </header>
  );
}


