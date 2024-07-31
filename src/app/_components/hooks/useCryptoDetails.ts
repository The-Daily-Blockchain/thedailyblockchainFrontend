import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useEffect, useRef } from "react";

export const useCryptoDetails = (symbol: string) => {
  const urls = `/api/cryptodetails/details/${symbol}`;
  const { data, isLoading } = useSWR(urls, fetcher);

  const cachedDataRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      cachedDataRef.current = data;
    }
  }, [data, symbol]);
  return { data, isLoading };
};
