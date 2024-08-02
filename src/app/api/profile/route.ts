import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const response = await axios.get(`${process.env.API_URL}/profile/`, {
      headers: {
        Authorization: `Token ${token?.value}`,
      },
    });
    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
}
