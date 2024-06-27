import { createContext, useEffect, useState } from "react";
import { posts } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://127.0.0.1:4000";
  const [token, setToken] = useState("");
  const [blogs, setBlogs] = useState(posts);
  const [popular, setPopular] = useState([]);

  const incrementViews = (id) => {
    const blogIndex = blogs.findIndex((blog) => blog._id === id);
    if (blogIndex !== -1) {
      const updatedBlogs = [...blogs];
      updatedBlogs[blogIndex] = {
        ...updatedBlogs[blogIndex],
        views: updatedBlogs[blogIndex].views + 1,
      };
      setBlogs(updatedBlogs);
    }
  };

  const topThreeBlogs = () => {
    const sorted = [...blogs].sort((a, b) => b.views - a.views);
    const topThree = sorted.slice(0, 3);
    setPopular(topThree);
  };

  useEffect(() => {
    topThreeBlogs();
  }, [blogs]);

  const contextValue = { url, token, setToken, blogs, incrementViews, popular };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
