"use client";
import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import { nameToSymbol } from "@/app/_components/utils/cryptomappings";
import React from "react";
import StreamComponent from "./streamcomponent";
import Charting from "./charting";
import PercentComponent from "./belowchart/percentComponent";
import AllTime from "./belowchart/allTime";
import { useChartData } from "@/app/_components/hooks/useChartData";
import CryptoDetails from "./belowCrypto/cryptoDetails";
import CryptoPost from "./cryptopost/cryptoPost";
import CryptoHeader from "./cryptopost/cryptoHeader";
import Converter from "./belowchart/converter";
import { useLatestPrice } from "@/app/_components/hooks/useLatestPrice";
import LgBelow from "./lgbelow/lgBelow";

const CryptoPage = ({ params }: any) => {
  const name = params;

  const symbol = nameToSymbol[name];
  const symbolWithUSDT = symbol + "usdt";

  const { data: dataStream } = useCryptoStream(symbolWithUSDT) as {
    data: any;
  };

  const newSymbol = symbolWithUSDT.toUpperCase();
  const { data: chartData } = useChartData(newSymbol, null, "1w");
  const { data: Price } = useLatestPrice(newSymbol);

  const conversionRate = Price?.price;
  return (
    <>
      <div className="hidden lg:block">
        <div className="grid grid-cols-[1fr,2fr,1fr] 2xl:mx-[180px] mt-10 justify-items-center mb-10">
          <div className="w-[340px] ml-2">
            <div className="border-r-2 pl-3 rounded-xl  shadow-2xl">
              <StreamComponent name={name} dataStream={dataStream} />
            </div>
            <div className="shadow-2xl bg-white p-1 mb-3 rounded-xl">
              <Converter symbol={name} conversionRate={conversionRate} />
            </div>
            <div className="shadow-2xl bg-white p-1 rounded-xl">
              <AllTime
                chartData={chartData}
                dataStream={dataStream}
                symbol={name}
              />
            </div>
          </div>
          <div className="w-[620px] ml-10 xl:ml-2  xl:w-[530px] 2xl:w-[620px] ">
            <div className="shadow-2xl rounded-xl">
              <Charting symbol={symbolWithUSDT} />
            </div>
            <div className="shadow-2xl bg-white rounded-xl px-2 mt-3">
              <PercentComponent
                chartData={chartData}
                symbolWithUSDT={symbolWithUSDT}
                dataStream={dataStream}
              />
            </div>
            <div className="shadow-2xl bg-white rounded-xl p-2 mt-3">
              <CryptoDetails symbol={name} />
            </div>
            <div className="shadow-2xl xl:hidden font-semibold align-middle bg-white rounded-xl p-6 mt-3 mr-2">
              <CryptoHeader symbol={name} />
            </div>
            <div className="shadow-2xl xl:hidden bg-white rounded-xl px-2 mt-3 mr-2">
              <CryptoPost symbol={name} />
            </div>
          </div>
          <div className="hidden ml-3 xl:block w-[360px] 2xl:w-[400px] 2xl:mr-10">
            <div className="shadow-2xl font-semibold align-middle bg-white rounded-xl p-6 mt-3 mr-2">
              <CryptoHeader symbol={name} />
            </div>
            <div className="shadow-2xl bg-white rounded-xl px-2 mt-3 mr-2">
              <CryptoPost symbol={name} />
            </div>
          </div>
        </div>
      </div>
      <LgBelow
        symbolWithUSDT={symbolWithUSDT}
        chartData={chartData}
        dataStream={dataStream}
        name={name}
        conversionRate={conversionRate}
      />
    </>
  );
};

export default CryptoPage;
