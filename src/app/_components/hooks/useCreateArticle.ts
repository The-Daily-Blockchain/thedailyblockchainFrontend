import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { POST } from "@/app/api/article/route";

export const usePostWithToken = (formData: any) => {
  // pass the body here
  const token = "f7a241925df6abaecf7a7b8a408a41d6f9119b50";
  const url = `/api/article`;
  const { error, mutate } = useSWR(url, fetcher);

  const postData = async (formData: any) => {
    try {
      const response = await POST(formData, token);
      const data = await response.json();
      mutate(data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return { error, postData };
};
