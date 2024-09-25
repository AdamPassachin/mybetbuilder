import React from 'react';
import './Navbar.css';  // Add this import


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">MYBETBUILDER</span>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/bet-builder" className="nav-link">BET BUILDER</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;