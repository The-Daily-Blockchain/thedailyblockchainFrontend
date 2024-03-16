"use client";
import { createChart, PriceScaleMode } from "lightweight-charts";
import { useEffect, useRef } from "react";

const Charting = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      width: 700,
      height: 300,
      autoSize: false,
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
      bottomColor: "rgba(193,218,228, 0.04)",
      lineColor: "#000000",
      lineWidth: 2,
    });

    lineSeries.setData([
      { time: "2019-04-11", value: 0 },
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
      color: "rgba(193,218,228, 0.6)",
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
        <div className="chart" ref={chartContainerRef}></div>
        <div className="legend">
          <div className="legend-item">Area Chart (Line Series)</div>
          <div className="legend-item">Bar Chart</div>
        </div>
      </div>
    </>
  );
};

export default Charting;
