import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./CreatePost.css";
import axios from "axios";
import DOMPurify from "dompurify";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FreeSoloCreateOptionDialog from "../../utils/SelectDialogue.jsx";
import insertAtCursor from "../../utils/insertAtCursor.js";

const CreatePost = () => {
  const {
    url,
    token,
    userInfo,
    loading,
    setLoading,
    adminChoice,
    updateAdminChoice,
  } = useContext(StoreContext);
  const { postId } = useParams();
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Save");
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(false);
  const [contentData, setContentData] = useState({
    markup: "",
    input1: "",
    input2: "",
    placeholder1: "",
    placeholder2: "",
  });
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

  const handleInsertText = () => {
    let textToInsert = "";
    if (contentData.markup === "title") {
      textToInsert = "<h2>" + contentData.input1 + "</h2>";
    } else if (contentData.markup === "blockquote") {
      textToInsert = `<blockquote>${contentData.input1}</blockquote>`;
    } else if (contentData.markup === "quote") {
      textToInsert = `<div class='quote'>${contentData.input1}<b>${contentData.input2}</b></div>`;
    } else if (contentData.markup === "advice") {
      textToInsert = `<div class='advice'>${contentData.input1}<hr/></div>`;
    }

    const newValue = insertAtCursor(textareaRef.current, textToInsert);
    setData({
      ...data,
      content: newValue,
    });
    setContentData({
      markup: "",
      input1: "",
      input2: "",
      placeholder1: "",
      placeholder2: "",
    });
  };

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
    // Update Existing Post
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
      // Create New Post
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

  return (
    <div className="create_post">
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
          <div className="form_metadata">
            <div className="add_image_upload">
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

            <div className="mui_input">
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

            <div className="form_sources">
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
                ADD ANOTHOR SOURCE
              </Button>
            </div>

            {userInfo?.permission?.includes("adminChoice") && postId && (
              <Stack direction="row">
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
          <div className="form_content">
            <Stack direction="row" flexWrap="wrap">
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setContentData({
                    ...contentData,
                    markup: "title",
                    placeholder1: "Title",
                    placeholder2: "",
                  })
                }
              >
                Title
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setContentData({
                    ...contentData,
                    markup: "blockquote",
                    placeholder1: "Quote Text",
                    placeholder2: "",
                  })
                }
              >
                Blockquote
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setContentData({
                    ...contentData,
                    markup: "quote",
                    placeholder1: "Quote Text",
                    placeholder2: "Who Said?",
                  })
                }
              >
                Quote
              </Button>
              <Button
                variant="text"
                color="warning"
                onClick={() =>
                  setContentData({
                    ...contentData,
                    markup: "advice",
                    placeholder1: "Quote Title",
                    placeholder2: "",
                  })
                }
              >
                Advice
              </Button>
            </Stack>

            {contentData.markup && (
              <Stack direction="column">
                {contentData.placeholder1 && (
                  <input
                    type="text"
                    name="input1"
                    value={contentData.input1}
                    placeholder={contentData.placeholder1}
                    onChange={(e) =>
                      setContentData({
                        ...contentData,
                        input1: e.target.value,
                      })
                    }
                  />
                )}

                {contentData.placeholder2 && (
                  <input
                    type="text"
                    name="input2"
                    value={contentData.input2}
                    placeholder={contentData.placeholder2}
                    onChange={(e) =>
                      setContentData({
                        ...contentData,
                        input2: e.target.value,
                      })
                    }
                  />
                )}

                <Button
                  type="button"
                  color="warning"
                  variant="outlined"
                  onClick={handleInsertText}
                >
                  MOVE CURSOR WHERE TO INSERT THAN CLICK ME
                </Button>
              </Stack>
            )}

            <div>
              <textarea
                ref={textareaRef}
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
        className="post_preview post_elements_parent"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
    </div>
  );
};

export default CreatePost;
