"use client";
import { convertSymbolToName } from "@/app/_components/utils/convertsymboltoname";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { useGetGraph } from "@/app/_components/utils/sevenday";
import { useWebSocket } from "./usewebsocket";
import Loader from "@/app/loader";
import { useDailyCurrencyFetch } from "@/app/_components/utils/usedailycurrencyfetch";
import { useRouter } from "next/navigation";
import { symbolToName } from "../../_components/utils/cryptomappings";
import { newFormatAmount } from "@/app/_components/utils/formatamount";

type TickerData = {
  p: any;
  P: any;
  w: any;
  x: any;
  Q: any;
  b: any;
  B: any;
  a: any;
  A: any;
  O: any;
  C: any;
  F: any;
  L: any;
  n: any;
  e: string;
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
};

const Page = () => {
  const { tickerData, isLoading } = useWebSocket();
  const router = useRouter();
  const dataGraph = useGetGraph();
  const { data: exchangeRate } = useDailyCurrencyFetch();

  const formattedData = Object.entries(dataGraph.data).reduce<{
    [symbol: string]: { time: string; price: any }[];
  }>((result, [symbol, dataArray]) => {
    if (Array.isArray(dataArray)) {
      const formattedSymbolData = dataArray.map((dataPoint: any[]) => ({
        time: new Date(dataPoint[6]).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        price: parseFloat(dataPoint[4]).toFixed(2),
      }));
      result[symbol] = formattedSymbolData;
    }
    return result;
  }, {});

  const getPriceChangeColor = (data: any[]): string => {
    if (data.length < 2) {
      return "#8884d8";
    }
    const earliestPrice = parseFloat(data[0].price);
    const latestPrice = parseFloat(data[data.length - 1].price);
    return latestPrice > earliestPrice ? "green" : "red";
  };

  if (isLoading || !dataGraph.data) return <Loader />;

  const handleClick = (pair: string) => {
    const pairWithoutUSDT = pair.replace("usdt", "");
    const symbol = pairWithoutUSDT.split("/")[0];
    if (symbolToName[symbol]) {
      const pairWithName = pairWithoutUSDT.replace(
        symbol,
        symbolToName[symbol]
      );
      router.push(`/cryptocurrency/${pairWithName}`);
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen sm:mx-20 xl:mx-[130px]"
        style={{
          overflowX: "auto",
          scrollbarColor: "transparent transparent",
          msOverflowStyle: "none",
        }}
      >
        <Table className="mt-2">
          <TableHeader>
            <TableRow className="font-xl">
              <TableHead className="w-[10px] sticky left-0 bg-white z-10"></TableHead>
              <TableHead className="w-[70px] sticky left-12 bg-white z-10">
                Cryptocurrency
              </TableHead>
              <TableHead className="text-right w-[100px]">
                24hr Price change
              </TableHead>
              <TableHead className="text-right w-[100px]">
                24hr Price change%
              </TableHead>
              <TableHead className="text-right w-[100px]">Price PHP</TableHead>
              <TableHead className="text-right w-[100px]">Price USD</TableHead>
              <TableHead className="text-right w-[100px]">High 24hr</TableHead>
              <TableHead className="text-right w-[100px]">Low 24hr</TableHead>
              <TableHead className="text-right w-[100px]">Volume USD</TableHead>
              <TableHead className="text-center w-[60px]"></TableHead>
              <TableHead className="text-left w-[100px]">7 Day graph</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(tickerData)
              .sort((pairA: any, pairB: any) => {
                const bidPriceA = parseFloat(tickerData[pairA].q);
                const bidPriceB = parseFloat(tickerData[pairB].q);
                return bidPriceB - bidPriceA;
              })
              .map((pair: any) => (
                <TableRow
                  key={pair}
                  onClick={() => handleClick(pair)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className="w-[10px] sticky left-0 bg-white z-10">
                    <div style={{ width: "32px", height: "30px" }}>
                      <Image
                        className="rounded-full"
                        src={
                          convertSymbolToName(
                            tickerData[pair].s.replace("USDT", "")
                          ).imageUrl
                        }
                        alt={"Symbol"}
                        width={30}
                        height={30}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="w-[70px] sticky left-12 bg-white z-10">
                    {
                      convertSymbolToName(
                        tickerData[pair].s.replace("USDT", "")
                      ).name
                    }
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        parseFloat(tickerData[pair].p) < 0 ? "red" : "green",
                    }}
                    className="text-right w-[100px]"
                  >
                    $ {parseFloat(tickerData[pair].p).toLocaleString()}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        parseFloat(tickerData[pair].P) < 0 ? "red" : "green",
                    }}
                    className="text-right w-[100px]"
                  >
                    {parseFloat(tickerData[pair].P).toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ₱
                    {exchangeRate &&
                      tickerData[pair].w &&
                      newFormatAmount(
                        exchangeRate * parseFloat(tickerData[pair].w)
                      )}
                  </TableCell>
                  <TableCell className="text-right w-[100px]">
                    ${newFormatAmount(parseFloat(tickerData[pair].w))}
                  </TableCell>
                  <TableCell className="text-right w-[100px]">
                    {newFormatAmount(parseFloat(tickerData[pair].h))}
                  </TableCell>
                  <TableCell className="text-right w-[100px]">
                    {newFormatAmount(parseFloat(tickerData[pair].l))}
                  </TableCell>
                  <TableCell className="text-right w-[140px]">
                    {newFormatAmount(parseFloat(tickerData[pair].q))}
                  </TableCell>
                  <TableCell></TableCell>
                  <AreaChart
                    width={210}
                    height={60}
                    data={formattedData[pair] || []}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
                        <stop
                          offset="10%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="90%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={getPriceChangeColor(formattedData[pair] || [])}
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="justify-center align-center flex font-bold mb-3">
        <div className="mr-3 pt-[4px] text-[20px] text-[#F3BA2F]">
          Powered by
        </div>
        <Image
          src="/binance_logo.svg.png"
          alt="binance"
          width={200}
          height={10}
        />
      </div>
    </>
  );
};

export default Page;
