"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { IoCloseOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";
import HtmlViewer from "@/app/_components/component/HtmlViewer";

const Page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [toggler, setToggler] = useState("1");
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

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
  const clearFile = () => {
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
    }
    setFileInputKey((prevKey) => prevKey + 1);
  };

  const handleContentChange = (event: any, editor: any) => {
    const newContent = editor.getContent();
    setContent(newContent);
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
    <div className="min-h-screen grid place-items-center m-3">
      <Card className="flex p-6 mt-[-10vh]">
        <form onSubmit={handleSubmit}>
          <div className="font-bold">Create Article</div>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />

          <Button
            variant={toggler === "1" ? undefined : "outline"}
            onClick={(event) => {
              event.preventDefault();
              setToggler("1");
            }}
          >
            Content
          </Button>

          <Button
            variant={toggler === "2" ? undefined : "outline"}
            onClick={(event) => {
              event.preventDefault();
              setToggler("2");
            }}
          >
            Preview
          </Button>
          <div className="w-[576px] md:w-[691px] lg:w-[922px] xl:w-[1152px] 2xl:w-[1382px h-[450px]">
            {toggler === "1" && (
              <>
                <Editor
                  apiKey={apiKey}
                  init={{
                    branding: false,
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  value={content}
                  onEditorChange={handleContentChange}
                />
              </>
            )}
            {toggler === "2" && (
              <>
                <HtmlViewer htmlContent={content} />
              </>
            )}
          </div>
          <div className="grid grid-cols-1">
            <Label className="mt-2">Image:</Label>
            <div className="flex mb-2 mt-1">
              <input
                key={fileInputKey}
                type="file"
                onChange={handleFileChange}
              />
              {image && (
                <IoCloseOutline
                  className="hover:opacity-50"
                  onClick={clearFile}
                />
              )}
            </div>
            <Label className="mb-2">Message:</Label>
            <Textarea
              className="h-[100px]"
              value={message}
              onChange={handleMessageChange}
            />
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
