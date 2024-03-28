"use-client";
import NumberFormatter from "@/app/_components/utils/numberFormater";
import React from "react";
interface Props {
  dataStream: any;
  symbolWithUSDT: any;
  chartData?: any[];
}
const PercentComponent = ({ dataStream, chartData }: Props) => {
  const sevenDays = chartData?.[chartData.length - 2]?.[4];
  const thirtyDays = chartData?.[chartData.length - 5]?.[4];
  const sixMonths = chartData?.[chartData.length - 27]?.[4];
  const oneYear = chartData?.[chartData.length - 53]?.[4];
  const fiveYears = chartData?.[chartData.length - 260]?.[4];
  const maxYears = chartData?.[0]?.[4];

  // binance api not working?

  return (
    <div className="py-2 ">
      <div className="grid  grid-cols-7 text-center pb-1 mb-1 border-b-2">
        <div>1d</div>
        <div>7d</div>
        <div>1m</div>
        <div>6m</div>
        <div>1y</div>
        <div>5y</div>
        <div>Max</div>
      </div>
      <div className="grid grid-cols-7 text-center pr-2">
        <div>
          <NumberFormatter value={parseFloat(dataStream.P).toFixed(2)} />
        </div>
        <div>
          <NumberFormatter
            value={(((dataStream.w - sevenDays) / sevenDays) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={(((dataStream.w - thirtyDays) / thirtyDays) * 100).toFixed(
              2
            )}
          />
        </div>
        <div>
          <NumberFormatter
            value={(((dataStream.w - sixMonths) / sixMonths) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={(((dataStream.w - oneYear) / oneYear) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={(((dataStream.w - fiveYears) / fiveYears) * 100).toFixed(2)}
          />
        </div>
        <div>
          <NumberFormatter
            value={(((dataStream.w - maxYears) / maxYears) * 100).toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default PercentComponent;
