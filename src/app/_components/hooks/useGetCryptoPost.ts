import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useGetCryptoPost = (symbol: any) => {
  const url = `/api/cryptopost/details/${symbol}`;
  const { data, isLoading } = useSWR(url, fetcher);

  return { data, isLoading };
};
