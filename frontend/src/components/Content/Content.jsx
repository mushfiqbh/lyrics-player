import React from "react";
import { Link } from "react-router-dom";
import "./Content.css";
import image_focus from "../../images/focus.webp";
import image_trending from "../../images/ad.webp";

const Content = () => {
  return (
    <div className="content" id="content">
      <div className="content-left">
        <Link to="" className="content-focus">
          <div className="content-focus-image">
            <img src={image_focus} alt="" />
          </div>
          <div className="content-focus-title">
            <b>RELATIONSHIPS</b>
            <h1>Rejecting Someone Can Be Done Nicely - Here's How</h1>
            <br />
            <p>Reviewed by Divya Robin, LMHC</p>
          </div>
        </Link>
        <div className="content-slide">
          <div className="content-slide-card content-focus-title">
            <Link to="">
              <b>RELATIONSHIPS</b>
              <h2>Rejecting Someone Can Be Done Nicely - Here's How</h2>
              <br />
              <p>Reviewed by Divya Robin, LMHC</p>
            </Link>
          </div>
          <div className="content-slide-card content-focus-title">
            <Link to="">
              <b>Living-Well</b>
              <h2>Rejecting Someone Can Be Done Nicely - Here's How</h2>
              <br />
              <p>Reviewed by Divya Robin, LMHC</p>
            </Link>
          </div>
          <div className="content-slide-card content-focus-title">
            <Link to="">
              <b>SELF-IMPROVEMENT</b>
              <h2>Rejecting Someone Can Be Done Nicely - Here's How</h2>
              <br />
              <p>Reviewed by Divya Robin, LMHC</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="content-right">
        <Link to="" className="content-trending">
          <div className="content-trending-image">
            <img src={image_trending} alt="" />
          </div>
          <div className="content-trending-joiner">Trending</div>
          <div className="content-trending-title">
            <h2>
              What's Your DISC Personality Type? Take This Quiz to Find Out
            </h2>
            <br />
            <button>Read Now</button>
          </div>
        </Link>
        <div className="content-therapy">
          <h2>Online Therapy</h2>
          <br />
          <p>Get help today from the comfort of your home</p>
          <Link to="">Top Services 2024</Link>
          <Link to="">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
