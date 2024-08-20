import { Suspense } from "react";
import { LIVE_PRICE_SEO } from "@/app/_seo/seo_config";
import type { Metadata } from "next";
import Loading from "@/app/_navbar/loading";

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
