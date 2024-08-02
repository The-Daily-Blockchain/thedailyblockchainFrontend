import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const response = await axios.get(`${process.env.API_URL}/posts/${id}`);

  const data = await response.data;

  return Response.json(data);
}
