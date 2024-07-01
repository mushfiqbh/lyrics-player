import React, { useContext } from "react";
import "./NotFound.css";
import Showcase from "../../components/Showcase/Showcase";
import { StoreContext } from "../../context/StoreContext";

const NotFound = () => {
  const { posts } = useContext(StoreContext);

  return (
    <div className="not-found">
      <Showcase type="grid" data={posts} />
    </div>
  );
};

export default NotFound;
