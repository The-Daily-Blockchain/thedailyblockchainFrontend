"use client";
import { fetcher } from "@/app/_components/utils/fetcher";
import CommonPage from "@/app/_mainbody/commonPage";
import React from "react";
import useSWR from "swr";

export const RootArticle = ({ params }: { params: { id: string } }) => {
  const {
    data: dataDetails,
    error: errorDetails,
    isLoading: isLoadingDetails,
  } = useSWR(`/api/article/details/${params.id}`, fetcher);

  return (
    <div>
      <CommonPage
        payload={dataDetails}
        isLoading={isLoadingDetails}
        error={errorDetails}
      />
    </div>
  );
};
