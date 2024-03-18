import { useEffect, useRef, useState } from "react";
import useCachedDynamicData from "./usecacheddynamicdata";

export const useChartData = (symbol: any, startTime: any, interval: any) => {
  const urls = `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`;

  const cacheOptions = {
    key: "chart_data_of_",
    expirationTime: 8640000,
  };

  const data = useCachedDynamicData(urls, cacheOptions, symbol);
  const newData = useRef<any>(null);

  useEffect(() => {
    if (data) {
      newData.current = data;
    }
  }, [data]);

  return { data: data };
};
