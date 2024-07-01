import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Content.css";
import image_focus from "../../images/focus.webp";
import image_trending from "../../images/ad.webp";
import { StoreContext } from "../../context/StoreContext";

const Content = () => {
  const { incrementViews, selectedPosts = {} } = useContext(StoreContext);
  const { latestPost, adminChoice, popularPosts } = selectedPosts;

  return (
    <div className="content" id="content">
      <div className="content-left">
        <Link
          to={"/post/" + latestPost?.pathname}
          onClick={() => incrementViews(latestPost?._id)}
          className="content-focus"
        >
          <div className="content-focus-image">
            <img src={image_focus} alt="" />
          </div>
          <div className="content-focus-title">
            <b>{latestPost?.label}</b>
            <h1>{latestPost?.title}</h1>
            <br />
            <p>{latestPost?.author.name}</p>
          </div>
        </Link>
        <div className="content-slide">
          {popularPosts?.map((item, index) => (
            <Link
              to={"/post/" + item.pathname}
              key={index}
              onClick={() => incrementViews(item._id)}
              className="content-slide-card content-focus-title"
            >
              <b>{item.label}</b>
              <h2>
                {item.views} {item.title}
              </h2>
              <br />
              <p>{item.author.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="content-right">
        <Link
          to=""
          onClick={() => incrementViews(adminChoice._id)}
          className="content-trending"
        >
          <div className="content-trending-image">
            <img src={image_trending} alt="" />
          </div>
          <div className="content-trending-joiner">জনপ্রিয়</div>
          <div className="content-trending-title">
            <h2>{adminChoice?.title}</h2>
            <br />
            <button>এখন পড়ুন</button>
          </div>
        </Link>
        <div className="content-therapy">
          <h2>অনলাইন থেরাপি</h2>
          <br />
          <p>আপনার বাড়ির আরাম থেকে আজ সাহায্য পান</p>
          <Link to="">সেরা পরিষেবা 2024</Link>
          <Link to="">আরও জানুন</Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
