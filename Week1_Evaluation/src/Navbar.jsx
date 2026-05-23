import React from 'react'
import { useTheme } from './ThemeContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#8b9092",
        color: theme === "light" ? "#c6c6c6" : "#f0f0f0"
    }}>
        <div style={{
            display: "flex",
            gap: "20px"
        }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/saved">Saved Courses</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
        <button style={{
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer"
        }} onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
    </nav>
  )
}

export default Navbar