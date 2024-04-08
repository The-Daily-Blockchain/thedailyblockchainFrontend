import { API_URL } from "@/app/config";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  let url = `${API_URL}/articles`;
  const page = req.nextUrl.searchParams.get("page");

  if (page !== null) {
    url += `?page=${page}`;
  }

  const response = await axios.get(url);
  const data = response.data;
  return Response.json(data);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const clientFormData = await req.formData();
  const title = clientFormData.get("title");
  const content = clientFormData.get("content");
  const image = clientFormData.get("image");

  const token = "f7a241925df6abaecf7a7b8a408a41d6f9119b50";
  const url = `${API_URL}/articles/`;

  const formData = new FormData();
  formData.append("title", title as string);
  formData.append("content", content as string);
  formData.append("image", image as Blob);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });

    const data = response.data;
    console.log(data);
    return Response.json(data);
  } catch (error) {
    // Handle error appropriately
    console.error("Error:", error);
    console.log({ message: "Internal Server Error" });
  }
}
