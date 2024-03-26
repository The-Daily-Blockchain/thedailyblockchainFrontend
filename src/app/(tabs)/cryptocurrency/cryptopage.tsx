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

  const { data: dataStream } = useCryptoStream(symbolWithUSDT) as { data: any };
  return (
    <div className="grid grid-cols-[1fr,2fr] justify-items-center items-center">
      <div className="border-r-2 pl-3 rounded-xl mt-10 w-[350px] shadow-2xl">
        <StreamComponent name={name} dataStream={dataStream} />
      </div>
      <div>
        <div className="shadow-2xl rounded-xl">
          <Charting symbol={symbolWithUSDT} />
        </div>
        <div className="shadow-2xl bg-white rounded-xl px-2 mt-3">
          <PercentComponent
            symbol={name}
            symbolWithUSDT={symbolWithUSDT}
            dataStream={dataStream}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptoPage;
