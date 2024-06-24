import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Foorer.css";

const Footer = () => {
  return (
    <div className="footer">
      <img src={assets.brand} alt="" />
      <hr />
      <div className="footer-content">
        <form>
          <h4>Daily Tips for a Healthy Mind to Your Inbox</h4>
          <input type="search" id="footer-search" placeholder="Enter your email" />
          <button>SIGN UP</button>
        </form>
        <div>
          <Link to="">Condition A-Z</Link>
          <Link to="">Therapy</Link>
          <Link to="">Living Well</Link>
          <Link to="">Relationships</Link>
          <Link to="">Psychology</Link>
          <Link to="">Trending</Link>
        </div>
        <div>
          <Link to="">Meet Our Review Board</Link>
          <Link to="">Editorial Process</Link>
          <Link to="">Privacy Policy</Link>
          <Link to="">Advertise</Link>
          <Link to="">Careers</Link>
          <Link to="">Crisis Support</Link>
        </div>
        <div>
          <Link to="">About Us</Link>
          <Link to="">Diversity Pledge</Link>
          <Link to="">In the News</Link>
          <Link to="">Terms of Service</Link>
          <Link to="">Contact</Link>
        </div>
      </div>
      <hr />
      <div className="footer-info">
        <div className="footer-info-share">
          <b>Follow Us</b>
          <div>
            <Link to="">+</Link>
            <Link to="">+</Link>
            <Link to="">+</Link>
            <Link to="">+</Link>
          </div>
        </div>
        <div className="footer-info-copyright">
          <p>
            Verywell Mind's content is for informational and educational
            purposes only. Our website is not intended to be a substitute for
            professional medical advice, diagnosis, or treatment.
          </p>
          <br />
          <p>Ⓒ 2024 Dotdash Media, Inc. — All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
