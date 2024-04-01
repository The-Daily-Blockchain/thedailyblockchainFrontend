import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useGetCryptoPost = (symbol: any, page: number) => {
  const url = `/api/cryptopost/details/${symbol}/${page}`;
  const { data, isLoading } = useSWR(url, fetcher);

  return { data, isLoading };
};
