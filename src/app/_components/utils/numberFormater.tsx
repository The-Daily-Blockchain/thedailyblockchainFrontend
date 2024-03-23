"use client";
import React from "react";

const NumberFormatter = ({ value }: any) => {
  const arrowStyle = value >= 0 ? { color: "green" } : { color: "red" };
  const arrowIcon = value >= 0 ? "▲" : "▼";

  return (
    <span style={arrowStyle}>
      {arrowIcon}
      {value}%
    </span>
  );
};

export default NumberFormatter;
