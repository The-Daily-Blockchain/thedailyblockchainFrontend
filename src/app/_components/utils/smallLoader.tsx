"use client";
import Loader from "@/app/loader";
import React from "react";

const SmallLoader = () => {
  return (
    <div className="w-[10px] h-[10px]">
      <Loader />
    </div>
  );
};

export default SmallLoader;
