import type { Metadata } from "next";
import { CRYPTO101_SEO } from "@/app/_seo/seo_config";
import { Crypto101Root } from "./crypto101Root";

export const metadata: Metadata = {
  title: CRYPTO101_SEO.TITLE,
  description: CRYPTO101_SEO.DESCRIPTION,
};

export default function Page() {
  return <Crypto101Root />;
}
