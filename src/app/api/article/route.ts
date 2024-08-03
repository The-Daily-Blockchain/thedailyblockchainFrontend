import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, res: NextApiResponse) {
  let url = `${process.env.API_URL}/articles`;
  const page = req.nextUrl.searchParams.get("page");

  if (page !== null) {
    url += `?page=${page}`;
  }

  const response = await axios.get(url);
  const data = response.data;
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const clientFormData = await req.formData();
  const title = clientFormData.get("title");
  const content = clientFormData.get("content");
  const imageFile = clientFormData.get("image");

  const imageBuffer = await (imageFile as File).arrayBuffer();
  const image = Buffer.from(imageBuffer);

  const cookieStore = cookies();
  const token = cookieStore?.get("token")?.value;

  const url = `${process.env.API_URL}/articles/`;

  const formData = new FormData();
  formData.append("title", title as string);
  formData.append("content", content as string);
  formData.append("image", new Blob([image]));

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });

    const data = response.data;
    return Response.json(data);
  } catch (error) {
    console.error("Error:", error);
    console.log({ message: "Internal Server Error" });
  }
}
