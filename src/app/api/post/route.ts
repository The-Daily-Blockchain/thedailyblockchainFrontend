import { API_URL } from "@/app/config";
import axios from "axios";

export async function GET() {
  const response = await axios.get(`${API_URL}/posts/`);
  const data = response.data;
  return Response.json(data);
}
