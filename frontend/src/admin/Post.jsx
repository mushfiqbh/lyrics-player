import React, { useState, useEffect } from "react";
import "./Post.css";
import DOMPurify from "dompurify";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Post = () => {
  const { quill, quillRef } = useQuill();
  const [data, setData] = useState("<h1>world</h1>");
  const sanitizedContent = DOMPurify.sanitize(data);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML("<h1>React Hook for Quill!</h1>");

      quill.getModule('toolbar').addHandler('image', () => {
        selectLocalImage();
      });

      quill.on("text-change", () => {
        setData(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);

  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        uploadImage(file);
      }
    };
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('YOUR_SERVER_URL', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.url; // Assuming the server returns the URL of the uploaded image

      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async () => {
    const postData = {
      content: data,
    };

    try {
      const response = await fetch('YOUR_SERVER_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      console.log('Post submitted:', result);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="post">
      <div ref={quillRef} id="editor"></div>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
      <button onClick={handleSubmit}>Submit Post</button>
    </div>
  );
};

export default Post;
