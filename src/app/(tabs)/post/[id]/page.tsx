import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { RootPost } from "./rootPost";

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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/details/${id}`
  ).then((res) => res.json());

  return {
    title: data?.title_post,
    authors: data.username,
    openGraph: {
      images: data?.image_post,
    },
  };
}

export default function Page({ params }: Props) {
  return <RootPost params={params} />;
}
