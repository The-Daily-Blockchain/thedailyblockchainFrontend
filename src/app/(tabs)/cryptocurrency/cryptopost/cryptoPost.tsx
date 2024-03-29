"use client";
import { useGetCryptoPost } from "@/app/_components/hooks/useGetCryptoPost";
import React from "react";
import parse from "html-react-parser";

interface Props {
  symbol: any;
}

const CryptoPost = ({ symbol }: Props) => {
  const { data, isLoading } = useGetCryptoPost(symbol);
  console.log(data);

  return (
    <>
      <div>What is on yourmind</div>
      {data?.results?.map((items: any) => (
        <div
          className="border-b-2 border-solid border-gray-300 mb-2 pb-2"
          key={items.id}
        >
          {parse(items.description)}
        </div>
      ))}
    </>
  );
};

export default CryptoPost;
