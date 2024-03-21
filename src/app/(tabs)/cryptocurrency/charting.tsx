import { useEffect, useState } from "react";
import { useChartData } from "@/app/_components/hooks/useChartData";
import { ChartComponent } from "./chartComponent";
import DynamicValues from "./dynamicChartValue";
import timeStamps from "@/app/_components/utils/dataValues";
import { formatChartingDate } from "@/app/_components/utils/formattingData";

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
        console.log("formattedTime", formattedTime);

        return {
          time: formattedTime,
          price: parseFloat(item[1]),
          volume: parseFloat(item[5]),
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
    console.log(time, range);
    setStartTime(time);
    setInterval(range);
  };

  return (
    <>
      <DynamicValues onRangeSelect={handleData} />
      <ChartComponent
        formattedData={formattedData}
        loading={loading}
        interval={interval}
      />
    </>
  );
};

export default Charting;
