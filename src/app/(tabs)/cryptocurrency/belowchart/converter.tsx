"use client";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import { newFormatAmount } from "@/app/_components/utils/formatamount";
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
    const newValue = e.target.value;
    if (newValue === "" || newValue === ".") {
      setCurrencyValue("0");
    } else {
      setCurrencyValue(newValue);
    }
    const convertedValue = parseFloat(newValue) * conversionRate;
    setUsdValue(convertedValue.toFixed(2).toString());
  };

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || newValue === ".") {
      setUsdValue("0");
    } else {
      setUsdValue(newValue);
    }
    const convertedValue = parseFloat(newValue) / conversionRate;
    setCurrencyValue(convertedValue.toFixed(2).toString());
  };

  return (
    <div>
      <div className="font-semibold pt-3 mb-3 ml-3">
        {capitalizeFirstLetter(symbol)} to US Dollar converter
      </div>
      <div className="flex justify-between px-3 pb-3 relative">
        <span
          className="absolute left-5 top-[1px] transition-all text-[14px] font-bold text-black"
          style={{
            pointerEvents: "none",
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          {capitalizeFirstLetter(symbol)}
        </span>
        <input
          className="border-2 justify-center border-gray-300 focus:border-gray-300 border-solid rounded-lg px-2 pl-[63px] text-right text-[12px] font-extralight"
          style={{ width: "150px" }}
          value={newFormatAmount(currencyValue)}
          onChange={handleCurrencyChange}
        ></input>
        <span
          className="absolute right-[120px] top-[1px] transition-all text-[14px] font-bold text-black"
          style={{
            pointerEvents: "none",
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          USD
        </span>
        <input
          value={newFormatAmount(usdValue)}
          onChange={handleUsdChange}
          className="border-2 justify-center border-gray-300 focus:border-gray-300 border-solid rounded-lg px-2 pl-[63px] text-right text-[12px] font-extralight"
          style={{ width: "150px" }}
        ></input>
      </div>
    </div>
  );
};

export default Converter;
