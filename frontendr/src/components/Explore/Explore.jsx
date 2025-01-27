import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Explore.css";

const Explore = () => {
  return (
    <div className="explore" id="explore">
      <div className="explore_left">
        <h3>একটি কুইজ নিন</h3>
        <br />
        <div className="explore_quiz">
          <Link to="">
            <p>আপনার সংযুক্তি শৈলী কি?</p>
            <img src={assets.attachment} alt="" />
          </Link>
          <hr />
          <Link to="">
            <p>আপনি কি গ্যাসলাইট হচ্ছে?</p>
            <img src={assets.gaslight} alt="" />
          </Link>
          <hr />
          <Link to="">
            <p>আপনি কি আবেগ?</p>
            <img src={assets.emotion} alt="" />
          </Link>
          <hr />
          <Link to="">
            <p>আপনার নেতৃত্ব শৈলী কি?</p>
            <img src={assets.leadership} alt="" />
          </Link>
        </div>
      </div>
      <div className="explore_right">
        <h3>মানসিক সাস্থ্য</h3>
        <div className="explore_animdot">
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
    </div>
  );
};

export default Explore;
