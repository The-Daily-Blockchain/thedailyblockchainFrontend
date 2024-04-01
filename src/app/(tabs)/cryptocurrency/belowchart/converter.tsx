"use client";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import React from "react";

interface Props {
  symbol: string;
}

const Converter = ({ symbol }: Props) => {
  return (
    <div>
      <div className="font-semibold pt-3 mb-1 ml-3">
        {capitalizeFirstLetter(symbol)} to US Dollar converter
      </div>
      <div className="flex justify-between px-3 pb-3">
        <input
          className="border-2 justify-center border-black border-solid rounded-xl"
          style={{ width: "150px" }}
        ></input>
        <input
          className="border-2 border-black border-solid rounded-xl"
          style={{ width: "150px" }}
        ></input>
      </div>
    </div>
  );
};

export default Converter;
