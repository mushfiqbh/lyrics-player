import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Foorer.css";

const Footer = ({ setShowHide }) => {
  return (
    <div className="footer">
      <img src={assets.verywellmind} alt="" />
      <hr />
      <div className="footer_content">
        <form>
          <h4>আপনার ইনবক্সে একটি সুস্থ মনের জন্য দৈনিক টিপস</h4>
          <input
            type="search"
            id="footer_search"
            placeholder="Enter your email"
          />
          <button>সাবমিট করুন</button>
        </form>
        <div>
          <Link to="">Condition A-Z</Link>
          <Link to="">Therapy</Link>
          <Link to="">Living Well</Link>
          <Link to="">Relationships</Link>
          <Link to="">Psychology</Link>
          <b style={{ cursor: "pointer" }} onClick={() => setShowHide(true)}>
            Admin Panel
          </b>
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
      <div className="footer_info">
        <div className="footer_info_share">
          <b>আমাদের অনুসরণ করো</b>
          <div>
            <Link to="">+</Link>
            <Link to="">+</Link>
            <Link to="">+</Link>
            <Link to="">+</Link>
          </div>
        </div>
        <div className="footer_info_copyright">
          <p>
            "খুব ভালো মন" বিষয়বস্তু তথ্য ও শিক্ষামূলক শুধুমাত্র উদ্দেশ্য।
            আমাদের ওয়েবসাইট একটি বিকল্প হতে উদ্দেশ্য নয় পেশাদার চিকিৎসা
            পরামর্শ, রোগ নির্ণয় বা চিকিৎসা।
          </p>
          <br />
          <p>Ⓒ 2024 Tesseract BD, Inc. — সমস্ত অধিকার সংরক্ষিত</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
