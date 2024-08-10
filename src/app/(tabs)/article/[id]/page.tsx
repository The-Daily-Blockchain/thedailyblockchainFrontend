import React from "react";
import CommonPage from "../../../_mainbody/commonPage";
import useSWR from "swr";
import { fetcher } from "../../../_components/utils/fetcher";
import type { Metadata, ResolvingMetadata } from "next";
import { RootArticle } from "./rootArticle";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  console.log(params);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/article/details/${id}`
  ).then((res) => res.json());

  return {
    title: data?.title,
    authors: data.username,
    openGraph: {
      images: data?.image,
    },
  };
}

export default function Page({ params }: Props) {
  return <RootArticle params={params} />;
}
