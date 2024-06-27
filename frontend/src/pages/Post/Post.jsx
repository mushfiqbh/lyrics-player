import React from "react";
import "./Post.css";

const Post = () => {
  return (
    <div className="post">
      <div className="post-head">
        
        <h1 className="post-title"></h1>
      </div>
      <div className="post-content">
        <div className="post-table"></div>
        <div className="post-body"></div>
      </div>
    </div>
  );
};

export default Post;
