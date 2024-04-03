"use client";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import {
  formatNumberWithCommas,
  removeLeadingZeros,
} from "@/app/_components/utils/formatamount";
import React, { useEffect, useState } from "react";

interface Props {
  symbol: string;
  conversionRate: number;
}

const Converter = ({ symbol, conversionRate }: Props) => {
  const [currencyValue, setCurrencyValue] = useState("1");
  const [usdValue, setUsdValue] = useState<any>(
    conversionRate != null ? conversionRate.toString() : "0"
  );

  useEffect(() => {
    if (conversionRate != null) {
      setUsdValue(conversionRate.toString());
    }
  }, [conversionRate]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || "0";
    setCurrencyValue(removeLeadingZeros(newValue));
    const convertedValue = parseFloat(newValue) * conversionRate;
    setUsdValue(formatNumberWithCommas(convertedValue));
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value || "0";
    setUsdValue(removeLeadingZeros(newValue));
    const convertedValue = parseFloat(newValue) / conversionRate;
    setCurrencyValue(formatNumberWithCommas(convertedValue));
  };

  return (
    <div>
      <div className="font-semibold pt-3 mb-3 ml-3">
        {capitalizeFirstLetter(symbol)} to US Dollar converter
      </div>
      <div className="hidden lg:block">
        <div className="flex justify-between px-3 pb-3 relative">
          <span
            className="absolute left-5 top-[4px] transition-all text-[14px] font-bold text-black"
            style={{
              pointerEvents: "none",
              color: "rgba(0, 0, 0, 0.4)",
            }}
          >
            {capitalizeFirstLetter(symbol)}
          </span>
          <input
            className="border-2 justify-center border-gray-300 focus:border-gray-300 border-solid rounded-lg px-2 pl-[63px] text-right text-[12px] font-extralight py-1"
            style={{ width: "150px" }}
            value={currencyValue}
            onChange={handleCurrencyChange}
          ></input>
          <span
            className="absolute right-[120px] top-[4px] transition-all text-[14px] font-bold text-black"
            style={{
              pointerEvents: "none",
              color: "rgba(0, 0, 0, 0.4)",
            }}
          >
            USD
          </span>
          <input
            value={usdValue}
            onChange={handleUsdChange}
            className="border-2 justify-center border-gray-300 focus:border-gray-300 border-solid rounded-lg px-2 pl-[63px] text-right text-[12px] font-extralight py-1"
            style={{ width: "150px" }}
          ></input>
        </div>
      </div>
      {/* single grid component */}
      {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      <div className="block lg:hidden">
        <div className="flex justify-between px-3 pb-3 relative">
          <span
            className="absolute left-5 top-[4px] transition-all text-[14px] font-bold text-black"
            style={{
              pointerEvents: "none",
              color: "rgba(0, 0, 0, 0.4)",
            }}
          >
            {capitalizeFirstLetter(symbol)}
          </span>
          <input
            className="mr-2 flex-grow border-2 border-gray-300 focus:border-gray-300 border-solid rounded-lg px-2 pl-[63px] text-right text-[12px] font-extralight py-1"
            style={{ width: "150px" }}
            value={currencyValue}
            onChange={handleCurrencyChange}
          ></input>
          <span
            className="absolute right-[120px] top-[4px] transition-all text-[14px] font-bold text-black"
            style={{
              pointerEvents: "none",
              color: "rgba(0, 0, 0, 0.4)",
            }}
          >
            USD
          </span>
          <input
            value={usdValue}
            onChange={handleUsdChange}
            className="ml-2 flex-grow border-2 justify-center border-gray-300 focus:border-gray-300 border-solid rounded-lg px-2 pl-[63px] text-right text-[12px] font-extralight py-1"
            style={{ width: "150px" }}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default Converter;
