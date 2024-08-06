import { NextRequest, NextResponse } from "next/server";
import WebSocket from "ws";

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on("connection", (clientSocket: any, request: NextRequest) => {
  const url = new URL(request.url, `http://${request.headers.get("host")}`);
  const pathSegments = url.pathname.split("/");
  // get the last part of array
  const query = pathSegments[pathSegments.length - 1];

  const binanceSocket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${query}@ticker`
  );

  binanceSocket.on("message", (message: any) => {
    clientSocket.send(message);
  });

  clientSocket.on("close", () => {
    binanceSocket.close();
  });
});

export async function GET(request: NextRequest) {
  // Ensure it's a WebSocket upgrade request
  if (request.headers.get("Upgrade") !== "websocket") {
    return new NextResponse("Upgrade Required", { status: 426 });
  }

  // Upgrade request to WebSocket
  return new NextResponse("WebSocket server running");
}

export const config = {
  runtime: "nodejs",
};
