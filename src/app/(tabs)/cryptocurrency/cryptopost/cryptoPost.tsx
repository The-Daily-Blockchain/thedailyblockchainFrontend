"use client";
import { useGetCryptoPost } from "@/app/_components/hooks/useGetCryptoPost";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { timeAgoFormatter } from "@/app/_components/utils/formattingDate";

interface Props {
  symbol: any;
}

const CryptoPost = ({ symbol }: Props) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading } = useGetCryptoPost(symbol, page);

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      if (data.next === null || undefined) {
        setHasMore(false); // No more paginated results available
      } else {
        setHasMore(true); // More paginated results available
      }
    } else {
      setHasMore(false);
    }
  }, [data]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="overflow-y-auto scrollbar-w-2">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        height="600px"
        style={{
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
          msOverflowStyle: "none",
        }}
      >
        {posts?.map((items: any, index: number) => (
          <div className="pt-3 text-[12px] sm:text-[16px]" key={index}>
            <div className="flex">
              <div className="mr-2 mt-2">
                <Image
                  className="border-solid border-2 rounded-full"
                  src={items?.profile?.profile_image}
                  width={30}
                  height={30}
                  alt="Picture of the author"
                />
              </div>
              <div>
                <div className="flex">
                  <div className="font-bold mr-2 xl:flex-1">
                    {items?.profile?.nickname}
                  </div>
                  <div className="justify-self-center xl:flex-1">
                    @{items?.author?.username}
                  </div>
                  <div className="ml-2 font-thin mt-1 text-[10px] sm:text-[12px] mb-3 block xl:hidden">
                    {timeAgoFormatter(items?.created_at)}
                  </div>
                </div>
                <div className="ml-2 font-thin mt-1 text-[10px] sm:text-[12px] mb-3 hidden xl:block">
                  {timeAgoFormatter(items?.created_at)}
                </div>
              </div>
            </div>
            <div className="mt-1 ml-10 pb-3">{parse(items?.description)}</div>
            {index !== posts?.length - 1 && (
              <div className="border-b-2 border-solid border-gray-300"></div>
            )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default CryptoPost;
