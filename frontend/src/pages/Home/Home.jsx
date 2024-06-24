import React from "react";
import "./Home.css";
import Statbar from "../../components/Statbar/Statbar";
import Content from "../../components/Content/Content";
import Explore from "../../components/Explore/Explore";
import Section from "../../components/Section/Section";

const Home = () => {
  return (
    <div className="home">
      <Statbar />
      <Content />
      <Explore />
      <Section />
    </div>
  );
};

export default Home;
