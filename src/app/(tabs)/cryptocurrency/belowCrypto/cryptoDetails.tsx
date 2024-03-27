"use client";
import { useCryptoDetails } from "@/app/_components/hooks/useCryptoDetails";
import React from "react";
import parse from "html-react-parser";

interface Props {
  symbol: string;
}

const CryptoDetails = ({ symbol }: Props) => {
  const { data, isLoading } = useCryptoDetails(symbol);

  return <div>{parse(data?.description || "")}</div>;
};

export default CryptoDetails;
