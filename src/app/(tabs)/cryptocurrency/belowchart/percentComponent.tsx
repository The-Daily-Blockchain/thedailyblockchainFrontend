"use-client";
import { useTargetDatePrice } from "@/app/_components/hooks/useTargetDatePrice";
import { symbolToName } from "@/app/_components/utils/cryptomappings";
import React from "react";
interface Props {
  symbol: any;
  dataStream: any;
}
const PercentComponent = ({ symbol, dataStream }: Props) => {
  const newSymbol = symbolToName[symbol.replace(/usdt$/, "")];
  console.log(dataStream);
  //   const { data } = useTargetDatePrice();
  return (
    <div className="py-2">
      <div className="grid grid-cols-7 text-center pb-1 mb-1 border-b-2">
        <div>1d</div>
        <div>7d</div>
        <div>1m</div>
        <div>6m</div>
        <div>1y</div>
        <div>5y</div>
        <div>max</div>
      </div>
      <div className="grid grid-cols-7 text-center">
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
      </div>
    </div>
  );
};

export default PercentComponent;
