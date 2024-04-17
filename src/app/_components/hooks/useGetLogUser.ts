import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import Cookies from "js-cookie";

export const useGetLogUser = () => {
  const token = Cookies.get("token");
  const url = `/api/profile/`;
  const { data, isLoading } = useSWR(token ? url : null, fetcher);

  return { data, isLoading };
};
