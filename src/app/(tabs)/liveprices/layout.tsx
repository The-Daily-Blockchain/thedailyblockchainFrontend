import { Suspense } from "react";
import Loading from "./loading";
import { LIVE_PRICE_SEO } from "@/app/_seo/seo_config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: LIVE_PRICE_SEO.TITLE,
  description: LIVE_PRICE_SEO.DESCRIPTION,
};

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense fallback={<Loading />}> {children}</Suspense>
    </section>
  );
}
