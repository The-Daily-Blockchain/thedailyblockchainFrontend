"use client";
import React, { Suspense, useState } from "react";
import RightCover from "../../_navbar/rightCover";
import LeftCover from "../../_navbar/leftCover";

interface Props {
  data: any;
}

const Cover = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 border-b-4 border-double pb-10 mb-10 border-slate-600">
      <LeftCover data={data} />
      <RightCover />
    </div>
  );
};

export default Cover;
