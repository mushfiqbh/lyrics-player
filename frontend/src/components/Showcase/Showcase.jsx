import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Showcase.css";
import { StoreContext } from "../../context/StoreContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoadMore from "./LoadMore";

const Showcase = ({ type, data }) => {
  const {
    url,
    userInfo,
    posts,
    adminChoice,
    incrementViews,
    deletePost,
    deleteCatalog,
  } = useContext(StoreContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  let items = [];

  if (type === "grid") {
    items = data?.slice(0, (activeIndex + 1) * 12);
  } else {
    items = data?.slice(activeIndex * 10, (activeIndex + 1) * 10);
  }

  if (type === "grid") {
    return (
      <>
        <div className="showcase-grid">
          {items?.map((item, index) => (
            <Link
              to={"/post/" + item._id}
              key={index}
              onClick={() => incrementViews(item._id)}
              className="showcase-grid-single"
            >
              <div className="showcase-grid-image">
                <img src={url + "/images/" + item.image} alt="" />
              </div>
              <div className="showcase-grid-title">
                <b>{item.label}</b>
                <h3>{item.title}</h3>
                <p>{item.author.name}</p>
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
  } else if (type === "searchList") {
    return (
      <div className="showcase-list">
        {items?.map((item, index) => (
          <Link
            to={"/post/" + item._id}
            key={index}
            onClick={() => incrementViews(item._id)}
            className="showcase-list-single"
          >
            <div className="showcase-list-title">
              <h4>{item.label}</h4>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
            <div className="showcase-list-image">
              <img src={url + "/images/" + item.image} alt="" />
            </div>
          </Link>
        ))}
        <LoadMore
          length={data.length}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    );
  } else if (type === "postList") {
    return (
      <div className="showcase-list">
        {items?.map((item, index) => {
          return (
            <div className="showcase-list-single" key={index}>
              <Link
                to={"/admin/post/" + item._id}
                className="showcase-list-flex"
              >
                <div className="showcase-list-image">
                  <img src={url + "/images/" + item.image} alt="" />
                </div>
                <div className="showcase-list-title">
                  <h3>
                    <b style={{ color: "red" }}>
                      {adminChoice._id === item._id ? "* " : ""}
                    </b>
                    {item.title}
                  </h3>
                  <p style={{ overflowY: "hidden" }}>
                    <b>{item.label} </b>
                    {item.subtitle.slice(0, 90)}
                  </p>
                </div>
              </Link>

              <Stack spacing={2} direction="row" justifyContent="space-between">
                <Button
                  style={{ height: "min-content" }}
                  variant="contained"
                  onClick={() => navigate("/post/" + item._id)}
                >
                  View
                </Button>
                {userInfo?.permission?.includes("deletePost") && (
                  <Button
                    style={{ height: "min-content" }}
                    color="error"
                    variant={
                      adminChoice._id === item._id ? "contained" : "outlined"
                    }
                    onClick={() => {
                      const yes = confirm("Are you sure to delete?");
                      yes ? deletePost(item._id) : null;
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            </div>
          );
        })}

        <LoadMore
          length={data.length}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    );
  } else if (type === "catalogList") {
    return (
      <div className="showcase-list">
        {items?.map((item, index) => (
          <div
            className="showcase-list-single"
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link
              style={{ width: "100%" }}
              to={"/admin/overview/" + item._id}
              className="showcase-list-flex"
            >
              <div className="showcase-list-title">
                <h3>{item.title}</h3>
                <p>
                  <b>
                    {posts.reduce((p, c) => {
                      return c.label === item.label ? p + 1 : p;
                    }, 0)}{" "}
                    Posts
                  </b>
                  {" Labeled For "}
                  <b>{item.label}</b>
                  {" Reviewed By "}
                  <b>{item.author.name}</b>
                </p>
              </div>
            </Link>

            <Stack spacing={2} direction="row" justifyContent="space-between">
              <Button
                style={{ height: "min-content" }}
                variant="contained"
                onClick={() => navigate("/overview/" + item.label)}
              >
                View
              </Button>
              {userInfo?.permission?.includes("deleteOverview") && (
                <Button
                  style={{ height: "min-content" }}
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    const yes = confirm("Are you sure to delete?");
                    yes ? deleteCatalog(item._id) : null;
                  }}
                >
                  Delete
                </Button>
              )}
            </Stack>
          </div>
        ))}

        <LoadMore
          length={data.length}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    );
  }
};

export default Showcase;
