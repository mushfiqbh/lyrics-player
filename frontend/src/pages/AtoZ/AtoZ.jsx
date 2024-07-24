import React, { act, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./AtoZ.css";
import { StoreContext } from "../../context/StoreContext";

const AtoZ = () => {
  const { catalog, setPageTitle } = useContext(StoreContext);
  const [activeAlpha, setActiveAlpha] = useState("All");
  const [alphas, setAlphas] = useState([]);

  useEffect(() => {
    setPageTitle("AtoZ Overviews - KhubValoMon.Com");
  }, []);

  useEffect(() => {
    const alphabet = [
      ...new Set(catalog.map((item) => item.title[0])),
      ...new Set(catalog.map((item) => item.subtitle[0].toUpperCase())),
    ];
    setAlphas(["All", ...alphabet.sort()]);
  }, [catalog]);

  return (
    <>
      <div className="atoz">
        <h1>এটুজেড কন্ডিশন</h1>
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
              onClick={() => setActiveAlpha(alpha)}
            >
              {alpha === "All" ? "সব" : alpha}
            </b>
          ))}
        </div>
      </div>

      <div className="atoz-block">
        {catalog.map((item, index) => {
          if (
            activeAlpha === "All" ||
            activeAlpha === item.title[0] ||
            activeAlpha === item.subtitle[0]
          ) {
            return (
              <Link to={"/overview/" + item.label} key={index}>
                {item.title}
                <br />
                <span>({item.subtitle})</span>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default AtoZ;
