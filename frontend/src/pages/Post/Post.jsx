import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Post.css";
import DOMPurify from "dompurify";
import { StoreContext } from "../../context/StoreContext";
import Showcase from "../../components/Showcase/Showcase";

const Post = () => {
  const { postId } = useParams();
  const { posts, url, setPageTitle } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [readingTime, setReadingTime] = useState(1);

  const calculateReadingTime = (text) => {
    const words = text?.split(" ")?.length;
    const averageWPM = 225;
    const readingTimeMinutes = Math.ceil(words / averageWPM);
    setReadingTime(readingTimeMinutes);
  };

  useEffect(() => {
    const thePost = posts.find((item) => item._id === postId);
    setPost(thePost);
    calculateReadingTime(thePost?.content);
    setPageTitle(thePost?.title + " KhubValoMon.Com");
    setLoading(false);
  }, [posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return (
      <div className="post">
        This page was not found. Go to{" "}
        <Link style={{ textDecoration: "underline" }} to="/overview/">
          Overview List
        </Link>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);
  const relatedPosts = posts.filter(
    (item) => item.label === post.label && item._id !== postId
  );

  return (
    <div className="post">
      <div className="post-title">
        <Link className="label" to={"/overview/" + post.label}>
          {post.label.toUpperCase()}
        </Link>
        <h1>{post.title}</h1>
        <p>{post.subtitle}</p>
        <ul className="post-metadata">
          <li>
            লেখক <Link>{post.author.name}</Link>
          </li>
          <li>
            প্রকাশের সময় <span>{post.date.split("T")[0]}</span>
          </li>
          <li>পড়তে সময় লাগবে {readingTime} মিনিট</li>
        </ul>
      </div>

      <div className="post-image">
        <img src={url + "/images/" + post.image} alt="" />
      </div>

      <div className="post-flex">
        <div className="post-body">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>

          <div className="sources">
            <p>
              Verywell Mind শুধুমাত্র উচ্চ-মানের উত্স ব্যবহার করে, যার মধ্যে
              রয়েছে পিয়ার-পর্যালোচিত গবেষণা, আমাদের নিবন্ধগুলির মধ্যে তথ্য
              সমর্থন করার জন্য। আমাদের সম্পাদকীয় প্রক্রিয়া পড়ুন আরও জানতে
              কিভাবে আমরা তথ্য-চেক করি এবং আমাদের বিষয়বস্তু সঠিক, নির্ভরযোগ্য
              এবং বিশ্বাসযোগ্য রাখি।
            </p>
            <ol>
              {post.sources.map((item, index) => {
                return (
                  <li key={index}>
                    {item.href.length ? (
                      <Link to={item.href} target="_blank">
                        {item.text}
                      </Link>
                    ) : (
                      item.text
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="author">
            <img src="" alt="" />
            <div>
              <b>
                By <a href="">{post.author.name}</a>
              </b>
              <p>{post.author.bio}</p>
            </div>
          </div>
          <div className="share">
            <a href="">Facebook</a>
            <a href="">X</a>
            <a href="">Whatsapp</a>
            <a href="">Instagram</a>
          </div>
        </div>
        <div className="post-ad"></div>
      </div>
      <br />
      <h1>Related Articles</h1>
      <Showcase type="grid" data={relatedPosts} />
    </div>
  );
};

export default Post;
