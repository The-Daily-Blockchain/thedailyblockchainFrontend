import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useLatestPrice = (symbol: string) => {
  const url = `/api/latestprice/${symbol}`;

  const { data, isLoading } = useSWR(url, fetcher);

  return { data, isLoading };
};
