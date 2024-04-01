import { API_URL } from "@/app/config";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { slug: string; page: number } }
) {
  const id = params.slug;
  const page = params.page;
  const response = await axios.get(
    `${API_URL}/cryptopost/${id}/index?page=${page}`
  );

  const data = await response.data;

  return Response.json(data);
}
