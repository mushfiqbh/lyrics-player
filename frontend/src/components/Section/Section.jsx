import React from "react";
import { Link } from "react-router-dom";
import "./Section.css";
import { assets } from "../../assets/assets";

const Section = () => {
  return (
    <div>
      <div className="section">
        <h3>OUR PROMISE</h3>
        <div className="promise">
          <div className="promise-process">
            <h2>
              Our content helps you make the best choices for your mental
              well-being
            </h2>
            <br />
            <br />
            <Link to="">READ ABOUT OUR PROCESS</Link>
          </div>
          <div className="promise-step">
            <img src={assets.health_expert} alt="" />
            <h4>Written by mental health experts and journalist</h4>
          </div>
          <div className="promise-step">
            <img src={assets.fact_checked} alt="" />
            <h4>Fact-checked with science-backed research</h4>
          </div>
          <div className="promise-step">
            <img src={assets.medical_reviewd} alt="" />
            <h4>Reviewed by physicians and mental health professionals</h4>
          </div>
          <div className="promise-step">
            <img src={assets.update} alt="" />
            <h4>Update to reflect the latest health information</h4>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>OUR REVIEW BOARD</h3>
        <div className="review-board">
          <div className="review-members">
            <Link className="review-members-member">
              <img src={assets.steven_gans} alt="" />
              <div>
                <h4>Steven Gans, MD</h4>
                <p>Psychiatrist</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.daniel} alt="" />
              <div>
                <h4>Daniel B. Block, MD</h4>
                <p>Psychiatrist</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.akeem} alt="" />
              <div>
                <h4>Akeem Marsh, MD</h4>
                <p>Child, Adolscent and Adult Psychiatrist</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.sara_clerk} alt="" />
              <div>
                <h4>Sara Clerk</h4>
                <p>Mindfulness Teacher</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.carly} alt="" />
              <div>
                <h4>Carly Snyder, MD</h4>
                <p>Psychiatrist</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.shaheen} alt="" />
              <div>
                <h4>Shaheen Lakhan, Md, PhD</h4>
                <p>Neurologist</p>
              </div>
            </Link>
          </div>
          <div className="meet-the-team">
            <h2>
              Our team of board-certified physicians and other mental health
              professionals ensures our content is accurate, up-to-date and
              inclusive
            </h2>
            <Link to="">MEET THE TEAM</Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>RECENT AWARDS</h3>
        <div className="recent-awards">
          <div className="award">
            <img src={assets.award_mmm} alt="" />
            <h4>2021 Best Healthcare Consumer Media Brand</h4>
          </div>
          <div className="award">
            <img src={assets.award_pm} alt="" />
            <h4>2021 Product Innovator Verywell Mind Podcast</h4>
          </div>
          <div className="award">
            <img src={assets.award_adweek} alt="" />
            <h4>2021 Hottest in Health</h4>
          </div>
          <div className="award">
            <img src={assets.award_fast} alt="" />
            <h4>2020 World Changing Ideas</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
