import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://127.0.0.1:4000";
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true)
  const [catalog, setCatalog] = useState([])
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState({});

  const incrementViews = async (id) => {
    const postIndex = posts.findIndex((post) => post._id === id);
    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        views: updatedPosts[postIndex].views + 1,
      };
      setPosts(updatedPosts);

      await axios.put(url + "/api/post/update/" + id, { $inc: { views: 1 } });
    }
  };

  const selectPost = () => {
    if (posts.length > 0) {
      const sorted = [...posts].sort((a, b) => b.views - a.views);
      const popularPosts = sorted.slice(0, 3);
      setSelectedPosts({
        popularPosts,
        latestPost: posts[posts.length - 1],
        adminChoice: posts[2],
      });
    }
  };

  const fetchCatalog = async () => {
    try {
      const response = await axios.get(url + "/api/catalog/index");
      setCatalog(response.data.data);
    } catch (error) {
      console.error("Error fetching catalog:", error);
    } finally {
      setLoading(false)
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(url + "/api/post/index");
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCatalog();
  }, []);

  useEffect(() => {
    selectPost();
  }, [posts]);

  const contextValue = {
    url,
    token,
    setToken,
    incrementViews,
    loading,
    catalog,
    posts,
    setPosts,
    selectedPosts,
    setSelectedPosts,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
