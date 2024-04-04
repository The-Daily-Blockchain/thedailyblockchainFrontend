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

export async function POST(req: NextRequest) {
  let url = `${API_URL}/articles/`;
  const token = "f7a241925df6abaecf7a7b8a408a41d6f9119b50";
  const body = await req.json();
  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const data = await response.data;

  return Response.json(data);
}
