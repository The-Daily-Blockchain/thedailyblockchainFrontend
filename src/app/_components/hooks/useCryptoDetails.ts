import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useCryptoDetails = (symbol: string) => {
  const urls = `/api/cryptodetails/details/${symbol}`;
  const { data, isLoading } = useSWR(urls, fetcher);
  return { data, isLoading };
};
