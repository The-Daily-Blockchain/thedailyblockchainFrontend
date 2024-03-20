import { useEffect, useRef, useMemo, useState } from "react";
import axios from "axios";
import { useDebouncedValue } from "../utils/usedebouncevalue";

export const useChartData = (symbol: any, startTime: any, interval: any) => {
  const urls = useMemo(
    () =>
      `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`,
    [interval, startTime, symbol]
  );

  const debounceUrls = useDebouncedValue(urls, 8640000);

  const [newData, setNewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urls);
        const data = await response.data;
        setNewData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setNewData(null);
      }
    };
    fetchData();
  }, [debounceUrls, symbol, startTime, interval, urls]);

  return { data: newData };
};
