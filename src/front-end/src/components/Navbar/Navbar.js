import React from "react";
import koala_logo from "../../images/koala-logo.jpg";
import sg_logo from "../../images/sg-logo.png";
import { Link, useLocation } from "react-router-dom";
import { PhDatabaseThin } from "../../images/Database-icon.tsx";
import { IconParkOutlineAppointment } from "../../images/IconParkOutlineAppointment.tsx";
import { TablerTemplate } from "../../images/TablerTemplate.tsx";
import { IconParkOutlineAnalysis } from "../../images/IconParkOutlineAnalysis.tsx";
import { IconParkOutlineCalendar } from "../../images/IconParkOutlineCalendar.tsx";
import "./Navbar.css";

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
          <IconParkOutlineAppointment className="nav-icon" />
          Dashboard
        </Link>
        <Link to="/database" className={getNavItemClass("/database")}>
          <PhDatabaseThin className="nav-icon" id="database-icon" />
          Database
        </Link>
        <Link to="/templates" className={getNavItemClass("/templates")}>
          <TablerTemplate className="nav-icon" />
          Templates
        </Link>
        <Link to="/analytics" className={getNavItemClass("/analytics")}>
          <IconParkOutlineAnalysis className="nav-icon" />
          Analytics
        </Link>
        <Link to="/calendar" className={getNavItemClass("/calendar")}>
          <IconParkOutlineCalendar className="nav-icon" />
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
