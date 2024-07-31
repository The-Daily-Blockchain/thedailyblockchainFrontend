import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useEffect, useRef } from "react";

export const useGetCryptoPost = (symbol: any, page: number) => {
  const url = `/api/cryptopost/details/${symbol}/${page}`;
  const { data, isLoading } = useSWR(url, fetcher);

  const cachedDataRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      cachedDataRef.current = data;
    }
  }, [data, symbol]);

  return { data, isLoading };
};
