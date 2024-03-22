import { useEffect, useRef } from "react";
import useCachedDynamicData from "./usecacheddynamicdata";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useMarketHistory = (symbol: any, vs_currency: any, days: any) => {
  const dataUrls = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=${vs_currency}&days=${days}}`;
  // const cacheOptions = {
  //   key: "market_history_data_",
  //   expirationTime: 8640000,
  // };

  // const data = useCachedDynamicData(dataUrls, cacheOptions, symbol);
  const { data, isLoading } = useSWR(dataUrls, fetcher);
  const cachedDataRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      cachedDataRef.current = data;
    }
  }, [data, symbol]);

  return { data: cachedDataRef.current, isLoading };
};
