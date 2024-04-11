import { API_URL } from "@/app/config";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    // Fixed
    const response = await axios.post(`${API_URL}/login/`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    return Response.json(data);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
