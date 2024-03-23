"use client";
import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import { nameToSymbol } from "@/app/_components/utils/cryptomappings";
import React from "react";
import StreamComponent from "./streamcomponent";
import Charting from "./charting";
import PercentComponent from "./belowchart/percentComponent";

const CryptoPage = ({ params }: any) => {
  const name = params;
  const symbol = nameToSymbol[name];
  const symbolWithUSDT = symbol + "usdt";
  return (
    <div className="grid grid-cols-[1fr,2fr] justify-items-center items-center">
      <div className="border-r-2 pl-3 rounded-xl mt-10 w-[350px] shadow-2xl">
        <StreamComponent params={symbolWithUSDT} name={name} />
      </div>
      <div>
        <div className="shadow-2xl rounded-xl">
          <Charting symbol={symbolWithUSDT} />
        </div>
        <div className="shadow-2xl bg-white rounded-xl px-2 mt-3">
          <PercentComponent symbol={symbolWithUSDT} />
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;
