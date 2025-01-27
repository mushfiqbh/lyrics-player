import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [userInfoList, setUserInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState({});
  const [authors, setAuthors] = useState([]);
  const [adminChoice, setAdminChoice] = useState({});
  const [nonLabeledPosts, setNonLabeledPosts] = useState([]);
  const url = import.meta.env.VITE_SERVER_URL;

  const getUserInfo = async (token) => {
    const response = await axios.get(url + "/api/user/userinfo", {
      headers: { token },
    });
    setUserInfo(response.data.userInfo);
    setUserInfoList(response.data.userInfoList);
  };

  const setPageTitle = (title) => {
    const titleTag = document.querySelector("head title");
    titleTag.innerHTML = title;
  };

  const updateNonLabeledPosts = () => {
    const labelList = catalog.map((item) => item.label);
    const otherPosts = posts.filter((item) => !labelList.includes(item.label));
    setNonLabeledPosts(otherPosts);
  };

  const incrementViews = async (id) => {
    const postIndex = posts.findIndex((post) => post._id === id);
    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = {
        ...updatedPosts[postIndex],
        views: updatedPosts[postIndex].views + 1,
      };
      setPosts(updatedPosts);

      await axios.put(url + "/api/post/increment/" + id, {
        $inc: { views: 1 },
      });
    }
  };

  const updateUserInfoByOwner = async (targetId, data) => {
    if (userInfo.permission.includes("ownership")) {
      const response = await axios.put(
        url + "/api/user/update/" + targetId,
        data,
        { headers: { token } }
      );

      if (response.status === 200) {
        const update = userInfoList.map((user) => {
          if (user._id === targetId) {
            return { ...user, permission: data.permission };
          } else {
            return user;
          }
        });
        setUserInfoList(update);
      } else {
        console.log(response.error);
      }
    }
  };

  const updateAdminChoice = async (ID) => {
    if (adminChoice._id === ID) {
      return;
    }

    const response = await axios.put(
      url + "/api/post/update/" + ID,
      {
        adminChoice: true,
      },
      { headers: { token } }
    );

    const response2 = await axios.put(
      url + "/api/post/update/" + adminChoice._id,
      {
        adminChoice: false,
      },
      {
        headers: { token },
      }
    );

    if (response.data.success && response2.data.success) {
      const choiced = posts.find((item) => item._id === ID);
      console.log(choiced);
      setAdminChoice(choiced);
    }
  };

  const deletePost = async (ID) => {
    if (adminChoice._id === ID) {
      updateAdminChoice(posts[0]._id);
    }
    const response = await axios.delete(url + "/api/post/delete/" + ID, {
      headers: { token },
    });
    if (response.status === 200) {
      const updated = posts.filter((item) => item._id !== ID);
      setPosts(updated);
    } else {
      console.log(response.error);
    }
  };

  const selectPost = () => {
    if (posts.length > 0) {
      const sorted = [...posts].sort((a, b) => b.views - a.views);
      const popularPosts = sorted.slice(0, 3);
      setSelectedPosts({
        popularPosts,
        latestPost: posts[posts.length - 1],
      });
      setLoading(false);
    }
  };

  const fetchCatalog = async () => {
    try {
      const response = await axios.get(url + "/api/catalog/index");
      const updated = response.data.data.sort((a, b) =>
        a.title > b.title ? 1 : -1
      );
      setCatalog(updated);
    } catch (error) {
      console.error("Error fetching catalog:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCatalog = async (ID) => {
    const response = await axios.delete(url + "/api/catalog/delete/" + ID, {
      headers: { token },
    });

    if (response.status === 200) {
      const updated = catalog
        .filter((item) => item._id !== ID)
        .sort((a, b) => (a.title > b.title ? 1 : -1));

      setCatalog(updated);
    } else {
      console.log(response.data);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(url + "/api/post/index");
      setPosts(response.data.data);
      setAdminChoice(
        response.data.data.find((item) => item.adminChoice === true)
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthorList = async () => {
    try {
      const response = await axios.get(url + "/api/author/index");

      if (response.data.success) {
        const authorsData = response.data.data.map((author) => ({
          name: author.name,
          bio: author.bio,
        }));

        setAuthors(authorsData);
      }
    } catch (error) {
      console.error("Error fetching authorList", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      setToken(TOKEN);
      getUserInfo(TOKEN);
    }
    fetchPosts();
    fetchCatalog();
  }, []);

  useEffect(() => {
    selectPost();
    fetchAuthorList();
    updateNonLabeledPosts();
  }, [posts, catalog]);

  const contextValue = {
    url,
    token,
    setToken,
    userInfo,
    setUserInfo,
    getUserInfo,
    userInfoList,
    setUserInfoList,
    setPageTitle,
    incrementViews,
    loading,
    setLoading,
    catalog,
    setCatalog,
    deleteCatalog,
    posts,
    setPosts,
    selectedPosts,
    setSelectedPosts,
    nonLabeledPosts,
    authors,
    setAuthors,
    deletePost,
    adminChoice,
    updateAdminChoice,
    updateUserInfoByOwner,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
