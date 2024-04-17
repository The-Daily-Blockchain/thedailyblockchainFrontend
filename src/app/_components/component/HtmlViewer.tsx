"use client";
import React from "react";
import parse from "html-react-parser";

const HtmlViewer = ({ htmlContent }: any) => {
  return (
    <div className="border-2 pt-2 pl-2 rounded-lg overflow-auto h-full w-[576px] md:w-[691px] lg:w-[922px] xl:w-[1152px] 2xl:w-[1382px]">
      <div style={{ lineHeight: "1.4" }}>{parse(htmlContent)}</div>
    </div>
  );
};

export default HtmlViewer;
