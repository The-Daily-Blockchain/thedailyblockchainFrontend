import { useEffect, useRef, useState } from "react";
import useCachedDynamicData from "./usecacheddynamicdata";
import { formatChartingDate } from "../utils/formattingData";

export const useChartData = (symbol: any, startTime: any, interval: any) => {
  const urls = `/api/graph?symbol=${symbol}&startTime=${startTime}&interval=${interval}`;

  const cacheOptions = {
    key: "chart_data_of_",
    expirationTime: 8640000,
  };

  const data = useCachedDynamicData(urls, cacheOptions, symbol);
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formatted = data?.map((item: string[]) => ({
        time: formatChartingDate(item[0]),
        price: parseFloat(item[1]),
        volume: parseFloat(item[5]),
      }));
      setFormattedData(formatted);
      setLoading(false);
    }
  }, [data]);

  console.log(formattedData);
  return { data: formattedData, loading };
};
