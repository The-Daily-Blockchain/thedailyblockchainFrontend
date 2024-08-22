import Pagination from "@/app/_mainbody/pagination";
import MainSearchBody from "@/app/_mainbody/searchbody/mainsearchbody";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = ({
  data,
  isLoading,
  error,
  handleDataUpdate,
  handleLoading,
  handleError,
}: any) => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [searchQuery, setSearchQuery] = useState("");
  const apiEndpoint = `/api/search?title=${title}&`;

  useEffect(() => {
    if (title) {
      setSearchQuery(title);
    }
  }, [title, setSearchQuery]);

  const results = `Search Results for: ${searchQuery}`;

  return (
    <>
      <div className="min-h-screen">
        <MainSearchBody
          data={data}
          isLoading={isLoading}
          error={error}
          title={results}
          apiEndpoint={apiEndpoint}
          handleDataUpdate={handleDataUpdate}
          handleLoading={handleLoading}
          handleError={handleError}
        />
      </div>
      <div className="hidden">
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
        />
      </div>
      ;
    </>
  );
};

export default SearchPage;
