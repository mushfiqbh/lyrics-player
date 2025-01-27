import React, { useContext, useEffect } from "react";
import "./NotFound.css";
import Showcase from "../../components/Showcase/Showcase";
import { StoreContext } from "../../context/StoreContext";

const NotFound = () => {
  const { posts, setPageTitle } = useContext(StoreContext);

  useEffect(() => {
    setPageTitle("Not Found Page | Khub Valo Mon");
  }, []);

  return (
    <div className="not_found">
      <Showcase type="grid" data={posts} />
    </div>
  );
};

export default NotFound;
