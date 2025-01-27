import React from "react";
import { Link } from "react-router-dom";
import { catalogue } from "../../assets/assets.js";
import "./Catalog.css";

const Catalog = () => {
  return (
    <div className="catalog" id="catalog">
      {catalogue?.map((set, index) => (
        <div key={index} className="catalog_set">
          <Link to={set.pathname}>
            <h1>{set.title}</h1>
          </Link>
          <hr />
          <div className="catalog_block">
            {set.includes.map((item, index) => (
              <Link key={index} to={item.pathname}>{item.subtitle}</Link>
            ))}
          </div>
          <Link to={set.pathname}>সবগুলো দেখুন</Link>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
