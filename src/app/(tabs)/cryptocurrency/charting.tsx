"use client";
import { createChart, PriceScaleMode } from "lightweight-charts";
import { useEffect, useRef } from "react";

const Charting = () => {
  const chartContainerRef = useRef(null);

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

    const lineSeries = chart.addAreaSeries({
      topColor: "#5bb450",
      bottomColor: "#ffffe0",
      lineColor: "#123524",
      lineWidth: 1,
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

    const barSeries = chart.addHistogramSeries({
      color: "#5A5A5A",
      priceFormat: {
        type: "volume",
      },
    });

    barSeries.setData([
      { time: "2019-04-11", value: 30 },
      { time: "2019-04-12", value: 20 },
      { time: "2019-04-13", value: 25 },
      { time: "2019-04-14", value: 35 },
      { time: "2019-04-15", value: 28 },
      { time: "2019-04-16", value: 30 },
      { time: "2019-04-17", value: 20 },
      { time: "2019-04-18", value: 25 },
      { time: "2019-04-19", value: 35 },
      { time: "2019-04-20", value: 28 },
    ]);
  }, []);

  return (
    <>
      <div className="chart-container">
        <div
          className="chart border-2 border-solid"
          ref={chartContainerRef}
        ></div>
        <div className="legend"></div>
      </div>
    </>
  );
};

export default Charting;

// https://tradingview.github.io/lightweight-charts/tutorials/how_to/price-and-volume
