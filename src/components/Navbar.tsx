import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;