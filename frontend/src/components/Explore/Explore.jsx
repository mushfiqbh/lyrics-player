import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Explore.css";

const Explore = () => {
  return (
    <div className="explore" id="explore">
      <div className="explore-left">
        <h3>TAKE A QUIZ</h3>
        <br />
        <div className="explore-quiz">
          <Link to="">
            <p>What's Your Attachment Style?</p>
            <img src={assets.attachment} alt="" />
          </Link>
          <hr />
          <Link to="">
            <p>Are You Being Gaslighted?</p>
            <img src={assets.gaslight} alt="" />
          </Link>
          <hr />
          <Link to="">
            <p>What Emotion Are You?</p>
            <img src={assets.emotion} alt="" />
          </Link>
          <hr />
          <Link to="">
            <p>What's Your Leadership Style?</p>
            <img src={assets.leadership} alt="" />
          </Link>
        </div>
      </div>
      <div className="explore-right">
        <h3>MENTAL HEALTH A-Z</h3>
        <br />
        <div>
          <h4>Find a topic by its first letter</h4>
          <br />
          <div className="explore-atoz">
            <Link to="">A</Link>
            <Link to="">B</Link>
            <Link to="">C</Link>
            <Link to="">D</Link>
            <Link to="">E</Link>
            <Link to="">F</Link>
            <Link to="">G</Link>
            <Link to="">H</Link>
            <Link to="">I</Link>
            <Link to="">K</Link>
            <Link to="">L</Link>
            <Link to="">M</Link>
            <Link to="">N</Link>
            <Link to="">O</Link>
            <Link to="">P</Link>
            <Link to="">S</Link>
            <Link to="">T</Link>
          </div>
          <div className="explore-animdot">
            <Link to="">
              <video src={assets.meditation}></video>
              <h4>Meditation</h4>
            </Link>
            <Link to="">
              <video src={assets.brain_health}></video>
              <h4>Improvement</h4>
            </Link>
            <Link to="">
              <video src={assets.adhd}></video>
              <h4>ADHD</h4>
            </Link>
            <Link to="">
              <video src={assets.anxiety}></video>
              <h4>Anxiety</h4>
            </Link>
            <Link to="">
              <video src={assets.addiction}></video>
              <h4>Addiction</h4>
            </Link>
            <Link to="">
              <video src={assets.psychology}></video>
              <h4>Psychology</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
