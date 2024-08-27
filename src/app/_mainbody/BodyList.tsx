"use client";
import React from "react";
import Error from "../error";
import { useRouter } from "next/navigation";
import FullScreenAdhoc from "../_adhoc/fullscreenadhoc";
import LgBodyList from "./lgmainbody/lgBodyList";
import XlBodyList from "./xlmainbody/xlBodyList";
import LgScreenAdhoc from "../_adhoc/lgscreenadhoc";
import MdScreenAdhoc from "../_adhoc/mdscreenadhoc";
import MobileScreenAdhoc from "../_adhoc/mobilescreenadhoc";
import MdBodyList from "./mdmainbody/mdBodyList";
import MobileMainBody from "./mobilemainbody/mobileBodyList";
import ArrowButton from "./arrowbutton";
import Pagination from "./pagination";
import { usePathname } from "next/navigation";
import path from "path";

interface Props {
  data: any;
  isLoading?: any;
  error?: any;
  title?: any;
  apiEndpoint: any;
  handleDataUpdate: any;
  handleLoading: any;
  handleError: any;
}

const BodyList = ({
  data,
  isLoading,
  error,
  title,
  apiEndpoint,
  handleDataUpdate,
  handleLoading,
  handleError,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  if (error) return <Error />;

  const handleClick = (x: any) => {
    const hasTitle = data?.results?.some((x: { title: any }) => x.title);
    const hasTitlePost = data?.results?.some(
      (x: { title_post: any }) => x.title_post
    );

    if (hasTitle) {
      router.push(`/article/${x?.id}`);
    } else if (hasTitlePost) {
      router.push(`/post/${x?.id}`);
    }
  };

  return (
    <>
      <LgScreenAdhoc>
        <LgBodyList
          title={title}
          data={data}
          isLoading={isLoading}
          handleClick={handleClick}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
          endpointPath={pathname}
        />
      </LgScreenAdhoc>
      <FullScreenAdhoc>
        <XlBodyList
          title={title}
          data={data}
          isLoading={isLoading}
          handleClick={handleClick}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
          endpointPath={pathname}
        />
      </FullScreenAdhoc>
      <MdScreenAdhoc>
        <MdBodyList
          title={title}
          data={data}
          isLoading={isLoading}
          handleClick={handleClick}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
          endpointPath={pathname}
        />
      </MdScreenAdhoc>
      <MobileScreenAdhoc>
        <MobileMainBody
          title={title}
          data={data}
          isLoading={isLoading}
          handleClick={handleClick}
        />
        <Pagination
          apiEndpoint={apiEndpoint}
          onDataUpdate={handleDataUpdate}
          onLoadingUpdate={handleLoading}
          onErrorUpdate={handleError}
          endpointPath={pathname}
        />
        <ArrowButton />
      </MobileScreenAdhoc>
    </>
  );
};

export default BodyList;
