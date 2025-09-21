import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Aura Cycle</Link>
        <div className="navbar-links">
          <NavLink
            to="/self-care"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
          >
            Self-Care
          </NavLink>
          <NavLink
            to="/hygiene"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
          >
            Hygiene
          </NavLink>
          <NavLink
            to="/knowledge"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
          >
            Knowledge
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
          >
            Profile
          </NavLink>
          {onLogout && (
            <button className="navbar-logout" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
