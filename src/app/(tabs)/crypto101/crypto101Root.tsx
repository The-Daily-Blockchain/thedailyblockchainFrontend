"use client";
import { useDataHandler } from "@/app/_components/utils/dataHandler";
import BodyList from "@/app/_mainbody/BodyList";
import React from "react";

export const Crypto101Root = () => {
  const {
    data,
    isLoading,
    error,
    handleDataUpdate,
    handleLoading,
    handleError,
  } = useDataHandler();
  const title = "Crypto 101";
  const apiEndpoint = "/api/post?";

  return (
    <div>
      <BodyList
        data={data}
        isLoading={isLoading}
        error={error}
        title={title}
        apiEndpoint={apiEndpoint}
        handleDataUpdate={handleDataUpdate}
        handleLoading={handleLoading}
        handleError={handleError}
      />
    </div>
  );
};
