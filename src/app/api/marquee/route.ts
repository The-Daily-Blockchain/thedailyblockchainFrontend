import axios from "axios";

export async function GET() {
  const response = await axios.get(
    `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","LTCUSDT","DOGEUSDT","SOLUSDT","XRPUSDT","BNBUSDT","MATICUSDT","ADAUSDT","DOTUSDT","AVAXUSDT","LINKUSDT","UNIUSDT","TRXUSDT"]`
  );
  const data = await response.data;

  return Response.json({ data });
}
