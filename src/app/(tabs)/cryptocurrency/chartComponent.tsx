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

export const ChartComponent = ({
  formattedData,
  loading,
  interval,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const secondSeries = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!formattedData || !chartContainerRef.current || loading) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }
    const chart = createChart(chartContainerRef.current, {
      width: 600,
      height: 300,
      autoSize: true,
      timeScale: {
        timeVisible: true,
      },
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
        top: 0.1,
        bottom: 0.4,
      },
    });

    const formatPrice = formattedData.map((entry) => ({
      time: entry.time,
      value: entry.price,
    }));
    lineSeries.setData(formatPrice);
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
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    const formatVolume = formattedData.map((entry) => ({
      time: entry.time,
      value: entry.volume,
    }));
    console.log(formatPrice);
    console.log(formatVolume);
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

    console.log("Formatted Data:", formattedData);

    chartRef.current.timeScale().fitContent();
    // chartRef.current.timeScale().ti(false);

    return () => {
      if (chartRef.current) {
        chartRef.current.unsubscribeCrosshairMove(updateToolTip);
      }
      setTooltipData(null);
    };
  }, [formattedData, loading]);

  const adjustedTime = interval.endsWith("m")
    ? tooltipData?.time * 1000
    : tooltipData?.time;

  return (
    <div className="chart-container relative">
      <div
        className="chart border-2 border-solid"
        ref={chartContainerRef}
      ></div>
      <div className="legend"></div>
      {tooltipData?.time && seriesRef.current && secondSeries.current && (
        <Tooltip
          time={adjustedTime}
          value={tooltipData?.seriesData?.get(seriesRef.current)?.value}
          volume={tooltipData?.seriesData?.get(secondSeries.current)?.value}
          x={tooltipData?.point?.x}
          y={tooltipData?.point?.y}
        />
      )}
    </div>
  );
};
