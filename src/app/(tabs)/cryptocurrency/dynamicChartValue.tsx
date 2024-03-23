"use client";
import timeStamps, { Days } from "@/app/_components/utils/dataValues";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdOutlineCandlestickChart, MdOutlineShowChart } from "react-icons/md";

const DynamicValues = ({
  onRangeSelect,
  onChangeChart,
  onChangeMarketCapData,
  handleMarketCap,
}: any) => {
  const [activeButton, setActiveButton] = useState<string | null>("2");
  const [activeChart, setActiveChart] = useState<string>("1");

  const handleButtonClick = (time: any, range: any, active: any) => {
    onRangeSelect(time, range);
    setActiveButton(active);
  };

  const max = 1;
  const handleChartClick = (active: any) => {
    setActiveChart(active);
  };

  const handleMarketData = (day: any, active: any) => {
    onChangeMarketCapData(day);
    setActiveButton(active);
  };

  return (
    <div className="flex mb-3">
      <div>
        <Button
          className="mr-2"
          variant={activeChart === "1" ? undefined : "outline"}
          onClick={() => {
            handleChartClick("1"), onChangeChart("1");
          }}
        >
          <MdOutlineShowChart />
        </Button>
        {handleMarketCap !== "2" && (
          <Button
            variant={activeChart === "2" ? undefined : "outline"}
            onClick={() => {
              handleChartClick("2"), onChangeChart("2");
            }}
          >
            <MdOutlineCandlestickChart />
          </Button>
        )}
      </div>
      <div className="mx-auto mb-2">
        <Button
          className="mr-1"
          variant={activeButton === "1" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(timeStamps.oneDayAgo, "30m", "1")
              : handleMarketCap === "2"
              ? handleMarketData(Days.oneDay, "1")
              : undefined;
          }}
        >
          1d
        </Button>
        <Button
          className="mr-1"
          variant={activeButton === "2" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(timeStamps.sevenDaysAgo, "1h", "2")
              : handleMarketCap === "2"
              ? handleMarketData(Days.sevenDays, "2")
              : undefined;
          }}
        >
          7d
        </Button>
        <Button
          className="mr-1"
          variant={activeButton === "3" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(timeStamps.thirtyDaysAgo, "2h", "3")
              : handleMarketCap === "2"
              ? handleMarketData(Days.oneMonth, "3")
              : undefined;
          }}
        >
          1m
        </Button>
        <Button
          className="mr-1"
          variant={activeButton === "4" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(timeStamps.sixMonthsAgo, "1d", "4")
              : handleMarketCap === "2"
              ? handleMarketData(Days.sixMonths, "4")
              : undefined;
          }}
        >
          6m
        </Button>
        <Button
          className="mr-1"
          variant={activeButton === "5" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(timeStamps.oneYearAgo, "3d", "5")
              : handleMarketCap === "2"
              ? handleMarketData(Days.oneYear, "5")
              : undefined;
          }}
        >
          1y
        </Button>
        <Button
          className="mr-1"
          variant={activeButton === "6" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(timeStamps.fiveYearsAgo, "1w", "6")
              : handleMarketCap === "2"
              ? handleMarketData(Days.fiveYears, "6")
              : undefined;
          }}
        >
          5y
        </Button>
        <Button
          variant={activeButton === "7" ? undefined : "outline"}
          onClick={() => {
            handleMarketCap === "1"
              ? handleButtonClick(max, "1w", "7")
              : handleMarketCap === "2"
              ? handleMarketData(Days.maximum, "7")
              : undefined;
          }}
        >
          Max
        </Button>
      </div>
    </div>
  );
};

export default DynamicValues;
