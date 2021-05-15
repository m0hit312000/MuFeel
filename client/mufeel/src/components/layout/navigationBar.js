import React from "react";
import { Link } from "react-router-dom";
import "./navigationBar.css";
import logo from "../../assets/img/logo_transparent.png";

/**
 * @author
 * @function NavigationBar
 **/

const NavigationBar = ({
  auth,
  click,
  handleClick,
  closeMobileMenu,
  handleLogOut,
}) => {
  return (
    <nav className="navbar">
      <Link exact to="/" className="navbar-logo">
        <img src={logo} alt="logo" />
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"} />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link exact to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about-us" className="nav-links" onClick={closeMobileMenu}>
            About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/blogs" className="nav-links" onClick={closeMobileMenu}>
            Blogs
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/contact-us"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Contact Us
          </Link>
        </li>
        {auth ? (
          <li className="nav-item">
            <Link
              to="/"
              className="nav-links"
              onClick={() => {
                closeMobileMenu();
                handleLogOut();
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
