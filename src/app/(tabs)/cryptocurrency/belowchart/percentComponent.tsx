"use-client";
import { useTargetDatePrice } from "@/app/_components/hooks/useTargetDatePrice";
import { symbolToName } from "@/app/_components/utils/cryptomappings";
import React from "react";
interface Props {
  symbol: any;
}
const PercentComponent = ({ symbol }: Props) => {
  const newSymbol = symbolToName[symbol.replace(/usdt$/, "")];
  //   const { data } = useTargetDatePrice();
  return (
    <>
      <div>{newSymbol}</div>
      <div className="grid grid-cols-6 text-center">
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
      </div>
      <div className="grid grid-cols-6 text-center">
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
        <div>asd</div>
      </div>
    </>
  );
};

export default PercentComponent;
