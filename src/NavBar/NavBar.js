// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../NavBar/NavBar.css"; // You can style the navbar in a separate CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/employee" className="navbar-link">Employee 1</Link> 
        </li>
   
      </ul>
    </nav>
  );
};

export default Navbar;
