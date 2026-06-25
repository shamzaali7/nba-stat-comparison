import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        NBA<span>Stats</span>
      </NavLink>
      <ul className="navbar-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/playerlist" className={({ isActive }) => isActive ? 'active' : ''}>Top Players</NavLink></li>
        <li><NavLink to="/players" className={({ isActive }) => isActive ? 'active' : ''}>Compare</NavLink></li>
      </ul>
    </nav>
  );
}

export default Header;
