import axios from "axios";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  let url = `${process.env.API_URL}/posts`;
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

  const url = `${process.env.API_URL}/posts/`;

  const formData = new FormData();
  formData.append("title_post", title as string);
  formData.append("content_post", content as string);
  formData.append("image_post", new Blob([image]));

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
    console.error("Error:", error);
    console.log({ message: "Internal Server Error" });
  }
}
