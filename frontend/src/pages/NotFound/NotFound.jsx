import React from "react";
import "./NotFound.css";
import { posts } from "../../assets/assets";
import Showcase from "../../components/Showcase/Showcase";

const NotFound = () => {
  return (
    <div className="not-found">
      <Showcase type="grid" data={posts} />
    </div>
  );
};

export default NotFound;
