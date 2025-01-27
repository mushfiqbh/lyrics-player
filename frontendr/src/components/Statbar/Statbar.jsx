import React from "react";
import "./Statbar.css";
import { assets } from "../../assets/assets";

const Statbar = () => {
  return (
    <div className="statbar">
      <div className="statbar_slogan">
        <div>
          <h3>বিশ্বস্ত মানসিক স্বাস্থ্য তথ্য আপনার প্রয়োজন</h3>
          <h3>আরও জানুন, আরও উজ্জ্বল হয়ে উঠুন</h3>
        </div>
        <img src={assets.logo} alt="" />
      </div>
      <div className="statbar_stats">
        <div className="statbar_stats_single">
          <div>
            <h3>150M+</h3>
            <h4>পাঠকরা সাহায্য করছে</h4>
          </div>
          <b>&#129170;</b>
        </div>
        <div className="statbar_stats_single">
          <div>
            <h3>100+</h3>
            <h4> বিশেষজ্ঞ স্বাস্থ্য লেখক</h4>
          </div>
          <b>&#129170;</b>
        </div>
        <div className="statbar_stats_single">
          <div>
            <h3>100+</h3>
            <h4>মানসিক স্বাস্থ্য বিষয়</h4>
          </div>
          <b>&#129170;</b>
        </div>
      </div>
    </div>
  );
};

export default Statbar;
