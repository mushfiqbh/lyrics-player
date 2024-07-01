import React, { useContext, useState } from "react";
import "./Overview.css";
import { Link, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Showcase from "../../components/Showcase/Showcase";

const Overview = () => {
  const { link } = useParams();
  const { posts, catalog, loading } = useContext(StoreContext);
  const [activeKey, setActiveKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const showHide = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const overview = catalog.find((item) => item.pathname === link);

  if (!overview) {
    return <div>Item not found</div>;
  }

  const relatedPosts = posts.filter((item) => item.label === overview.label);

  return (
    <div className="overview">
      <Link className="label" to="">
        {overview.label}
      </Link>
      <h1>{overview.title}</h1>
      <div className="overview-nav" lang="en">
        {overview.related.map((item, index) => (
          <Link to={"/overview/" + item.pathname} key={index}>
            {item.title}
          </Link>
        ))}
      </div>
      <ul className="overview-metadata">
        <li>
          Reviewed by <Link>{overview.reviewer.name}</Link>
        </li>
        <li>
          Updated on <span>{overview.date}</span>
        </li>
      </ul>

      <blockquote>{overview.desc}</blockquote>

      <div className="overview-gallery">
        <h2>LIVING WITH DEPRESSION</h2>
      </div>

      <ul className="overview-faq">
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
        {overview.faqs.map((item, index) => (
          <li key={index}>
            <h3 onClick={() => showHide(index)}>{item.title}</h3>
            {activeIndex === index && (
              <>
                <p>{item.content}</p>
                <Link to="">{item.link}</Link>
              </>
            )}
          </li>
        ))}
      </ul>

      <ul className="overview-keyterms">
        <h2>KEY TERMS</h2>
        <div className="keyterms-trigger">
          {overview.keyterms.map((item, index) => (
            <b
              className={activeKey === index ? "active" : ""}
              onClick={() => setActiveKey(index)}
              key={index}
            >
              {item.title}
            </b>
          ))}
        </div>
        <div className="keyterms-expand">
          <b>{overview.keyterms[activeKey].title}</b>
          <p>{overview.keyterms[activeKey].content}</p>
          <Link to="">{overview.keyterms[activeKey].link}</Link>
        </div>
      </ul>

      <h2>EXPLORE DPRESSION</h2>
      <br />
      <Showcase type="grid" data={relatedPosts} />
    </div>
  );
};

export default Overview;
