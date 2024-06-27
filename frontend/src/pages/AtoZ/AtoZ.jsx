import React, { act, useState } from "react";
import { Link } from "react-router-dom";
import { assets, mentalHealthConditions } from "../../assets/assets";
import "./AtoZ.css";

const AtoZ = () => {
  const [activeAlpha, setActiveAlpha] = useState("All");

  const alphabet = [
    ...new Set(mentalHealthConditions.map((item) => item.naam[0])),
    ...new Set(
      mentalHealthConditions.map((item) => item.name[0].toUpperCase())
    ),
  ];
  const alphas = ["All", ...alphabet.sort()];

  return (
    <>
      <div className="atoz">
        <h1>মানসিক স্বাস্থ্যের কন্ডিশন</h1>
        <div className="atoz-animdot">
          <Link to="">
            <video src={assets.meditation}></video>
            <h4>ধ্যান</h4>
          </Link>
          <Link to="">
            <video src={assets.brain_health}></video>
            <h4>উন্নতি</h4>
          </Link>
          <Link to="">
            <video src={assets.adhd}></video>
            <h4>ADHD</h4>
          </Link>
          <Link to="">
            <video src={assets.anxiety}></video>
            <h4>দুশ্চিন্তা</h4>
          </Link>
          <Link to="">
            <video src={assets.addiction}></video>
            <h4>অনুরতি</h4>
          </Link>
          <Link to="">
            <video src={assets.psychology}></video>
            <h4>মনোবিজ্ঞান</h4>
          </Link>
        </div>
      </div>

      <div className="atoz-alpha">
        <h3>প্রথম বর্ণ দিয়ে খুঁজুন</h3>
        <div>
          {alphas.map((alpha, index) => (
            <b
              key={index}
              className={alpha === activeAlpha ? "active" : ""}
              onClick={() =>
                setActiveAlpha((prev) => (prev === alpha ? "All" : alpha))
              }
            >
              {alpha === "All" ? "সব" : alpha}
            </b>
          ))}
        </div>
      </div>

      <div className="atoz-block">
        {mentalHealthConditions.map((item, index) => {
          if (
            activeAlpha === "All" ||
            activeAlpha === item.name[0] ||
            activeAlpha === item.naam[0]
          ) {
            return (
              <Link to={item.link} key={index}>
                {item.naam}
                <br />
                <span>({item.name})</span>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default AtoZ;
