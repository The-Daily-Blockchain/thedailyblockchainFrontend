"use client";
import { useDataHandler } from "@/app/_components/utils/dataHandler";
import { Suspense } from "react";
import Loading from "@/app/_navbar/loading";
import SearchPage from "./SearchPage";

const Page = () => {
  const {
    data,
    isLoading,
    error,
    handleDataUpdate,
    handleLoading,
    handleError,
  } = useDataHandler();

  return (
    <Suspense fallback={<Loading />}>
      <SearchPage
        data={data}
        isLoading={isLoading}
        error={error}
        handleDataUpdate={handleDataUpdate}
        handleLoading={handleLoading}
        handleError={handleError}
      />
    </Suspense>
  );
};

export default Page;
