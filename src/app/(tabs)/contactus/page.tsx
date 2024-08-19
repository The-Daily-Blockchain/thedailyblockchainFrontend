import React from "react";

import FullScreenAdhoc from "@/app/_adhoc/fullscreenadhoc";
import Xldonate from "./responsive/xldonate";
import LgScreenAdhoc from "@/app/_adhoc/lgscreenadhoc";
import MdScreenAdhoc from "@/app/_adhoc/mdscreenadhoc";
import MobileScreenAdhoc from "@/app/_adhoc/mobilescreenadhoc";
import MobileDonate from "./responsive/mobiledonate";

import type { Metadata } from "next";
import { DONATE_US_SEO } from "@/app/_seo/seo_config";

export const metadata: Metadata = {
  title: DONATE_US_SEO.TITLE,
  description: DONATE_US_SEO.DESCRIPTION,
};

export default function Page() {
  return (
    <>
      <FullScreenAdhoc>
        <Xldonate />
      </FullScreenAdhoc>
      <LgScreenAdhoc>
        <Xldonate />
      </LgScreenAdhoc>
      <MdScreenAdhoc>
        <MobileDonate />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileDonate />
      </MobileScreenAdhoc>
    </>
  );
}
