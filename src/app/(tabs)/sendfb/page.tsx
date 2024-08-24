"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [formData, setFormData] = useState({ message: "", link: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { message, link } = formData;

      const encodedMessage = encodeURIComponent(message);
      const encodedLink = encodeURIComponent(link);

      const url = `https://graph.facebook.com/v19.0/${process.env.NEXT_PUBLIC_PAGES_ID}/feed?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&message=${encodedMessage}&link=${encodedLink}`;

      const response = await axios.post(url);

      if (response.status === 200) {
        router.push("/");
      } else {
        console.error("Error submitting form:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="my-10 px-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-7">
          <label htmlFor="message">Message:</label>
          <Input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-7">
          <label htmlFor="link">Link:</label>
          <Input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default Page;
