import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const response = await axios.get(
    `https://api.binance.com/api/v3/ticker/price?symbol=${id}`
  );

  const data = await response.data;

  return Response.json(data);
}
