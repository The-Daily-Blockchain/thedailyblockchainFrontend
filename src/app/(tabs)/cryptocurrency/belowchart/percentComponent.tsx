"use-client";
import { useTargetDatePrice } from "@/app/_components/hooks/useTargetDatePrice";
import { symbolToName } from "@/app/_components/utils/cryptomappings";
import NumberFormatter from "@/app/_components/utils/numberFormater";
import React from "react";
interface Props {
  symbol: any;
  dataStream: any;
}
const PercentComponent = ({ symbol, dataStream }: Props) => {
  const { data: datePrice } = useTargetDatePrice(symbol);
  const sevenDays = datePrice?.[0]?.market_data?.current_price?.usd;
  const thirtyDays = datePrice?.[1]?.market_data?.current_price?.usd;
  const sixMonths = datePrice?.[2]?.market_data?.current_price?.usd;
  const oneYear = datePrice?.[3]?.market_data?.current_price?.usd;
  const fiveYears = datePrice?.[4]?.market_data?.current_price?.usd;

  return (
    <div className="py-2">
      <div className="grid grid-cols-6 text-center pb-1 mb-1 border-b-2">
        <div>1d</div>
        <div>7d</div>
        <div>1m</div>
        <div>6m</div>
        <div>1y</div>
        <div>5y</div>
      </div>
      <div className="grid grid-cols-6 text-center overflow-hidden">
        <div>
          <NumberFormatter value={parseFloat(dataStream.P).toFixed(2)} />
        </div>
        <div>
          <NumberFormatter
            value={((dataStream.w / sevenDays) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={((dataStream.w / thirtyDays) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={((dataStream.w / sixMonths) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={((dataStream.w / oneYear) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={((dataStream.w / fiveYears) * 100).toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default PercentComponent;
