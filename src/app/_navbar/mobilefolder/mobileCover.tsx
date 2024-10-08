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
          <div
            key={x.id}
            className={`justify-items-end ${
              index === 1 ? "" : "border-b-4 border-double border-slate-300"
            }`}
          >
            <div className="grid grid-cols-2 mt-5">
              <div className="mx-2">
                <div>
                  <Image
                    width={280}
                    height={280}
                    alt="toparticlepic"
                    src={x?.image}
                    className="rounded-lg border border-black"
                  />
                </div>
              </div>
              <div
                onClick={() => router.push(`/article/${x.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="self-start mx-auto text-[16px] font-medium text-[#121212] hover:opacity-50 transition-opacity duration-300">
                  {x.title}
                </div>
              </div>
            </div>
            <div className="text-[#5a5a5a] text-[12px] hover:cursor-pointer hover:opacity-50 transition-opacity duration-300  mx-3 mt-5">
              {parse(
                x.content.length > 150
                  ? `${x.content.substring(0, 150)}...`
                  : x.content
              )}
            </div>
            <div className="ml-3">
              <div className="mt-4 font-bold text-md ml-1">
                By: {x.author.first_name} {x.author.last_name}
              </div>
              <div className="text-xs ml-1 mb-3">
                {formatDate(x.time_created)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MobileCover;
