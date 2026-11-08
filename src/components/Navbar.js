
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../design/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <button
  className="menu-toggle"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰ Menu
</button>

      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}

      <nav className={`main-navbar ${menuOpen ? "active" : ""}`}>
              <NavLink to="/home" onClick={closeMenu}>🏠 Home</NavLink>
        <NavLink to="/dashboard" onClick={closeMenu}>📊 Dashboard</NavLink>
        <NavLink to="/employees" onClick={closeMenu}>👥 Employees</NavLink>
        <NavLink to="/departments" onClick={closeMenu}>🏢 Departments</NavLink>
        <NavLink to="/projects" onClick={closeMenu}>📁 Projects</NavLink>
        <NavLink to="/finance" onClick={closeMenu}>💰 Finance</NavLink>
        <NavLink to="/performance" onClick={closeMenu}>📊 Performance</NavLink>
        <NavLink to="/reports" onClick={closeMenu}>📋 Reports</NavLink>
  
      </nav>
    </>
  );
}

export default Navbar;
