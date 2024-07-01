import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Post.css";
import DOMPurify from "dompurify";
import postImage from "../../images/post2.webp";
import authorImage from "../../images/hannah.webp";
import { StoreContext } from "../../context/StoreContext";
import Showcase from "../../components/Showcase/Showcase";

const Post = () => {
  const { posts, loading } = useContext(StoreContext);
  const [showTable, setShowTable] = useState(true);
  const { link } = useParams();

  if (loading) {
    return <div>Loading...</div>;
  }

  const post = posts.find((item) => item.pathname === link);
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const relatedPosts = posts.filter((item) => item.label === post.label);

  if (!post) {
    return <div>Item not found</div>;
  }

  return (
    <div className="post">
      <div className="post-title">
        <Link className="label" to="">
          {post.pathname}
        </Link>
        <h1>{post.title}</h1>
        <p>{post.caption}</p>
        <ul className="post-metadata">
          <li>
            By <Link>{post.author.name}</Link>
          </li>
          <li>
            Published on <span>{post.date}</span>
          </li>
          <li>
            Reviewed by <Link>{post.reviewer.name}</Link>
          </li>
        </ul>
      </div>

      <div className="post-image">
        <img src={postImage} alt="" />
      </div>

      <div className="post-flex">
        <div className="post-table">
          <h3 id="setShowTable" onClick={() => setShowTable(!showTable)}>
            সূচিপত্র
          </h3>
          <div style={{ display: showTable ? "" : "none" }}>
            <a href="">বহির্মুখী-বহির্মুখী সম্পর্কের পরিচিতি</a>
            <a href="">বহির্মুখী-বহির্মুখী সম্পর্কের সুবিধা</a>
            <a href="">বহির্মুখী-বহির্মুখী সম্পর্কের চ্যালেঞ্জ</a>
          </div>
        </div>

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
              {post.sources.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="author">
            <img src={authorImage} alt="" />
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
