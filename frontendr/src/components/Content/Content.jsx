import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Content.css";
import { StoreContext } from "../../context/StoreContext";

const Content = () => {
  const {
    url,
    loading,
    adminChoice,
    incrementViews,
    selectedPosts = {},
  } = useContext(StoreContext);
  const { latestPost, popularPosts } = selectedPosts;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content" id="content">
      <div className="content_left">
        <Link
          to={"/post/" + latestPost?._id}
          onClick={() => incrementViews(latestPost?._id)}
          className="content_focus"
        >
          <div className="content_focus_image">
            <img src={url + "/images/" + latestPost?.image} alt="" />
          </div>
          <div className="content_focus_title">
            <b>{latestPost?.label.toUpperCase()}</b>
            <h1>{latestPost?.title}</h1>
            <p>{latestPost?.subtitle}</p>
            <p>{latestPost?.author.name}</p>
          </div>
        </Link>
        <div className="content_slide">
          {popularPosts?.map((item, index) => (
            <Link
              to={"/post/" + item._id}
              key={index}
              onClick={() => incrementViews(item._id)}
              className="content_slide_card"
            >
              <b>{item.label.toUpperCase()}</b>
              <h2>{item.title}</h2>
              <p>{item.author.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="content_right">
        <Link
          to={"/post/" + adminChoice?._id}
          onClick={() => incrementViews(adminChoice?._id)}
          className="content_trending"
        >
          <div className="content_trending_image">
            <img src={url + "/images/" + adminChoice?.image} alt="" />
          </div>
          <div className="content_trending_joiner">জনপ্রিয়</div>
          <div className="content_trending_title">
            <h2>{adminChoice?.title}</h2>
            <br />
            <button>এখন পড়ুন</button>
          </div>
        </Link>
        <div className="content_therapy">
          <h2>অনলাইন থেরাপি</h2>
          <p>আপনার বাড়ির আরাম থেকে আজ সাহায্য পান</p>
          <Link to="">সেরা পরিষেবা 2024</Link>
          <Link to="">আরও জানুন</Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
