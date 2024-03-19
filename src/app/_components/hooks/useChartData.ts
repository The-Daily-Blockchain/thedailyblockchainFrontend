import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDebouncedValue } from "../utils/usedebouncevalue";

export const useChartData = (symbol: any, startTime: any, interval: any) => {
  const urls = `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`;

  const debounceUrls = useDebouncedValue(urls, 8640000);

  const [newData, setNewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(debounceUrls);
        const data = await response.data;
        setNewData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setNewData(null);
      }
    };
    fetchData();
  }, [debounceUrls, symbol]);

  return { data: newData };
};
