import React from "react";
import { Link } from "react-router-dom";
import { catalogue } from "../../assets/assets.js";
import "./Catalog.css";

const Catalog = () => {
  return (
    <div className="catalog" id="catalog">
      {catalogue?.map((set, index) => (
        <div key={index} className="catalog-set">
          <Link to="">
            <h1>{set.type}</h1>
          </Link>
          <hr />
          <div className="catalog-block">
            {set.includes.map((item, index) => (
              <Link key={index} to="">{item.naam}</Link>
            ))}
          </div>
          <Link to="">সবগুলো দেখুন</Link>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
