"use client";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  PriceScaleMode,
} from "lightweight-charts";
import { useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "./tooltip";

import {
  formatChartingDate,
  formatDate,
} from "@/app/_components/utils/formattingData";
import { useChartData } from "@/app/_components/hooks/useChartData";

interface Props {
  symbol: any;
}

const Charting = ({ symbol }: Props) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const secondSeries = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [formattedData, setFormattedData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const currentDate = new Date();
  const params = symbol.toUpperCase();
  const startTime = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
  const interval = "1d";
  const { data: chartData } = useChartData(params, startTime, interval);
  console.log(chartData);
  // useEffect(() => {
  //   if (Array.isArray(chartData)) {
  //     const formatted = chartData.map((item: string[]) => ({
  //       time: formatChartingDate(item[0]),
  //       price: parseFloat(item[1]),
  //       volume: parseFloat(item[5]),
  //     }));
  //     console.log(formatted);
  //     setFormattedData(formatted);
  //     setLoading(false);
  //   } else {
  //     setFormattedData(null);
  //     setLoading(false);
  //   }
  // }, [chartData]);

  // console.log(formattedData);
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      autoSize: true,
      rightPriceScale: {
        mode: PriceScaleMode.Normal,
        autoScale: false,
        invertScale: false,
        alignLabels: false,
        scaleMargins: {
          top: 0.3,
          bottom: 0,
        },
      },
    });
    chartRef.current = chart;

    const lineSeries = chart.addAreaSeries({
      topColor: "#5bb450",
      bottomColor: "#ffffe0",
      lineColor: "#123524",
      lineWidth: 1,
      crosshairMarkerVisible: false,
    });

    lineSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1, // highest point of the series will be 10% away from the top
        bottom: 0.4, // lowest point will be 40% away from the bottom
      },
    });

    // lineSeries.setData(formatPrice);
    const formatPrice = formattedData?.map((entry) => ({
      time: entry.time,
      value: entry.price,
    }));
    console.log("formatPrice:", formatPrice);

    const data = [
      { time: "2024-03-18", value: 25 },
      { time: "2024-03-19", value: 30 },
      { time: "2024-03-20", value: 28 },
      { time: "2024-03-21", value: 32 },
      { time: "2024-03-22", value: 35 },
      { time: "2024-03-23", value: 40 },
      { time: "2024-03-24", value: 38 },
      { time: "2024-03-25", value: 42 },
    ];

    lineSeries.setData(data);

    seriesRef.current = lineSeries;

    const barSeries = chart.addHistogramSeries({
      color: "#5A5A5A",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    secondSeries.current = barSeries;

    barSeries.priceScale().applyOptions({
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });

    const formatVolume = formattedData?.map((entry) => ({
      time: entry.time,
      value: entry.volume,
    }));
    console.log();

    const colorData = data.map((item, index) => {
      if (index === 0) return { ...item, color: "#000000" }; // Initial color
      const prevValue = data[index - 1].value;
      const color = item.value - prevValue >= 0 ? "#5bb450" : "#ff0000"; // Green for positive, red for negative
      return { ...item, color };
    });
    barSeries.setData(colorData);

    const updateToolTip = (param: any) => {
      setTooltipData(param);
      if (param.point) {
        const x = param.point.x;
        const y = param.point.y;
        setTooltipPosition({ x, y });
      }
    };

    chartRef.current.subscribeCrosshairMove(updateToolTip);
    chartRef.current.timeScale().fitContent();

    return () => {
      if (chartRef.current) {
        chartRef.current.unsubscribeCrosshairMove(updateToolTip);
      }
      setTooltipData(null);
    };
  }, []);

  return (
    <>
      <div className="chart-container relative">
        <div
          className="chart border-2 border-solid"
          ref={chartContainerRef}
        ></div>
        <div className="legend"></div>
        {tooltipData?.time && seriesRef.current && secondSeries.current && (
          <Tooltip
            time={tooltipData?.time}
            value={tooltipData?.seriesData?.get(seriesRef.current)?.value}
            volume={tooltipData?.seriesData?.get(secondSeries.current)?.value}
            x={tooltipData?.point?.x}
            y={tooltipData?.point?.y}
          />
        )}
      </div>
    </>
  );
};

export default Charting;
