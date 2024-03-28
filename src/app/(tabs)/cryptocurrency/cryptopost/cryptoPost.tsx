"use client";
import { useGetCryptoPost } from "@/app/_components/hooks/useGetCryptoPost";
import React from "react";

interface Props {
  symbol: any;
}

const CryptoPost = ({ symbol }: Props) => {
  const { data, isLoading } = useGetCryptoPost(symbol);
  console.log(data);
  return <div>loremisum ipsum</div>;
};

export default CryptoPost;
