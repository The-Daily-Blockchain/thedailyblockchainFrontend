import { useEffect, useState } from "react";
import { useChartData } from "@/app/_components/hooks/useChartData";
import { ChartComponent } from "./chartComponent";
import DynamicValues from "./dynamicChartValue";
import timeStamps from "@/app/_components/utils/dataValues";
import { formatChartingDate } from "@/app/_components/utils/formattingData";
import { CandleStickComponent } from "./candleStickComponent";
import ButtonMarket from "./buttonMarket";
import { symbolToName } from "@/app/_components/utils/cryptomappings";
import { useMarketHistory } from "@/app/_components/hooks/useMarketHistory";

interface Props {
  symbol: any;
}

const Charting = ({ symbol }: Props) => {
  const [formattedData, setFormattedData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<any>(
    null || timeStamps.sevenDaysAgo
  );
  const [interval, setInterval] = useState<any>(null || "15m");
  const [toggle, setToggle] = useState<any>("1");
  const [marketPriceToggler, setMarketPriceToggler] = useState<string>("1");
  const [marketcapDays, setMarketcapDays] = useState<string>("2");
  const [marketFormatter, setMarketFormatter] = useState<any | null>(null);

  const params = symbol.toUpperCase();
  const { data: chartData } = useChartData(params, startTime, interval);
  const GMT_TO_PHT_OFFSET = 8 * 60 * 60; // 8 hours difference

  useEffect(() => {
    if (chartData && Array.isArray(chartData)) {
      const formatted = (chartData as string[][]).map((item: string[]) => {
        // const formattedTime = interval.endsWith("m")
        const formattedTime = /[mh]$/.test(interval)
          ? parseFloat(item[0]) / 1000 + GMT_TO_PHT_OFFSET
          : formatChartingDate(item[0]);

        return {
          time: formattedTime,
          price: parseFloat(item[1]),
          volume: parseFloat(item[5]),
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        };
      });
      setFormattedData(formatted);
      setLoading(false);
    } else {
      setFormattedData(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  const handleData = (time: any, range: any) => {
    setStartTime(time);
    setInterval(range);
  };

  const handleChart = (params: any) => {
    setToggle(params);
  };

  const newSymbol = symbolToName[symbol.replace(/usdt$/, "")];
  const { data: marketHistory } = useMarketHistory(
    newSymbol,
    "usd",
    marketcapDays
  );
  useEffect(() => {
    const formattedHistoryData = marketHistory?.market_caps.map(
      (item: string[], index: any) => ({
        time: parseFloat(item[0]) / 1000 + GMT_TO_PHT_OFFSET,
        price: item[1],
        volume: marketHistory?.total_volumes[index][1],
      })
    );
    setMarketFormatter(formattedHistoryData);
  }, [GMT_TO_PHT_OFFSET, marketHistory]);

  const handleMarketCap = (params: any) => {
    setMarketPriceToggler(params);
  };
  const onChangeMarketCapData = (data: any) => {
    setMarketcapDays(data);
  };

  return (
    <>
      <div className=" mb-1 pl-1 rounded-xl shadow-2xl">
        <ButtonMarket onChangeMarketCap={handleMarketCap} />
        <DynamicValues
          onRangeSelect={handleData}
          onChangeChart={handleChart}
          onChangeMarketCapData={onChangeMarketCapData}
          handleMarketCap={marketPriceToggler}
        />
      </div>
      {marketPriceToggler === "1" && (
        <div>
          {toggle === "1" && (
            <ChartComponent
              formattedData={formattedData}
              loading={loading}
              interval={interval}
              stringTogler={"1"}
            />
          )}
          {toggle === "2" && (
            <CandleStickComponent
              formattedData={formattedData}
              loading={loading}
              interval={interval}
            />
          )}
        </div>
      )}

      {marketPriceToggler === "2" && (
        <>
          <ChartComponent
            formattedData={marketFormatter}
            loading={false}
            stringTogler={"3"}
          />
        </>
      )}
    </>
  );
};

export default Charting;
