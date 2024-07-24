import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./CreatePost.css";
import axios from "axios";
import DOMPurify from "dompurify";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FreeSoloCreateOptionDialog from "../../UI/SelectDialogue.jsx";

const CreatePost = () => {
  const {
    url,
    token,
    loading,
    setLoading,
    deletePost,
    adminChoice,
    updateAdminChoice,
  } = useContext(StoreContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Save");
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(false);
  const [data, setData] = useState({
    label: "",
    title: "",
    subtitle: "",
    author: null,
    sources: [
      {
        text: "",
        href: "",
      },
    ],
    content: "",
    image: "",
    date: "",
  });

  const sanitizedContent = DOMPurify.sanitize(data.content);

  const fetchPostData = async () => {
    const response = await axios.get(url + "/api/post/get/" + postId);
    const postData = response.data.data;
    const { label, title, subtitle, author, sources, content, image, date } =
      postData;

    setData({
      label,
      title,
      subtitle,
      author,
      sources,
      content,
      image,
      date: new Date(date).toISOString().split("T")[0],
    });
    // const imageFile = await axios.get(url + "/images/" + image);
    // setFile(imageFile);
  };

  useEffect(() => {
    if (postId) {
      fetchPostData();
      setLoading(false);
    } else {
      setData({
        ...data,
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setButtonText("Save");
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSourcesChange = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    setButtonText("Save");
    let sourcesDataCopy = [...data.sources];

    if (name === "text") {
      sourcesDataCopy[index].text = value;
    } else if (name === "href") {
      sourcesDataCopy[index].href = value;
    }

    setData({
      ...data,
      sources: sourcesDataCopy,
    });
  };

  const createPost = async (event) => {
    event.preventDefault();
    setButtonText("Saving");

    const { label, title, subtitle, author, sources, content, date } = data;

    let response;
    if (postId && postId.length) {
      response = await axios.put(
        url + "/api/post/update/" + postId,
        {
          ...data,
          label: label.toLowerCase(),
        },
        { headers: { token } }
      );
      setButtonText("Saved");
    } else if (!file) {
      alert("Please upload an image");
      setButtonText("Save");
    } else {
      const formData = new FormData();
      formData.append("label", label.toLowerCase());
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("author", JSON.stringify(author));
      formData.append("sources", JSON.stringify(sources));
      formData.append("content", content);
      formData.append("date", date);
      formData.append("image", file);

      response = await axios.post(url + "/api/post/create", formData, {
        headers: { token },
      });
      if (response.data.success) {
        setData({
          label: "",
          title: "",
          subtitle: "",
          author: null,
          sources: [
            {
              text: "",
              href: "",
            },
          ],
          content: "",
          image: "",
          date: "",
        });
        setFile(false);
      }
      setButtonText("Saved");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    if (postId) {
      navigate("/login?forward=post&id=" + postId);
    } else {
      navigate("/login?forward=post");
    }
  }

  return (
    <div className="create-post">
      <form onSubmit={createPost}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/admin")}
          >
            EXIT
          </Button>
          <div>
            {step == 1 ? (
              <Button
                variant="outlined"
                onClick={() => setStep(2)}
                disabled={
                  data.label && data.author && data.author ? false : true
                }
              >
                Next
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setStep(1)}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              type="submit"
              style={{ marginLeft: "20px" }}
              disabled={buttonText === "Saved" ? true : false}
            >
              {buttonText}
            </Button>
          </div>
        </Stack>
        <br />

        {step === 1 && (
          <div className="form-metadata">
            <div className="add-image-upload">
              <label htmlFor="image">
                <img
                  src={file ? URL.createObjectURL(file) : assets.upload_area}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
              <img src={postId && url + "/images/" + data.image} alt="" />
            </div>

            <div>
              <label htmlFor="label">Label</label>
              <input
                lang="en"
                type="text"
                name="label"
                value={data.label}
                onChange={handleChange}
                placeholder="Label (English Only)"
                required
              />
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="শিরোনাম"
              />
            </div>
            <div>
              <label htmlFor="subtitle">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                placeholder="সাবটাইটেল"
              />
            </div>

            <div className="mui-input">
              <label htmlFor="author">Author</label>
              <FreeSoloCreateOptionDialog
                fieldName="author"
                label="Author"
                data={data}
                setData={setData}
                setButtonText={setButtonText}
              />
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-sources">
              <label htmlFor="sources"></label>
              {data.sources.map((item, index) => (
                <fieldset key={index}>
                  <legend>{"Source " + (index + 1)}</legend>
                  <input
                    type="text"
                    name="text"
                    value={data.sources[index].text}
                    onChange={(event) => handleSourcesChange(event, index)}
                    placeholder={"উৎস যোগ করুন " + (index + 1)}
                  />
                  <input
                    type="text"
                    name="href"
                    value={data.sources[index].href}
                    onChange={(event) => handleSourcesChange(event, index)}
                    placeholder={"উৎস লিঙ্ক যোগ করুন " + (index + 1)}
                  />
                </fieldset>
              ))}
              <Button
                type="button"
                variant="outlined"
                color="info"
                onClick={() => {
                  setData({
                    ...data,
                    sources: [
                      ...data.sources,
                      {
                        text: "",
                        href: "",
                      },
                    ],
                  });
                }}
              >
                ADD ANOTHER SOURCE
              </Button>
            </div>

            {postId && (
              <Stack direction="row">
                <Button
                  type="button"
                  color="error"
                  onClick={() => {
                    const yes = confirm("Are you sure to delete?");
                    yes ? deletePost(postId) : null;
                    navigate("/admin");
                  }}
                >
                  DELETE THIS POST
                </Button>
                <Button
                  type="button"
                  color="success"
                  onClick={() => updateAdminChoice(postId)}
                >
                  {adminChoice._id === postId
                    ? "Admin Choiced *"
                    : "Make Admin Choice *"}
                </Button>
              </Stack>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="form-content">
            <Stack direction="row" flexWrap="wrap">
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setData({
                    ...data,
                    content: (data.content += "\r\n<h2></h2>"),
                  })
                }
              >
                Title
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setData({
                    ...data,
                    content: (data.content +=
                      "\r\n<blockquote>*****</blockquote>"),
                  })
                }
              >
                Blockquote
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setData({
                    ...data,
                    content: (data.content +=
                      "\r\n<div class='quote'>******<b>***</b></div>"),
                  })
                }
              >
                Quote
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setData({
                    ...data,
                    content: (data.content +=
                      "\r\n<div class='advice'>*****<hr/></div>"),
                  })
                }
              >
                Advice
              </Button>
            </Stack>
            <div>
              <textarea
                name="content"
                value={data.content}
                onChange={handleChange}
                placeholder="Type Only HTML Code Here"
              />
            </div>
          </div>
        )}
      </form>

      <div
        className="post-preview"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
    </div>
  );
};

export default CreatePost;
