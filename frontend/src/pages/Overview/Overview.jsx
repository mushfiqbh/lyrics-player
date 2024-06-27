import React from "react";
import "./Overview.css";
import { useParams } from "react-router-dom";

const Overview = () => {
  const {link } = useParams();
  return (
    <div className="overview">
      {link}
    </div>
  );
};

export default Overview;
