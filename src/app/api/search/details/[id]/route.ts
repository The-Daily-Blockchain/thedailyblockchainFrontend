import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const response = await axios.get(
    `${process.env.API_URL}/search/details/${id}`
  );

  const data = await response.data;

  return Response.json(data);
}
