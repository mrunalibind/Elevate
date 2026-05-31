import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">CourseHub</div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;