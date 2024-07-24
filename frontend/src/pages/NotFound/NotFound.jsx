import React, { useContext, useEffect, useMemo, useState } from "react";
import "./NotFound.css";
import Showcase from "../../components/Showcase/Showcase";
import { StoreContext } from "../../context/StoreContext";

const NotFound = () => {
  const { posts, setPageTitle } = useContext(StoreContext);

  useEffect(() => {
    setPageTitle("Not Found Page | Khub Valo Mon");
  }, []);

  return (
    <div className="not-found">
      <Showcase type="grid" data={posts} />
    </div>
  );
};

export default NotFound;
