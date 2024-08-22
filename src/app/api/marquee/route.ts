import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","LTCUSDT","DOGEUSDT","SOLUSDT","XRPUSDT","BNBUSDT","MATICUSDT","ADAUSDT","DOTUSDT","AVAXUSDT","LINKUSDT","UNIUSDT","TRXUSDT"]`
    );
    const data = await response.data;

    return new Response(JSON.stringify({ data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    // Return an error response
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
