"use client";
import React from "react";

interface Props {
  symbol: string;
}

const Converter = ({ symbol }: Props) => {
  return (
    <div>
      <div>{symbol} to US Dollar converter</div>
    </div>
  );
};

export default Converter;
