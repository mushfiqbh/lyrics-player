import React, { useContext, useState, useEffect } from "react";
import "./Overview.css";
import { Link, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Showcase from "../../components/Showcase/Showcase";

const Overview = () => {
  const { label } = useParams();
  const { posts, catalog, setPageTitle } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState({});
  const [activeKey, setActiveKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const showHide = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const theOverview = catalog.find(
      (item) => item.label.toLowerCase() === label.toLowerCase()
    );
    
    setOverview(theOverview);
    setPageTitle(
      theOverview?.title + " - " + theOverview?.label + " KhubValoMon.Com"
    );
    setLoading(false);
  }, [catalog]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!overview) {
    return (
      <div className="overview">
        This page was not found. Go to{" "}
        <Link style={{ textDecoration: "underline" }} to="/overview/">
          Overview List
        </Link>
      </div>
    );
  }

  const relatedPosts = posts.filter((item) => item.label === overview.label);

  return (
    <div className="overview">
      <Link className="label" to="">
        {overview.label.toUpperCase()}
      </Link>
      <h1>{overview.title}</h1>

      <ul className="overview-metadata">
        <li>
          পর্যালোচনা করেছেন <Link>{overview.author.name}</Link>
        </li>
        <li>
          সময় <span>{overview?.date?.split("T")[0]}</span>
        </li>
      </ul>

      <div className="overview-nav" lang="en">
        {overview.keyterms.map(
          (item, index) =>
            item.key && (
              <Link to={"/overview/" + item.key} key={index}>
                {item.key}
              </Link>
            )
        )}
      </div>

      <blockquote>{overview.desc}</blockquote>

      {/* <div className="overview-gallery">
        <h2>LIVING WITH DEPRESSION</h2>
      </div> */}

      {overview.faqs[0].question && (
        <ul className="overview-faq">
          <h2>প্রায়ই জিজ্ঞাসিত প্রশ্নোত্তর</h2>
          {overview.faqs.map(
            (item, index) =>
              item.question && (
                <li key={index}>
                  <h3 onClick={() => showHide(index)}>{item.question}</h3>
                  {activeIndex === index && (
                    <>
                      <p>{item.answer}</p>
                      {/* <Link to="">fdsf</Link> */}
                    </>
                  )}
                </li>
              )
          )}
        </ul>
      )}

      {overview.keyterms[0].key && (
        <ul className="overview-keyterms">
          <h2>তথ্য সুচক</h2>
          <div className="keyterms-trigger">
            {overview.keyterms.map(
              (item, index) =>
                item.key && (
                  <b
                    className={activeKey === index ? "active" : ""}
                    onClick={() => setActiveKey(index)}
                    key={index}
                  >
                    {item.key}
                  </b>
                )
            )}
          </div>
          <div className="keyterms-expand">
            <b>{overview.keyterms[activeKey].key}</b>
            <p>{overview.keyterms[activeKey].terms}</p>
            {/* <Link to="">asdf</Link> */}
          </div>
        </ul>
      )}

      <h2>এই ওভারভিউ এর সমস্ত পোস্ট</h2>
      <br />
      <Showcase type="grid" data={relatedPosts} />
    </div>
  );
};

export default Overview;
