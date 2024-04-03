import { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  PriceScaleMode,
  TimeScaleOptions,
} from "lightweight-charts";
import { Tooltip } from "./tooltip";
import { formatChartingDate } from "@/app/_components/utils/formattingDate";

interface ChartProps {
  formattedData: any[] | null;
  loading: boolean;
  interval?: any;
  stringTogler: string;
}

export const ChartComponent = ({
  formattedData,
  loading,
  interval,
  stringTogler,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const secondSeries = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getTopColor = (data: any) => {
    const firstValue = data[0]?.price;
    const lastValue = data[data.length - 1]?.price;
    const difference = lastValue - firstValue;

    return difference >= 0 ? "#5bb450" : "red";
  };

  const getBottomColor = (data: any) => {
    const firstValue = data[0]?.price;
    const lastValue = data[data.length - 1]?.price;
    const difference = lastValue - firstValue;

    return difference >= 0 ? "#ffffe0" : "#FF7F7F";
  };

  useEffect(() => {
    if (!formattedData || !chartContainerRef.current || loading) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }
    const chartContainer = chartContainerRef.current;
    const containerWidth = chartContainer ? chartContainer.clientWidth : 660;

    const timeVisible = /[mh]$/.test(interval);
    const chart = createChart(chartContainer, {
      width: containerWidth,
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
          top: 0.3,
          bottom: 0,
        },
      },
    });
    chartRef.current = chart;

    const lineSeries = chart.addAreaSeries({
      topColor: getTopColor(formattedData),
      bottomColor: getBottomColor(formattedData),
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
  const togglerNo = stringTogler;
  // const adjustedTime = interval.endsWith("m")
  const PHT_TO_GMT_OFFSET = -8 * 60 * 60 * 1000;
  const adjustedTime = /[mh]$/.test(interval)
    ? tooltipData?.time * 1000 + PHT_TO_GMT_OFFSET
    : togglerNo === "3"
    ? tooltipData?.time * 1000 + PHT_TO_GMT_OFFSET
    : tooltipData?.time;

  return (
    <div className="chart-container relative">
      <div className="chart" ref={chartContainerRef}></div>
      <div className="legend"></div>
      {tooltipData?.time && seriesRef.current && secondSeries.current && (
        <Tooltip
          time={adjustedTime}
          value={tooltipData?.seriesData?.get(seriesRef.current)?.value}
          volume={tooltipData?.seriesData?.get(secondSeries.current)?.value}
          x={tooltipData?.point?.x}
          y={tooltipData?.point?.y}
          togglerNo={togglerNo}
        />
      )}
    </div>
  );
};
