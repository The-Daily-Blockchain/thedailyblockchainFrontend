"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="min-h-screen grid place-items-center">
      <Card className="w-[600px] p-6">
        <form onSubmit={handleSubmit}>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label>Content:</Label>
          <Textarea
            className="height-[100[px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="grid grid-cols-1">
            <Label className="mt-2">Image:</Label>
            <input
              className="mt-2 mb-4"
              type="file"
              onChange={handleFileChange}
            />
            <Label className="mb-2">Message:</Label>{" "}
            {/* New input field for the message */}
            <Textarea value={message} onChange={handleMessageChange} />
          </div>
          <Button className="mt-5" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Page;
