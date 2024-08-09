import React from "react";

interface Props {
  children: any;
}

const LivePriceAdhoc = ({ children }: Props) => {
  return (
    <div
      className="xl:grid mx-2 xl:grid-cols-[150px_auto_150px]  2xl:grid-cols-[340px_auto_340px]"
      style={{
        overflowX: "auto",
        scrollbarColor: "transparent transparent",
        msOverflowStyle: "none",
      }}
    >
      <div className="hidden xl:block"></div>
      <div>{children}</div>
      <div className="hidden xl:block"></div>
    </div>
  );
};

export default LivePriceAdhoc;
