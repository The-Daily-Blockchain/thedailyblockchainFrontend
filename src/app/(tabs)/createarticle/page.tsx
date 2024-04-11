"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image as any);

    try {
      const response = await axios.post(`api/article/`, formData);
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const sendDataToFbPage = async () => {
      if (responseData) {
        const originalURL = (responseData as { article_url: string })
          ?.article_url;
        const link = encodeURIComponent(originalURL);
        try {
          await axios.post(
            `https://graph.facebook.com/v19.0/${process.env.NEXT_PUBLIC_PAGES_ID}/feed?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&message=${message}&link=${link}`
          );
          console.log("Data sent to another API successfully");
          router.push("/topnews");
        } catch (error) {
          console.error("Error sending data to another API:", error);
        }
      }
    };

    sendDataToFbPage();
  }, [message, responseData, router]);

  return (
    <div>
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
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <label>Image:</label>
        <br />
        <input type="file" onChange={handleFileChange} />
        <br />
        <label>Message:</label> {/* New input field for the message */}
        <br />
        <textarea value={message} onChange={handleMessageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
