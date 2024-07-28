import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddOverview.css";
import { StoreContext } from "../../context/StoreContext";
import FreeSoloCreateOptionDialog from "../../utils/SelectDialogue.jsx";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
const AddOverview = () => {
  const navigate = useNavigate();
  const { url, token, loading, setLoading } = useContext(StoreContext);
  const { overviewId } = useParams();
  const [buttonText, setButtonText] = useState("Save");
  const [activeIndex, setActiveIndex] = useState(true);
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    desc: "",
    author: null,
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
    keyterms: [
      {
        key: "",
        terms: "",
      },
    ],
    date: "",
  });

  const fieldAdder = () => {
    if (activeIndex) {
      setData({
        ...data,
        faqs: [
          ...data.faqs,
          {
            question: "",
            answer: "",
          },
        ],
      });
    } else {
      setData({
        ...data,
        keyterms: [
          ...data.keyterms,
          {
            key: "",
            terms: "",
          },
        ],
      });
    }
  };

  const fetchOverviewData = async () => {
    const response = await axios.get(url + "/api/catalog/get/" + overviewId);
    const overviewData = response.data.data;
    const { title, subtitle, desc, author, faqs, keyterms, date } =
      overviewData;

    setData({
      title,
      subtitle,
      desc,
      author,
      faqs,
      keyterms,
      date: new Date(date).toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    if (overviewId) {
      fetchOverviewData();
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

  const handleFaqsChange = (event, index) => {
    const name = event.target.name;
    const value = event.target.value;
    setButtonText("Save");
    let faqsDataCopy = [...data.faqs];
    let keyTermsDataCopy = [...data.keyterms];

    if (name === "question") {
      faqsDataCopy[index].question = value;
    } else if (name === "answer") {
      faqsDataCopy[index].answer = value;
    } else if (name === "key") {
      keyTermsDataCopy[index].key = value;
    } else if (name === "terms") {
      keyTermsDataCopy[index].terms = value;
    }

    setData({
      ...data,
      faqs: faqsDataCopy,
      keyterms: keyTermsDataCopy,
    });
  };

  const createOverview = async (event) => {
    event.preventDefault();
    setButtonText("Saving");

    const formData = data;
    formData.faqs = formData.faqs.filter(
      (item) => item.question.length && item.answer.length
    );
    if (!formData.faqs.length) {
      formData.faqs = [
        {
          question: "",
          answer: "",
        },
      ];
    }

    formData.keyterms = formData.keyterms.filter(
      (item) => item.key.length && item.terms.length
    );
    if (!formData.keyterms.length) {
      formData.keyterms = [
        {
          key: "",
          terms: "",
        },
      ];
    }

    const { author, faqs, keyterms } = formData;
    let response;

    if (overviewId && overviewId.length) {
      response = await axios.put(
        url + "/api/catalog/update/" + overviewId,
        formData,
        { headers: { token } }
      );
      setButtonText("Saved");
    } else {
      response = await axios.post(
        url + "/api/catalog/create",
        {
          ...formData,
          author: JSON.stringify(author),
          faqs: JSON.stringify(faqs),
          keyterms: JSON.stringify(keyterms),
        },
        { headers: { token } }
      );

      if (response.data.success) {
        setData({
          title: "",
          subtitle: "",
          desc: "",
          author: null,
          faqs: [
            {
              question: "",
              answer: "",
            },
          ],
          keyterms: [
            {
              key: "",
              terms: "",
            },
          ],
          date: "",
        });
      } else {
        console.log(response.data.message);
      }
      setButtonText("Saved");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-overview">
      <form onSubmit={createOverview}>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/admin")}
          >
            EXIT
          </Button>
          <div>
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

        <div className="form-flex">
          <div className="form-left">
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="বাংলায় নাম দিন"
              />
            </div>

            <div>
              <label htmlFor="subtitle">Subtitle (Label)</label>
              <input
                lang="en"
                type="text"
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                placeholder="Label (English Only)"
                required
              />
            </div>

            <div className="mui-input">
              <label htmlFor="reviewer">Reviewer</label>
              <FreeSoloCreateOptionDialog
                label="Reviewer"
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

            <div>
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                value={data.desc}
                onChange={handleChange}
                placeholder="বর্ণনা লিখুন"
              />
            </div>
          </div>

          <div className="form-right">
            <div
              lang="en"
              className="form-top-label"
              onClick={() => setActiveIndex(!activeIndex)}
            >
              <p className={activeIndex ? "active" : ""}>
                Frequently Asked Questions
              </p>
              <p className={activeIndex ? "" : "active"}>Key Terms</p>
            </div>

            {activeIndex && (
              <Stack direction="column" spacing={2}>
                {data.faqs.map((item, index) => (
                  <fieldset key={index}>
                    <legend lang="en">{"FAQ " + (index + 1)}</legend>
                    <input
                      type="text"
                      name="question"
                      value={data.faqs[index].question}
                      onChange={(event) => handleFaqsChange(event, index)}
                      placeholder={"Question " + (index + 1)}
                    />
                    <textarea
                      name="answer"
                      value={data.faqs[index].answer}
                      onChange={(event) => handleFaqsChange(event, index)}
                      placeholder={"Answer " + (index + 1)}
                    />
                  </fieldset>
                ))}
              </Stack>
            )}

            {!activeIndex && (
              <Stack direction="column" spacing={2}>
                {data.keyterms.map((item, index) => (
                  <fieldset key={index}>
                    <legend lang="en">{"KEY-TERM " + (index + 1)}</legend>
                    <input
                      type="text"
                      name="key"
                      value={data.keyterms[index].key}
                      onChange={(event) => handleFaqsChange(event, index)}
                      placeholder={"Key " + (index + 1)}
                    />
                    <textarea
                      name="terms"
                      value={data.keyterms[index].terms}
                      onChange={(event) => handleFaqsChange(event, index)}
                      placeholder={"Terms " + (index + 1)}
                    />
                  </fieldset>
                ))}
              </Stack>
            )}

            <Button
              type="button"
              variant="outlined"
              color="info"
              onClick={fieldAdder}
            >
              {activeIndex ? "ADD NEW FAQ" : "ADD NEW KEYTERMS"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOverview;
