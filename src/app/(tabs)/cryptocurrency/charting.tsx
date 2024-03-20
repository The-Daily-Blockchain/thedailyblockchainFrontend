import { useEffect, useState } from "react";

import {
  formatChartingDate,
  formatDate,
} from "@/app/_components/utils/formattingData";
import { useChartData } from "@/app/_components/hooks/useChartData";
import { ChartComponent } from "./chartComponent";
import DynamicValues from "./dynamicChartValue";
import timeStamps from "@/app/_components/utils/dataValues";

interface Props {
  symbol: any;
}

const Charting = ({ symbol }: Props) => {
  const [formattedData, setFormattedData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<any>(
    null || timeStamps.sevenDaysAgo
  );
  const [interval, setInterval] = useState<any>(null || "1d");

  const params = symbol.toUpperCase();

  console.log(startTime, interval);
  const { data: chartData } = useChartData(params, startTime, interval);

  useEffect(() => {
    if (chartData && Array.isArray(chartData)) {
      const formatted = (chartData as string[][]).map((item: string[]) => ({
        time: item[0],
        price: parseFloat(item[1]),
        volume: parseFloat(item[5]),
      }));
      setFormattedData(formatted);
      setLoading(false);
    } else {
      setFormattedData(null);
      setLoading(false);
    }
  }, [chartData]);

  const handleData = (time: any, range: any) => {
    console.log(time, range);
    setStartTime(time);
    setInterval(range);
  };

  return (
    <>
      <DynamicValues onRangeSelect={handleData} />
      <ChartComponent formattedData={formattedData} loading={loading} />
    </>
  );
};

export default Charting;
