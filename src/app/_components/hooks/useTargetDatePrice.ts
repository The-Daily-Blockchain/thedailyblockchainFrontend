import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { newMultiFetcher } from "../utils/fetcher";
import timeStamps from "../utils/dataValues";
import { formatDateGecko } from "../utils/formattingData";
import { useDebouncedValue } from "../utils/usedebouncevalue";
import useCachedDynamicData from "./usecacheddynamicdata";

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
      const responseData = await newMultiFetcher(debounceUrls);
      cachedDataRef.current = responseData;
    };
    fetchData();
  }, [debounceUrls]);

  console.log(cachedDataRef.current);
  return { data: cachedDataRef.current };
};
