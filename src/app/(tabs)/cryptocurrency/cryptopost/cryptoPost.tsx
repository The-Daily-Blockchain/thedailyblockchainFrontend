"use client";
import { useGetCryptoPost } from "@/app/_components/hooks/useGetCryptoPost";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  symbol: any;
}

const CryptoPost = ({ symbol }: Props) => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading } = useGetCryptoPost(symbol, page);
  console.log(data);

  useEffect(() => {
    if (data && data.results) {
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setHasMore(data.results.length > 0);
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
          <div className="pt-3" key={items?.id}>
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
              <div className="font-bold mr-2">{items?.profile?.nickname}</div>
              <div>@{items?.author?.username}</div>
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
