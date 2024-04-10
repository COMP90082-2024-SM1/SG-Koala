import React from "react";
import koala_logo from "../../images/koala-logo.jpg";
import navSgLogo from "../../images/sg-logo.png";
import { Link, useLocation } from "react-router-dom";

// Import the icons with PascalCase naming convention
import { PhDatabaseThinWhite, PhDatabaseThinBlack } from "../../images/Database-icon.tsx";
import { IconParkOutlineAppointmentWhite, IconParkOutlineAppointmentBlack } from "../../images/IconParkOutlineAppointment.tsx";
import { TablerTemplateWhite, TablerTemplateBlack } from "../../images/TablerTemplate.tsx";
import { IconParkOutlineAnalysisWhite, IconParkOutlineAnalysisBlack } from "../../images/IconParkOutlineAnalysis.tsx";
import { IconParkOutlineCalendarWhite, IconParkOutlineCalendarBlack } from "../../images/IconParkOutlineCalendar.tsx";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const getNavItemClass = (path) => {
    return `navItem ${location.pathname === path ? "active" : ""}`;
  };

  // Function to select the icon based on the path
  const getIcon = (path, WhiteIcon, BlackIcon) => {
    return location.pathname === path ? <BlackIcon /> : <WhiteIcon />;
  };

  return (
    <nav className="navigationBar">
      <Link to="/dashboard">
        <div className="logo">
          <img src={navSgLogo} alt="Science Gallery logo" id="navSgLogo" />
        </div>
      </Link>
      <div className="searchBar">
        <input type="text" placeholder="#id" />
      </div>
      <div className="navItems">
        <Link to="/dashboard" className={getNavItemClass("/dashboard")} >
          {getIcon("/dashboard", IconParkOutlineAppointmentWhite, IconParkOutlineAppointmentBlack)}
          Dashboard
        </Link>
        <Link to="/database" className={getNavItemClass("/database")}>
          {getIcon("/database", PhDatabaseThinWhite, PhDatabaseThinBlack)}
          Database
        </Link>
        <Link to="/templates" className={getNavItemClass("/templates")}>
          {getIcon("/templates", TablerTemplateWhite, TablerTemplateBlack)}
          Templates
        </Link>
        <Link to="/analytics" className={getNavItemClass("/analytics")}>
          {getIcon("/analytics", IconParkOutlineAnalysisWhite, IconParkOutlineAnalysisBlack)}
          Analytics
        </Link>
        <Link to="/calendar" className={getNavItemClass("/calendar")}>
          {getIcon("/calendar", IconParkOutlineCalendarWhite, IconParkOutlineCalendarBlack)}
          Calendar
        </Link>
      </div>
      <div className="footer">
        <img src={koala_logo} alt="Koala logo" id="koala_logo" />
      </div>
    </nav>
  );
};

export default Navbar;
