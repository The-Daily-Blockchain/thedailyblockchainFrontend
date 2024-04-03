"use client";
import React from "react";
import Charting from "../charting";
import PercentComponent from "../belowchart/percentComponent";
import CryptoDetails from "../belowCrypto/cryptoDetails";
import CryptoHeader from "../cryptopost/cryptoHeader";
import CryptoPost from "../cryptopost/cryptoPost";
import Converter from "../belowchart/converter";
import AllTime from "../belowchart/allTime";

interface Props {
  symbolWithUSDT: any;
  chartData: any;
  dataStream: any;
  name: any;
  conversionRate: any;
}

const LgBelow = ({
  symbolWithUSDT,
  chartData,
  dataStream,
  name,
  conversionRate,
}: Props) => {
  return (
    <div className="block lg:hidden sm:w-[620px] mx-auto mb-10">
      {" "}
      <div className="shadow-2xl rounded-xl">
        <Charting symbol={symbolWithUSDT} />
      </div>
      <div className="shadow-2xl bg-white p-1 mb-3 rounded-xl">
        <Converter symbol={name} conversionRate={conversionRate} />
      </div>
      <div className="shadow-2xl bg-white p-1 rounded-xl">
        <AllTime chartData={chartData} dataStream={dataStream} symbol={name} />
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
  );
};

export default LgBelow;
