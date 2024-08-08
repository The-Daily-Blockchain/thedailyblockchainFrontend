import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
import Loader from "@/app/loader";
import { formatDate } from "@/app/_components/utils/formattingDate";
import stripHtmlTags from "@/app/_components/utils/stripHtmlTags";
interface Props {
  title?: any;
  data: any;
  handleClick: (x: any) => void;
  isLoading?: any;
}

const MdBodyList = ({ title, data, handleClick, isLoading }: Props) => {
  if (isLoading) return <Loader />;
  return (
    <div className="mx-3 overflow-auto">
      <div className="align-center text-center mt-8 text-2xl font-bold">
        {title}
      </div>
      {data?.results?.map?.((x: any, index: any, array: any[]) => {
        const stripContent = stripHtmlTags(x?.content);
        const stripContentPost = stripHtmlTags(x?.content_post);
        return (
          <div
            key={x.id}
            className={`mx-1 mt-8 mb-2 border-double ${
              index === array.length - 1 ? "border-b-0" : "border-b-4"
            }`}
          >
            <div
              className="font-bold mb-12 mx-8 hover:cursor-pointer hover:opacity-80"
              onClick={() => handleClick(x)}
            >
              {x.title || x.title_post}
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-start">
                  <Image
                    width={300}
                    height={300}
                    alt="toparticlepic"
                    src={x?.image || x?.image_post}
                    className="rounded-lg"
                  />

                  <div className="mt-4 font-bold">
                    By: {x?.author?.first_name || x?.author_post?.first_name}{" "}
                    {""}
                    {x?.author?.last_name || x?.author_post?.last_name}
                  </div>
                  <div className="mb-4 text-sm">
                    {" "}
                    {formatDate(x.time_created || x.time_created_post)}
                  </div>
                </div>
              </div>
              <div
                className="mx-10 hover:cursor-pointer hover:opacity-60 overflow-x-hidden"
                onClick={() => handleClick(x)}
              >
                {parse(
                  stripContent && stripContent.length > 120
                    ? `${stripContent.substring(
                        0,
                        120
                      )} <span className="hover:underline hover:opacity-80" style="font-weight: bold;"> see more...</span>`
                    : stripContentPost && stripContentPost.length > 120
                    ? `${stripContentPost.substring(
                        0,
                        120
                      )} <span className="hover:underline hover:opacity-80" style="font-weight: bold;"> see more...</span>`
                    : stripContent || stripContentPost || ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MdBodyList;
