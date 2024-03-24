import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { newMultiFetcher } from "../utils/fetcher";
import timeStamps from "../utils/dataValues";
import { formatDateGecko } from "../utils/formattingData";
import { useDebouncedValue } from "../utils/usedebouncevalue";

export const useTargetDatePrice = (symbol: any) => {
  const date = [
    // timeStamps.oneDayAgo,
    timeStamps.sevenDaysAgo,
    timeStamps.thirtyDaysAgo,
    timeStamps.sixMonthsAgo,
    timeStamps.oneYearAgo,
    timeStamps.fiveYearsAgo,
  ].map((timestamp) => formatDateGecko(timestamp));

  const dataUrls = date.map(
    (formattedDate) =>
      `https://api.coingecko.com/api/v3/coins/${symbol}/history?date=${formattedDate}&localization=false`
  );

  const debounceUrls = useDebouncedValue(dataUrls, 86400000);

  const cachedDataRef = useRef<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const localStorageKey = `percent_data_${symbol}`;
      const cachedDataString = localStorage.getItem(localStorageKey);
      const cachedData = cachedDataString ? JSON.parse(cachedDataString) : {};

      const currentTime = new Date().getTime();
      const lastFetchTime = cachedData.lastFetchTime || 0;
      const isDataValid = currentTime - lastFetchTime < 86400000;

      if (isDataValid) {
        cachedDataRef.current = cachedData.data;
      } else {
        const responseData = await newMultiFetcher(debounceUrls);
        if (responseData.every((item: null) => item !== null)) {
          cachedDataRef.current = responseData;
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({ data: responseData, lastFetchTime: currentTime })
          );
        }
      }
    };
    fetchData();
  }, [debounceUrls, symbol]);

  console.log(cachedDataRef.current);
  return { data: cachedDataRef.current };
};
