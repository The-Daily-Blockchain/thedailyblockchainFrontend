"use client";
import FullScreenAdhoc from "@/app/_adhoc/fullscreenadhoc";
import MobileScreenAdhoc from "@/app/_adhoc/mobilescreenadhoc";
import React, { useEffect, useState } from "react";
import Content from "./content";
import LgScreenAdhoc from "@/app/_adhoc/lgscreenadhoc";
import MdScreenAdhoc from "@/app/_adhoc/mdscreenadhoc";
import MdMainScreenAdhoc from "@/app/_adhoc/mdmainscreenadhoc";
const Page = () => {
  return (
    <>
      <FullScreenAdhoc>
        <div className="min-h-screen">
          <Content />
        </div>
        ;
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <div className="min-h-screen">
          {" "}
          <Content />
        </div>
      </LgScreenAdhoc>
      <MdMainScreenAdhoc>
        <div className="min-h-screen">
          {" "}
          <Content />
        </div>
      </MdMainScreenAdhoc>
      <MobileScreenAdhoc>
        <div className="min-h-screen">
          {" "}
          <Content />
        </div>
        ;
      </MobileScreenAdhoc>
    </>
  );
};

export default Page;
