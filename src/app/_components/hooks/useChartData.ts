import { useEffect, useRef, useMemo, useState } from "react";
import axios from "axios";
import { useDebouncedValue } from "../utils/usedebouncevalue";

export const useChartData = (symbol: any, startTime: any, interval: any) => {
  const urls = useMemo(() => {
    let url = `/api/graph?symbol=${symbol}`;

    if (startTime !== null && startTime !== undefined && startTime !== 0) {
      url += `&startTime=${startTime}`;
    }

    if (interval !== null && interval !== undefined && interval !== 1) {
      url += `&interval=${interval}`;
    }
    return url;
  }, [interval, startTime, symbol]);

  const debounceUrls = useDebouncedValue(urls, 8640000);

  const [newData, setNewData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urls);
        const data = await response.data;
        setNewData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setNewData([]);
      }
    };
    fetchData();
  }, [debounceUrls, symbol, startTime, interval, urls]);

  return { data: newData };
};
