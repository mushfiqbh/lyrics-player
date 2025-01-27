import React, { useEffect, useContext } from "react";
import "./Home.css";
import Statbar from "../../components/Statbar/Statbar";
import Content from "../../components/Content/Content";
import Explore from "../../components/Explore/Explore";
import Section from "../../components/Section/Section";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const { setPageTitle } = useContext(StoreContext);

  useEffect(() => {
    setPageTitle("Home | খূব ভালো মন | Very Well Mind Bangladesh");
  }, []);

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
