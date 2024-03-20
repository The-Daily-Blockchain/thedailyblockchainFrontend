"use client";
import timeStamps from "@/app/_components/utils/dataValues";
import React, { useState } from "react";

const DynamicValues = ({ onRangeSelect }: any) => {
  const [startTime, setStartTime] = useState<any>(null);
  const [interval, setInterval] = useState<any>(null);

  const handleButtonClick = (time: any, range: any) => {
    setStartTime(time);
    setInterval(range);
    onRangeSelect(time, range);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(timeStamps.oneDayAgo, "5m")}>
        1 day
      </button>
      <button onClick={() => handleButtonClick(timeStamps.sevenDaysAgo, "15m")}>
        7 days
      </button>
      <button onClick={() => handleButtonClick(timeStamps.thirtyDaysAgo, "1h")}>
        30 days
      </button>
      <button onClick={() => handleButtonClick(timeStamps.sixMonthsAgo, "1d")}>
        6 months
      </button>
      <button onClick={() => handleButtonClick(timeStamps.oneYearAgo, "3d")}>
        1 year
      </button>
      <button onClick={() => handleButtonClick(timeStamps.fiveYearsAgo, "1w")}>
        5 years
      </button>
      {startTime && (
        <p>
          Selected Data: {startTime} {interval}
        </p>
      )}
    </div>
  );
};

export default DynamicValues;
