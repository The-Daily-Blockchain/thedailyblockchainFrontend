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

  return (
    <div className="flex">
      <div>
        <Button
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
      <div className="mx-auto">
        <Button
          variant={activeButton === "1" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(timeStamps.oneDayAgo, "30m", "1"),
              onChangeMarketCapData(Days.oneDay);
          }}
        >
          1d
        </Button>
        <Button
          variant={activeButton === "2" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(timeStamps.sevenDaysAgo, "1h", "2");
            onChangeMarketCapData(Days.sevenDays);
          }}
        >
          7d
        </Button>
        <Button
          variant={activeButton === "3" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(timeStamps.thirtyDaysAgo, "2h", "3"),
              onChangeMarketCapData(Days.oneMonth);
          }}
        >
          1m
        </Button>
        <Button
          variant={activeButton === "4" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(timeStamps.sixMonthsAgo, "1d", "4"),
              onChangeMarketCapData(Days.sixMonths);
          }}
        >
          6m
        </Button>
        <Button
          variant={activeButton === "5" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(timeStamps.oneYearAgo, "3d", "5"),
              onChangeMarketCapData(Days.oneYear);
          }}
        >
          1y
        </Button>
        <Button
          variant={activeButton === "6" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(timeStamps.fiveYearsAgo, "1w", "6"),
              onChangeMarketCapData(Days.fiveYears);
          }}
        >
          5y
        </Button>
        <Button
          variant={activeButton === "7" ? undefined : "outline"}
          onClick={() => {
            handleButtonClick(max, "1w", "7"),
              onChangeMarketCapData(Days.maximum);
          }}
        >
          Max
        </Button>
      </div>
    </div>
  );
};

export default DynamicValues;
