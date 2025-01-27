import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import Showcase from "../../components/Showcase/Showcase";
import { StoreContext } from "../../context/StoreContext";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Admin = () => {
  const { posts, catalog, setPageTitle, nonLabeledPosts } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setPostList([...posts].reverse());
    setPageTitle("Admin Panel -" + " (mushfiqbh@gmail.com)");
    setLoading(false);
  }, [posts]);

  const reverser = (list) => [...list].reverse();

  const handleChange = (event) => {
    const value = event.target.value;

    if (value === "ALL") {
      setPostList(reverser(posts));
    } else if (value === "NON") {
      setPostList(reverser(nonLabeledPosts));
    } else {
      const filterPosts = posts.filter(
        (item) => item.label.toLowerCase() === value
      );
      setPostList(reverser(filterPosts));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin">
      <Stack
        spacing={2}
        direction="row"
        className="admin_panel"
        flexWrap="wrap"
        gap="10px"
        bgcolor="transparent"
      >
        <Button
          variant={toggle ? "contained" : "outlined"}
          color="info"
          onClick={() => setToggle(true)}
        >
          POST LIST
        </Button>
        <Button
          style={{ margin: "0" }}
          variant={toggle ? "outlined" : "contained"}
          color="info"
          onClick={() => setToggle(false)}
        >
          OVERVIEW LIST
        </Button>

        <Button
          style={{ margin: "0" }}
          variant="text"
          color="info"
          onClick={() => navigate("/admin/post")}
        >
          Add Post
        </Button>
        <Button
          style={{ margin: "0" }}
          variant="text"
          color="info"
          onClick={() => navigate("/admin/overview")}
        >
          Add Overview
        </Button>

        <select
          name="bycatalog"
          lang="en"
          onChange={handleChange}
          disabled={!toggle}
        >
          <option value="ALL">ALL LABEL</option>
          {catalog?.map((item, index) => {
            return (
              <option value={item.label} key={index}>
                {item.subtitle}
              </option>
            );
          })}
          <option value="NON">NON LABELED</option>
        </select>
      </Stack>

      <div className="admin_list">
        {loading ? (
          <div
            style={{
              minHeight: "768px",
            }}
          >
            Loading...
          </div>
        ) : toggle ? (
          <Showcase type="postList" data={postList} />
        ) : (
          <Showcase type="catalogList" data={catalog} />
        )}
      </div>
    </div>
  );
};

export default Admin;
