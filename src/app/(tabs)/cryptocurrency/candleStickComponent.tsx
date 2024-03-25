"use client";
import { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  PriceScaleMode,
  TimeScaleOptions,
} from "lightweight-charts";
import { Tooltip } from "./tooltip";
import { formatChartingDate } from "@/app/_components/utils/formattingData";

interface ChartProps {
  formattedData: any[] | null;
  loading: boolean;
  interval: string;
}

export const CandleStickComponent = ({
  formattedData,
  loading,
  interval,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const secondSeries = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getTopColor = (data: any) => {
    const firstValue = data[0].price;
    const lastValue = data[data.length - 1].price;
    const difference = lastValue - firstValue;

    return difference >= 0 ? "#5bb450" : "red";
  };

  const getBottomColor = (data: any) => {
    const firstValue = data[0].price;
    const lastValue = data[data.length - 1].price;
    const difference = lastValue - firstValue;

    return difference >= 0 ? "#ffffe0" : "#FF7F7F";
  };

  useEffect(() => {
    if (!formattedData || !chartContainerRef.current || loading) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const timeVisible = /[mh]$/.test(interval);
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      autoSize: true,
      handleScroll: {
        pressedMouseMove: false,
        mouseWheel: false,
        horzTouchDrag: false,
        vertTouchDrag: false,
      },
      timeScale: {
        visible: true,
        timeVisible: timeVisible,
      },
      rightPriceScale: {
        mode: PriceScaleMode.Normal,
        autoScale: true,
        invertScale: false,
        alignLabels: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      },
    });
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#5bb450",
      borderUpColor: "#5bb450",
      wickUpColor: "#5bb450",
      downColor: "#ff0000",
      borderDownColor: "#ff0000",
      wickDownColor: "#ff0000",
    });

    const formatCandlestickData = formattedData.map((entry) => ({
      time: entry.time,
      open: entry.open,
      high: entry.high,
      low: entry.low,
      close: entry.close,
    }));
    candlestickSeries.setData(formatCandlestickData);
    seriesRef.current = candlestickSeries;

    const barSeries = chart.addHistogramSeries({
      color: "#5A5A5A",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    secondSeries.current = barSeries;
    barSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const formatVolume = formattedData.map((entry) => ({
      time: entry.time,
      value: entry.volume,
    }));

    const colorData = formatVolume.map((item, index) => {
      if (index === 0) return { ...item, color: "#5bb450" };
      const prevValue = formatVolume[index - 1].value;
      const color = item.value - prevValue >= 0 ? "#5bb450" : "#ff0000";
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
  }, [formattedData, interval, loading]);
  // const adjustedTime = interval.endsWith("m")
  const PHT_TO_GMT_OFFSET = -8 * 60 * 60 * 1000;
  const adjustedTime = /[mh]$/.test(interval)
    ? tooltipData?.time * 1000 + PHT_TO_GMT_OFFSET
    : tooltipData?.time;

  const togglerNo = "2";

  return (
    <div className="chart-container relative">
      <div className="chart" ref={chartContainerRef}></div>
      <div className="legend"></div>
      {tooltipData?.time && seriesRef.current && secondSeries.current && (
        <Tooltip
          time={adjustedTime}
          value={tooltipData?.seriesData?.get(seriesRef.current)?.value}
          volume={tooltipData?.seriesData?.get(secondSeries.current)?.value}
          high={tooltipData?.seriesData?.get(seriesRef.current)?.high}
          low={tooltipData?.seriesData?.get(seriesRef.current)?.low}
          open={tooltipData?.seriesData?.get(seriesRef.current)?.open}
          close={tooltipData?.seriesData?.get(seriesRef.current)?.close}
          x={tooltipData?.point?.x}
          y={tooltipData?.point?.y}
          togglerNo={togglerNo}
          tooltipData={tooltipData}
        />
      )}
    </div>
  );
};
