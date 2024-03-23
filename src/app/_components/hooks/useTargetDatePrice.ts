import React, { useEffect, useRef } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const useTargetDatePrice = ({ symbol, date }: any) => {
  // date =   30 - 12 - 2022
  //   formatDateGecko
  const dataUrl = `https://api.coingecko.com/api/v3/coins/${symbol}/history?date=${date}&localization=false`;

  const { data, isLoading } = useSWR(dataUrl, fetcher);
  const cachedDataRef = useRef<any>(null);

  useEffect(() => {
    cachedDataRef.current = data;
  });

  return { data: cachedDataRef.current, isLoading };
};
