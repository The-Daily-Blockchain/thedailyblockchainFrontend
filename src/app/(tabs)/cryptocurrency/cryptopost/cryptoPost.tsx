"use client";
import { useGetCryptoPost } from "@/app/_components/hooks/useGetCryptoPost";
import React from "react";
import parse from "html-react-parser";
import Image from "next/image";

interface Props {
  symbol: any;
}

const CryptoPost = ({ symbol }: Props) => {
  const { data, isLoading } = useGetCryptoPost(symbol);
  console.log(data);

  return (
    <div className="h-[500px] overflow-y-auto scrollbar-w-2">
      {data?.results?.map((items: any, index: number) => (
        <div className="pt-3" key={items?.id}>
          <div className="flex">
            <div className="mr-2 mt-2">
              <Image
                className="border-solid border-2 rounded-full"
                src={items?.profile?.profile_image}
                width={30}
                height={30}
                alt="Picture of the author"
              />
            </div>
            <div className="font-bold mr-2">{items?.profile?.nickname}</div>
            <div>@{items?.author?.username}</div>
          </div>
          <div className="mt-1 ml-10 pb-3">{parse(items?.description)}</div>
          {/* Apply bottom border conditionally except for the last child element */}
          {index !== data.results.length - 1 && (
            <div className="border-b-2 border-solid border-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CryptoPost;
