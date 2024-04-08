"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image as any);

    try {
      const response = await axios.post(`api/article/`, formData);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <br />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <label>Content:</label>
      <br />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />

      <label>Image:</label>
      <br />
      <input type="file" onChange={handleFileChange} />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Page;
