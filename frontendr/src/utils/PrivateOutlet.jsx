import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateOutlet = ({ setShowHide }) => {
  const TOKEN = localStorage.getItem("token");
  return TOKEN ? <Outlet /> : setShowHide(true);
};

export default PrivateOutlet;
