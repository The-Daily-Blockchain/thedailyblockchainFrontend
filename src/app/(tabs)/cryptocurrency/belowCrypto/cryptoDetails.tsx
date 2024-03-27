"use client";
import { useCryptoDetails } from "@/app/_components/hooks/useCryptoDetails";
import React from "react";
import parse from "html-react-parser";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";

interface Props {
  symbol: string;
}

const CryptoDetails = ({ symbol }: Props) => {
  const { data, isLoading } = useCryptoDetails(symbol);

  return (
    <div className="p-4 py-3">
      <div className="text-[32px] font-bold">
        {" "}
        About {capitalizeFirstLetter(symbol)}
      </div>
      <div>{parse(data?.description || "")}</div>
    </div>
  );
};

export default CryptoDetails;
