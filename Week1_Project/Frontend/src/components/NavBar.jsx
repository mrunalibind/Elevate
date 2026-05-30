import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';

function NavBar({ savedCount }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar navbar-${theme}`}>
      <div className="nav-brand">FitLibrary</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/workouts">Workouts</NavLink>
        </li>
        <li>
          <NavLink to="/saved">Saved</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/chat">Chat</NavLink>
        </li>
      </ul>
      <div className="nav-actions">
        <span className="saved-pill">Saved {savedCount}</span>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
