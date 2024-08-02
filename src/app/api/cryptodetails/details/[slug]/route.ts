import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;

  const response = await axios.get(`${process.env.API_URL}/crypto/${id}`);

  const data = await response.data;

  return Response.json(data);
}
