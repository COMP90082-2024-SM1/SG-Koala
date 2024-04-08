import React from "react";
import "./Navbar.css";
import koala_logo from "../../image/koala-logo.jpg";
import sg_logo from "../../image/sg-logo.png";
import dashboardIcon from "../../image/dashboard-icon.png";
import databaseIcon from "../../image/database-icon.png";
import templatesIcon from "../../image/templates-icon.png";
import analyticsIcon from "../../image/analytics-icon.png";
import calendarIcon from "../../image/calendar-icon.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getNavItemClass = (path) => {
    return `nav-item ${location.pathname === path ? "active" : ""}`;
  };

  return (
    <nav className="navigation-bar">
      <Link to="/dashboard">
        <div className="logo">
          <img src={sg_logo} alt="sg_logo" id="sg_logo" />
        </div>
      </Link>
      <div className="search-bar">
        <input type="text" placeholder="#id" />
      </div>
      <div className="nav-items">
        <Link to="/dashboard" className={getNavItemClass("/dashboard")}>
          <img src={dashboardIcon} alt="Dashboard" className="nav-icon" />
          Dashboard
        </Link>
        <Link to="/database" className={getNavItemClass("/database")}>
          <img src={databaseIcon} alt="Database" className="nav-icon" />
          Database
        </Link>
        <Link to="/templates" className={getNavItemClass("/templates")}>
          <img src={templatesIcon} alt="Templates" className="nav-icon" />
          Templates
        </Link>
        <Link to="/analytics" className={getNavItemClass("/analytics")}>
          <img src={analyticsIcon} alt="Analytics" className="nav-icon" />
          Analytics
        </Link>
        <Link to="/calendar" className={getNavItemClass("/calendar")}>
          <img src={calendarIcon} alt="Calendar" className="nav-icon" />
          Calendar
        </Link>
      </div>
      <div className="footer">
        <img src={koala_logo} alt="koala_logo" id="koala_logo" />
      </div>
    </nav>
  );
};

export default Navbar;
