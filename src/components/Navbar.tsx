import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Aura Cycle</Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/self-care"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Self-Care
          </NavLink>
          <NavLink
            to="/hygiene"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Hygiene
          </NavLink>
          <NavLink
            to="/knowledge"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Knowledge
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Community
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </NavLink>
          {onLogout && (
            <button className="navbar-logout" onClick={() => { onLogout(); setIsMenuOpen(false); }}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
