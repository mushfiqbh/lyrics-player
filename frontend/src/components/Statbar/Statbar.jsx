import React from "react";
import "./Statbar.css";
import { assets } from "../../assets/assets";

const Statbar = () => {
  return (
    <div className="statbar">
      <div className="statbar-slogan">
        <div>
          <h3>Trusted mental health information you need it.</h3>
          <h3>Know More, Live Brighter.</h3>
        </div>
        <img src={assets.logo} alt="" />
      </div>
      {/* <div className="statbar-logo">
        
      </div> */}
      <div className="statbar-stats">
        <div className="statbar-stats-stat">
          <h3>150 Million</h3>
          <h4>Readers Helped Each Year</h4>
        </div>
        <div className="statbar-stats-stat">
          <h3>150+</h3>
          <h4>Expert Health Writters</h4>
        </div>
        <div className="statbar-stats-stat">
          <h3>100+</h3>
          <h4>Mental Health Topics</h4>
        </div>
      </div>
    </div>
  );
};

export default Statbar;
