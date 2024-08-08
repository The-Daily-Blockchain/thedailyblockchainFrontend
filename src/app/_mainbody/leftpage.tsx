"use client";
import useSWR from "swr";
import React from "react";
import { fetcher } from "../_components/utils/fetcher";
import { useRouter } from "next/navigation";
import { formatDate } from "../_components/utils/formattingDate";
import parse from "html-react-parser";
import stripHtmlTags from "../_components/utils/stripHtmlTags";

const LeftPage = () => {
  const { data } = useSWR("/api/article", fetcher);
  const router = useRouter();

  return (
    <>
      <div className="mr-6">
        <div className="font-bold text-2xl mb-10">Current News</div>
        {data?.results
          ?.filter(
            (article: any, index: number) => index > 1 && !article.archived
          )
          .map((x: any, index: number, array: any[]) => {
            const strippedContent = stripHtmlTags(x.content);
            return (
              <div
                key={x.id}
                className={`mb-8 pb-6 border-[#121212] ${
                  index === array.length - 1
                    ? "border-b-0"
                    : "border-b-2 border-solid"
                }`}
              >
                <div
                  onClick={() => router.push(`/article/${x.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="text-2xl font-medium text-[#121212] hover:opacity-50 transition-opacity duration-300">
                    {x.title}
                  </div>
                  <div className="text-[#5a5a5a] text-[14px] hover:opacity-50 transition-opacity duration-300 mt-3">
                    {parse(
                      strippedContent.length > 400
                        ? `${strippedContent.substring(0, 400)}...`
                        : strippedContent
                    )}
                  </div>
                </div>
                <div className="mt-4 font-bold">
                  By: {x.author.first_name} {x.author.last_name}
                </div>
                <div className="text-xs">{formatDate(x.time_created)}</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default LeftPage;
