import React, { useContext, useEffect } from "react";
import "./AboutUs.css";
import { StoreContext } from "../../context/StoreContext";

const AboutUs = () => {
  const { setPageTitle } = useContext(StoreContext);

  useEffect(() => {
    setPageTitle("About Us - KhubValoMon.Com");
  }, []);

  return <div>About Us</div>;
};

export default AboutUs;
