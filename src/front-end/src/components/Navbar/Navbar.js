import React, { useState } from "react";
import koala_logo from "../../images/koala-logo.jpg";
import navSgLogo from "../../images/sg-logo.png";
import { Link, useLocation } from "react-router-dom";

// Import the icons with PascalCase naming convention
import { databaseWhite, databaseBlack } from "../../images/database-icon.tsx";
import { bookingWhite, bookingBlack } from "../../images/booking-icon.tsx";
import { templateWhite, templateBlack } from "../../images/template-icon.tsx";
import { analysisWhite, analysisBlack } from "../../images/analysis-icon.tsx";
import { calendarWhite, calendarBlack } from "../../images/calendar-icon.tsx";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const [hoverPath, setHoverPath] = useState(null);

  // Function to select the icon based on the path
  const getNavItemClass = (path) => {
    return `navItem ${location.pathname === path ? "active" : ""}`;
  };

  const getIcon = (path, WhiteIcon, BlackIcon) => {
    return location.pathname === path || hoverPath === path ? <BlackIcon /> : <WhiteIcon />;
  };

  const handleMouseEnter = (path) => {
    setHoverPath(path);
  };

  const handleMouseLeave = () => {
    setHoverPath(null);
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
        <Link
        to="/dashboard"
        className={getNavItemClass("/dashboard")}
        onMouseEnter={() => handleMouseEnter("/dashboard")}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon("/dashboard", bookingWhite, bookingBlack)}
        Dashboard
      </Link>
        <Link
        to="/database"
        className={getNavItemClass("/database")}
        onMouseEnter={() => handleMouseEnter("/database")}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon("/database", databaseWhite, databaseBlack)}
        Database
      </Link>
        <Link
        to="/templates"
        className={getNavItemClass("/templates")}
        onMouseEnter={() => handleMouseEnter("/templates")}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon("/templates", templateWhite, templateBlack)}
        Templates
      </Link>
        <Link
        to="/analytics"
        className={getNavItemClass("/analytics")}
        onMouseEnter={() => handleMouseEnter("/analytics")}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon("/analytics", analysisWhite, analysisBlack)}
        Analytics
      </Link>
        <Link
        to="/calendar"
        className={getNavItemClass("/calendar")}
        onMouseEnter={() => handleMouseEnter("/calendar")}
        onMouseLeave={handleMouseLeave}
      >
        {getIcon("/calendar", calendarWhite, calendarBlack)}
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
