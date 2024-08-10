import type { Metadata } from "next";
import { TOP_NEWS_SEO } from "@/app/_seo/seo_config";
import { TopNewsRoot } from "./topNewsRoot";

export const metadata: Metadata = {
  title: TOP_NEWS_SEO.TITLE,
  description: TOP_NEWS_SEO.DESCRIPTION,
};

export default function Page() {
  return <TopNewsRoot />;
}
