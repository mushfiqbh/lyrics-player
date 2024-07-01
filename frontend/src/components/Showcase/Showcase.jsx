import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Showcase.css";
import image_focus from "../../images/focus.webp";
import { StoreContext } from "../../context/StoreContext";

const Showcase = ({ type, data }) => {
  const { incrementViews } = useContext(StoreContext);
  const [activeIndex, setActiveIndex] = useState(0);

  let items = [];
  const listPerPage = 10;
  if (type === "list") {
    items = data?.slice(
      activeIndex * listPerPage,
      (activeIndex + 1) * listPerPage
    );
  } else {
    items = data?.slice(0, (activeIndex + 1) * 12);
  }

  if (type === "list") {
    return (
      <div className="showcase-list">
        {items?.map((item, index) => (
          <Link
            to=""
            key={index}
            onClick={() => incrementViews(item._id)}
            className="showcase-list-single"
          >
            <h4>{item.tag}</h4>
            <div className="showcase-list-flex">
              <div className="showcase-list-title">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="showcase-list-image">
                <img src={image_focus} alt="" />
              </div>
            </div>
            <hr />
          </Link>
        ))}
        <div className="showcase-loadmore">
          <button
            onClick={() => setActiveIndex(activeIndex - 1)}
            disabled={activeIndex == 0}
          >
            <span>&#129168;</span> আগে
          </button>
          <b>
            {data.length ? activeIndex + 1 : 0}/
            {Math.ceil(data.length / listPerPage)}
          </b>
          <button
            onClick={() => setActiveIndex(activeIndex + 1)}
            disabled={activeIndex + 1 == Math.ceil(data.length / listPerPage)}
          >
            পরে <span>&#129170;</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="showcase-grid">
          {items?.map((item, index) => (
            <Link
              to=""
              key={index}
              onClick={() => incrementViews(item._id)}
              className="showcase-grid-single"
            >
              <div className="showcase-grid-image">
                <img src={image_focus} alt="" />
              </div>
              <div className="showcase-grid-title">
                <b>{item.label}</b>
                <h3>{item.title}</h3>
                <p>{item.reviewer.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <br />
        <div className="showcase-loadmore">
          <b
            onClick={() => {
              setActiveIndex(activeIndex + 1);
            }}
          >
            আরো লোড করুন <span>&#129170;</span>
          </b>
        </div>
      </>
    );
  }
};

export default Showcase;
