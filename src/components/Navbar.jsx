import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Css/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/courses":
        setActiveButton(1);
        break;
      case "/teachers":
        setActiveButton(2);
        break;
      case "/groups":
        setActiveButton(3);
        break;
      case "/students":
        setActiveButton(4);
        break;
      default:
        setActiveButton(0);
    }
  }, [location.pathname]);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  const buttonStyle = (index) => {
    return activeButton === index
      ? { backgroundColor: "#87cfff", color: "black" }
      : {};
  };

  const buttonClass = "nav-1";

  return (
    <div className="navbar">
      <div>
        <i className="fa-solid fa-copy"></i>
        <p>CRM</p>
      </div>

      <div>
        <Link
          to="/dashboard"
          className={buttonClass}
          style={buttonStyle(0)}
          onClick={() => handleClick(0)}
        >
          <i className="fa-solid fa-house"></i>
          <p>Dashboard</p>
        </Link>
        <Link
          to="/courses"
          className={buttonClass}
          style={buttonStyle(1)}
          onClick={() => handleClick(1)}
        >
          <i className="fa-solid fa-volume-high"></i>
          <p>Courses</p>
        </Link>
        <Link
          to="/teachers"
          className={buttonClass}
          style={buttonStyle(2)}
          onClick={() => handleClick(2)}
        >
          <i className="fa-solid fa-user"></i>
          <p>Teachers</p>
        </Link>
        <Link
          to="/groups"
          className={buttonClass}
          style={buttonStyle(3)}
          onClick={() => handleClick(3)}
        >
          <i className="fa-solid fa-users"></i>
          <p>Groups</p>
        </Link>
        <Link
          to="/students"
          className={buttonClass}
          style={buttonStyle(4)}
          onClick={() => handleClick(4)}
        >
          <i className="fa-solid fa-graduation-cap"></i>
          <p>Students</p>
        </Link>
      </div>
    </div>
  );
}
