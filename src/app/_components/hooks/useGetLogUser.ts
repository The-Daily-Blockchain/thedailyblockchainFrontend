import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useGetLogUser = () => {
  const url = `/api/profile/`;
  const { data, isLoading } = useSWR(url, fetcher);

  return { data, isLoading };
};
