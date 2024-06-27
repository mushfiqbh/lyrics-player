import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className="navbar" id="navbar">
        <Link to="/search" className="navbar-menu">
          <img src={assets.menu} alt="" />
        </Link>

        <div className="flex">
          <Link to="/" className="navbar-brand">
            <img src={assets.brand} alt="" />
          </Link>
          <div className="navbar-links">
            <NavLink to="/overview">এটুজেড</NavLink>
            <NavLink to="/therapy">থেরাপি</NavLink>
            <NavLink to="/living-well">জীবন</NavLink>
            <NavLink to="/relationship">সম্পর্ক</NavLink>
            <NavLink to="/psychology">মনোবিজ্ঞান</NavLink>
            <NavLink to="/trending">জনপ্রিয়</NavLink>
            <NavLink to="/about">আমাদের</NavLink>
          </div>{" "}
        </div>

        <Link to="/search" className="navbar-search">
          <img src={assets.search} alt="search" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
