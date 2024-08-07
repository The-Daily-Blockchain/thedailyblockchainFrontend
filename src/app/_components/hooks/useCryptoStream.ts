import { useEffect, useState } from "react";

export const useCryptoStream = (query: string) => {
  const [data, setTickerData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
      try {
        socket = new WebSocket(
          // `wss://${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}/ws/singleticker/${query}`
          `wss://stream.binance.com:9443/ws/${query}@ticker`
        );

        socket.onmessage = (event) => {
          try {
            const newData = JSON.parse(event.data);
            setTickerData(newData);
            setIsLoading(false);
          } catch (e) {
            console.error("Failed to parse WebSocket message:", e);
            setError("Failed to parse data");
          }
        };

        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          setError("WebSocket error");
        };

        socket.onclose = () => {
          console.log("WebSocket closed, reconnecting...");
          setTimeout(connectWebSocket, 60 * 1000);
        };
      } catch (e) {
        console.error("Failed to connect WebSocket:", e);
        setError("Failed to connect WebSocket");
      }
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [query]);

  return { data, isLoading, error };
};
