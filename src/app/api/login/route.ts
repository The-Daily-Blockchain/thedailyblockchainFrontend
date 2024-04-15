import { API_URL } from "@/app/config";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    const response = await axios.post(`${API_URL}/login/`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;
    cookies().set("token", token);
    return Response.json(token);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
