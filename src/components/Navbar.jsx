import React from 'react';
import './Navbar.css'; 

// Navbar component for the navigation bar
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img className='navbar-logo' src="/public/mybetbuilder-logo.svg" alt='mybetbuilderlogo'></img>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" className="nav-link">HOW-TO</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">ABOUT US</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;