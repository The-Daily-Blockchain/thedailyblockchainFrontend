"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { formatDate } from "@/app/_components/utils/formattingDate";

interface Props {
  data: any;
}

const MobileCover = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div className="grid">
      <div className="text-3xl mt-5 mb-10 font-bold grid justify-center text-[#303030]">
        Top Stories
      </div>

      {data?.results
        ?.filter(
          (article: any, index: number) => index <= 1 && !article.archived
        )
        .map((x: any, index: number) => (
          <div key={x.id} className="justify-items-end">
            <div
              className={`grid grid-cols-2 pb-6 mb-6 ${
                index === 1 ? "" : "border-b-2 border-solid border-[#727272]"
              }`}
            >
              <div className="mx-2">
                <div>
                  <Image
                    width={280}
                    height={280}
                    alt="toparticlepic"
                    src={x.image}
                  />
                </div>
                <div className="mt-4 font-bold text-md">
                  By: {x.author.first_name} {x.author.last_name}
                </div>
                <div className="text-xs">{formatDate(x.time_created)}</div>
              </div>
              <div
                onClick={() => router.push(`/article/${x.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="text-[16px] font-medium text-[#121212] hover:opacity-50 transition-opacity duration-300">
                  {x.title}
                </div>
              </div>
              <div className="text-[#5a5a5a] text-[12px] hover:cursor-pointer hover:opacity-50 transition-opacity duration-300 mb-6">
                {parse(
                  x.content.length > 150
                    ? `${x.content.substring(0, 150)}...`
                    : x.content
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MobileCover;
