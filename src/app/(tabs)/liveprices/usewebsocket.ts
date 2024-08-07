import { useEffect, useRef, useState } from "react";

export const useWebSocket = () => {
  const [tickerData, setTickerData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const query =
      "btcusdt@ticker/ethusdt@ticker/bnbusdt@ticker/solusdt@ticker/xrpusdt@ticker/adausdt@ticker/dogeusdt@ticker/avaxusdt@ticker/dotusdt@ticker/trxusdt@ticker/linkusdt@ticker/maticusdt@ticker/uniusdt@ticker/ltcusdt@ticker";

    const connectWebSocket = () => {
      socket = new WebSocket(
        `wss://${process.env.WEBSOCKET_ENDPOINT}/ws/allticker/${query}`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          const pair = newData.stream.split("@")[0];

          setTickerData((prevData) => {
            const newDataCopy = { ...prevData };
            newDataCopy[pair] = newData.data;
            return newDataCopy;
          });

          setIsLoading(false);
        } catch (error) {
          console.error("Error parsing message data:", error);
          setError("Failed to parse WebSocket data");
        }
      };
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("WebSocket error");
      };

      socket.onclose = () => {
        setTimeout(connectWebSocket, 60 * 1000);
      };
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  return { tickerData, isLoading, error };
};
