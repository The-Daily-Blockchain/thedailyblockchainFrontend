"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const ButtonMarket = ({ onChangeMarketCap }: any) => {
  const [activeButton, setActiveButton] = useState("1");

  const handleClick = (value: string) => {
    setActiveButton(value);
  };

  return (
    <div className="flex">
      <Button
        variant={activeButton === "1" ? undefined : "outline"}
        onClick={() => {
          handleClick("1"), onChangeMarketCap("1");
        }}
      >
        Price
      </Button>

      <Button
        variant={activeButton === "2" ? undefined : "outline"}
        onClick={() => {
          handleClick("2"), onChangeMarketCap("2");
        }}
      >
        Market Cap
      </Button>
    </div>
  );
};

export default ButtonMarket;
