"use client";
// Define constants for durations in milliseconds
const ONE_DAY = 24 * 60 * 60 * 1000;
const SEVEN_DAYS = 7 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;
const SIX_MONTHS = 6 * 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;
const FIVE_YEARS = 5 * ONE_YEAR;

// Calculate the timestamps
const currentDate = new Date().getTime();
const oneDayAgo = currentDate - ONE_DAY;
const sevenDaysAgo = currentDate - SEVEN_DAYS;
const thirtyDaysAgo = currentDate - THIRTY_DAYS;
const sixMonthsAgo = currentDate - SIX_MONTHS;
const oneYearAgo = currentDate - ONE_YEAR;
const fiveYearsAgo = currentDate - FIVE_YEARS;

// Output the results
console.log("1 day ago:", new Date(oneDayAgo));
console.log("7 days days ago:", new Date(sevenDaysAgo));
console.log("30 days ago:", new Date(thirtyDaysAgo));
console.log("6 months ago:", new Date(sixMonthsAgo));
console.log("1 year ago:", new Date(oneYearAgo));
console.log("5 years ago:", new Date(fiveYearsAgo));

import React, { useState } from "react";

const DynamicValues = () => {
  const [startTime, setStartTime] = useState<any>(null);

  const handleButtonClick = (time: any) => {
    setStartTime(time);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick(oneDayAgo)}>1 day</button>
      <button onClick={() => handleButtonClick(sevenDaysAgo)}>7 days</button>
      <button onClick={() => handleButtonClick(thirtyDaysAgo)}>30 days</button>
      <button onClick={() => handleButtonClick(sixMonthsAgo)}>6 months</button>
      <button onClick={() => handleButtonClick(oneYearAgo)}>1 year</button>
      <button onClick={() => handleButtonClick(fiveYearsAgo)}>5 years</button>
      {startTime && <p>Selected Data: {startTime}</p>}
    </div>
  );
};

export default DynamicValues;
