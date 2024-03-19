"use client";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  PriceScaleMode,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "./tooltip";

import {
  formatChartingDate,
  formatDate,
} from "@/app/_components/utils/formattingData";
import { useChartData } from "@/app/_components/hooks/useChartData";
import { ChartComponent } from "./chartComponent";
import DynamicValues from "./dynamicChartValue";

interface Props {
  symbol: any;
}

const Charting = ({ symbol }: Props) => {
  const [formattedData, setFormattedData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const currentDate = new Date();
  const params = symbol.toUpperCase();
  const startTime = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  const interval = "1d";

  const { data: chartData } = useChartData(params, startTime, interval);

  useEffect(() => {
    if (chartData && Array.isArray(chartData)) {
      const formatted = (chartData as string[][]).map((item: string[]) => ({
        time: formatChartingDate(item[0]),
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

  return (
    <>
      <DynamicValues />
      <ChartComponent formattedData={formattedData} loading={loading} />
    </>
  );
};

export default Charting;
