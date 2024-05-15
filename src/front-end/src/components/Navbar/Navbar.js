import React, { useState } from "react";
import koala_logo from "../../images/koala-logo.png";
import navSgLogo from "../../images/sg-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { databaseWhite, databaseBlack } from "../../images/Database-icon.tsx";
import { bookingWhite, bookingBlack } from "../../images/Booking-icon.tsx";
import { templateWhite, templateBlack } from "../../images/Templates-icon.tsx";
import { analysisWhite, analysisBlack } from "../../images/Analysis-icon.tsx";
import { calendarWhite, calendarBlack } from "../../images/Calendar-icon.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [hoverPath, setHoverPath] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const performSearch = () => {
    if (inputValue.trim()) {
      navigate(`/dashboard?query=${encodeURIComponent(inputValue.trim())}`);
      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  };

  const handleButtonClick = () => {
    performSearch();
  };

  const getNavItemClass = (path) => {
    return `navItem ${location.pathname === path ? "active" : ""}`;
  };

  const getIcon = (path, WhiteIcon, BlackIcon) => {
    return location.pathname === path || hoverPath === path ? (
      <BlackIcon />
    ) : (
      <WhiteIcon />
    );
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
      <div className="searchGroup">
        <button className="searchButton" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faSearch} style={{ fontSize: "30px" }} />
        </button>
        <div className="searchBar">
          <input
            type="text"
            placeholder="...search"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
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
        <img src={koala_logo} alt="Koala logo" id="koalaLogo" />
      </div>
    </nav>
  );
};

export default Navbar;
