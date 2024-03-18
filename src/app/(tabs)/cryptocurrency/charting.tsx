"use client";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  PriceScaleMode,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "./tooltip";

const Charting = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const secondSeries = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

    lineSeries.setData([
      { time: "2019-04-11", value: 93 },
      { time: "2019-04-12", value: 96.63 },
      { time: "2019-04-13", value: 76.64 },
      { time: "2019-04-14", value: 81.89 },
      { time: "2019-04-15", value: 74.43 },
      { time: "2019-04-16", value: 80.01 },
      { time: "2019-04-17", value: 96.63 },
      { time: "2019-04-18", value: 76.64 },
      { time: "2019-04-19", value: 81.89 },
      { time: "2019-04-20", value: 74.43 },
    ]);
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

    // barSeries.setData([
    //   { time: "2019-04-11", value: 30 },
    //   { time: "2019-04-12", value: 20 },
    //   { time: "2019-04-13", value: 25 },
    //   { time: "2019-04-14", value: 35 },
    //   { time: "2019-04-15", value: 28 },
    //   { time: "2019-04-16", value: 30 },
    //   { time: "2019-04-17", value: 20 },
    //   { time: "2019-04-18", value: 25 },
    //   { time: "2019-04-19", value: 35 },
    //   { time: "2019-04-20", value: 2800 },
    // ]);
    const data = [
      { time: "2019-04-11", value: 30 },
      { time: "2019-04-12", value: 20 },
      { time: "2019-04-13", value: 25 },
      { time: "2019-04-14", value: 35 },
      { time: "2019-04-15", value: 28 },
      { time: "2019-04-16", value: 30 },
      { time: "2019-04-17", value: 20 },
      { time: "2019-04-18", value: 25 },
      { time: "2019-04-19", value: 35 },
      { time: "2019-04-20", value: 40 },
    ];

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
  console.log("tooltipdata", tooltipData);
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
