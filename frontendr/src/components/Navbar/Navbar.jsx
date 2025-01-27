import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

import "./Navbar.css";
const Navbar = () => {
  const { token } = useContext(StoreContext);

  return (
    <header>
      <div className="navbar" id="navbar">
        <Link to="/search" className="navbar_menu">
          <img src={assets.menu} alt="" />
        </Link>

        <div className="flex">
          <Link to="/" className="navbar_brand">
            <img src={assets.brand} alt="" />
          </Link>
          <div className="navbar_links">
            <NavLink to="/overview">এটুজেড</NavLink>
            <NavLink to="/therapy">থেরাপি</NavLink>
            <NavLink to="/living-well">জীবন</NavLink>
            <NavLink to="/relationship">সম্পর্ক</NavLink>
            <NavLink to="/psychology">মনোবিজ্ঞান</NavLink>
            <NavLink to="/about">আমাদের</NavLink>
            {token && <NavLink to="/admin">এডমিন প্যানেল</NavLink>}
          </div>
        </div>

        <Link to="/search" className="navbar_search">
          <img src={assets.search} alt="search" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
