import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <div className="menu-btn">
          <img src={assets.update} alt="" />
        </div>
        <Link to="/">
          <img src={assets.brand} alt="" />
        </Link>

        <div className="navbar-brand-links">
          <a href="#">Condition A-Z</a>
          <a href="#">Therapy</a>
          <a href="#">Living Well</a>
          <a href="#">Relationships</a>
          <a href="#">Psychology</a>
          <a href="#">Trending</a>
          <a href="#">About Us</a>
        </div>
      </div>
      <div className="navbar-search">
        <img src={assets.search} alt="search" />
      </div>
    </div>
  );
};

export default Navbar;
