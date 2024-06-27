import React from "react";
import { Link } from "react-router-dom";
import "./Section.css";
import { assets } from "../../assets/assets";

const Section = () => {
  return (
    <div>
      <div className="section">
        <h3>আমাদের প্রতিশ্রুতি</h3>
        <div className="promise">
          <div className="promise-process">
            <h2>
              আমাদের বিষয়বস্তু আপনাকে আপনার মানসিক জন্য সেরা পছন্দ করতে সাহায্য
              করে মঙ্গল
            </h2>
            <br />
            <br />
            <Link to="">আমাদের প্রক্রিয়া সম্পর্কে পড়ুন</Link>
          </div>
          <div className="promise-step">
            <img src={assets.health_expert} alt="" />
            <h4>লিখেছেন মানসিক স্বাস্থ্য বিশেষজ্ঞ এবং সাংবাদিক</h4>
          </div>
          <div className="promise-step">
            <img src={assets.fact_checked} alt="" />
            <h4>বিজ্ঞান-সমর্থিত গবেষণার সাথে ফ্যাক্ট-চেক করা হয়েছে</h4>
          </div>
          <div className="promise-step">
            <img src={assets.medical_reviewd} alt="" />
            <h4>চিকিত্সক এবং মানসিক স্বাস্থ্য পেশাদারদের দ্বারা পর্যালোচনা</h4>
          </div>
          <div className="promise-step">
            <img src={assets.update} alt="" />
            <h4>সর্বশেষ স্বাস্থ্য তথ্য প্রতিফলিত করার জন্য আপডেট</h4>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>আমাদের রিভিউ বোর্ড</h3>
        <div className="review-board">
          <div className="review-members">
            <Link className="review-members-member">
              <img src={assets.steven_gans} alt="" />
              <div>
                <h4>স্টিভেন গ্যান্স, এমডি</h4>
                <p>মনোরোগ বিশেষজ্ঞ</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.daniel} alt="" />
              <div>
                <h4>ড্যানিয়েল বি ব্লক, এমডি</h4>
                <p>মনোরোগ বিশেষজ্ঞ</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.akeem} alt="" />
              <div>
                <h4>আকিম মার্শ, এমডি</h4>
                <p>শিশু, কিশোর এবং প্রাপ্তবয়স্ক মনোরোগ বিশেষজ্ঞ</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.sara_clerk} alt="" />
              <div>
                <h4>সারা ক্লার্ক</h4>
                <p>মননশীলতা শিক্ষক</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.carly} alt="" />
              <div>
                <h4>কার্লি স্নাইডার, এমডি</h4>
                <p>মনোরোগ বিশেষজ্ঞ</p>
              </div>
            </Link>
            <Link className="review-members-member">
              <img src={assets.shaheen} alt="" />
              <div>
                <h4>শাহীন লিখন, মো, পিএইচডি</h4>
                <p>নিউরোলজিস্ট</p>
              </div>
            </Link>
          </div>
          <div className="meet-the-team">
            <h2>
              আমাদের বোর্ড-প্রত্যয়িত চিকিত্সক এবং অন্যান্য মানসিক স্বাস্থ্যের
              দল পেশাদাররা নিশ্চিত করে যে আমাদের বিষয়বস্তু সঠিক, আপ-টু-ডেট এবং
              অন্তর্ভুক্ত
            </h2>
            <Link to="">টিমের সাথে যুক্ত হোন</Link>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>সাম্প্রতিক পুরষ্কার</h3>
        <div className="recent-awards">
          <div className="award">
            <img src={assets.award_mmm} alt="" />
            <h4>2021 সেরা স্বাস্থ্যসেবা গ্রাহক মিডিয়া ব্র্যান্ড</h4>
          </div>
          <div className="award">
            <img src={assets.award_pm} alt="" />
            <h4>2021 পণ্য উদ্ভাবক ভেরিওয়েল মাইন্ড পডকাস্ট</h4>
          </div>
          <div className="award">
            <img src={assets.award_adweek} alt="" />
            <h4>2021 স্বাস্থ্যের ক্ষেত্রে হটেস্ট</h4>
          </div>
          <div className="award">
            <img src={assets.award_fast} alt="" />
            <h4>2020 বিশ্ব পরিবর্তনশীল ধারণা</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
