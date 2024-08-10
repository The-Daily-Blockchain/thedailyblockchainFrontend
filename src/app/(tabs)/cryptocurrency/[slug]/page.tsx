import React from "react";
import CryptoPage from "../cryptopage";
import type { Metadata, ResolvingMetadata } from "next";
import stripHtmlRegex from "@/app/_components/utils/StripHtmlRegex";
import { CRYPTO_SEO } from "@/app/_seo/seo_config";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const symbol = params.slug;
  const CapSymbol = capitalizeFirstLetter(symbol);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cryptodetails/details/${symbol}`
  ).then((res) => res.json());
  const seo = CRYPTO_SEO(CapSymbol);
  const description = stripHtmlRegex(data?.description);

  return {
    title: seo?.TITLE,
    description: description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen">
      <CryptoPage params={params.slug} />
    </div>
  );
}
