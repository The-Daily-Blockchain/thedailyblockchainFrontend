import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import {
  formatAmount,
  formatNumberWithCommas,
  newFormatAmount,
} from "@/app/_components/utils/formatamount";
import useValueArrow from "@/app/_components/utils/usevaluearrow";
import { convertSymbolToName } from "@/app/_components/utils/convertsymboltoname";
import PriceBarChart from "./pricebarchart";
import { useMarketData } from "@/app/_components/hooks/marketData";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  IoInformationCircleOutline,
  IoDocumentsOutline,
} from "react-icons/io5";
import PercentBarChart from "./percentbarchart";
import { Button } from "@/components/ui/button";
import { IoMdGlobe } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

const StreamComponent = ({ name, dataStream }: any) => {
  const [isClient, setIsClient] = useState(false);
  const { arrowIcon, valueClassName } = useValueArrow(dataStream.w);
  const symbol = dataStream.s?.split("USDT")[0];
  const { data: marketData }: { data: any } = useMarketData(name);
  const { imageUrl } = convertSymbolToName(symbol);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formattedData = [
    {
      name: dataStream.s,
      high: parseFloat(dataStream.h),
      low: parseFloat(dataStream.l),
      current: parseFloat(dataStream.w),
    },
  ];
  const reshapePercentPayload = [
    {
      cir_supply: marketData?.market_data?.circulating_supply,
      total_supply: marketData?.market_data?.total_supply,
      base: 0,
    },
  ];

  return (
    <>
      {isClient ? (
        <div className="mt-3 mx-1 py-3 mb-3 content-center">
          <div>
            <div className="flex">
              <span className=" ml-4 mt-2 w-8 h-8 flex items-center justify-center text-lg font-semibold border-solid border-2 border-indigo-500 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                {marketData?.market_data?.market_cap_rank || "∞"}
              </span>
              <span className="ml-2 mt-[15px] font-bold">
                Cryptocurrency rank
              </span>
            </div>
            <div className="grid justify-items-center items-center mt-5 ">
              <div className="flex text-left text-xl text-black w-[200px] mb-2">
                <span className="mr-2">
                  <Image
                    className="rounded-full"
                    src={imageUrl || 0}
                    alt=""
                    width={30}
                    height={30}
                  />
                </span>
                {capitalizeFirstLetter(name)}
              </div>
              <div className="grid grid-cols-2 justify-center">
                <span className="text-3xl text-left font-bold text-black w-[100px]">
                  ${newFormatAmount(parseFloat(dataStream.w))}
                </span>
                <span className={`${valueClassName} ml-2 pl-3 w-[160px]`}>
                  {arrowIcon} {newFormatAmount(parseFloat(dataStream.P))}%
                </span>
              </div>
            </div>
          </div>
          <div className="grid justify-center">
            <div className="w-[300px]">
              <PriceBarChart data={formattedData} />
            </div>
            <div>
              <div className="font-medium flex mt-2">
                <span className="mr-3">Market Capitalization</span>$
                {formatAmount(marketData?.market_data?.market_cap?.usd) || "∞"}
                <span className="ml-1 mt-[4px]  delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      The market capitalization of cryptocurrencies represents
                      the total value of all digital assets circulating in the
                      market, indicating the collective investor interest and
                      perceived worth of these decentralized digital currencies.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
            </div>
            <div className="mt-1">
              <div className="font-medium">
                <span className="mr-3">24 Hour Trading Volume</span>$
                {newFormatAmount(parseFloat(dataStream.q))}
              </div>
            </div>
            <div className="mt-1">
              <div className="font-medium flex">
                <span className="mr-3">Circulating Supply</span>
                {formatNumberWithCommas(
                  parseFloat(marketData?.market_data?.circulating_supply)
                )}
                <span className="ml-1 mt-[4px]  delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      Circulating supply in the cryptocurrency market refers to
                      the total number of digital coins or tokens that are
                      actively circulating and available for trading, providing
                      insight into the liquidity and market dynamics of a
                      particular cryptocurrency.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
              <div>
                <PercentBarChart data={reshapePercentPayload} />
              </div>
            </div>
            <div className="mt-4">
              <div className="font-medium flex">
                <span className="mr-3">Total Supply</span>
                {marketData &&
                marketData.market_data &&
                marketData.market_data.total_supply
                  ? formatNumberWithCommas(
                      parseFloat(marketData.market_data.total_supply)
                    )
                  : "∞"}
                <span className="ml-1 mt-[4px] delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      Total supply in the realm of cryptocurrency denotes the
                      entire quantity of digital coins or tokens that have been
                      created or generated for a specific cryptocurrency.
                      Understanding the total supply is crucial for evaluating
                      the potential inflationary or deflationary pressures on
                      its value over time.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-medium flex">
                <span className="mr-3">Max Supply</span>
                {marketData &&
                marketData.market_data &&
                marketData.market_data.max_supply
                  ? formatNumberWithCommas(
                      parseFloat(marketData.market_data.max_supply)
                    )
                  : "∞"}
                <span className="ml-1 mt-[4px] delay-100">
                  <HoverCard openDelay={300}>
                    <HoverCardTrigger className="cursor-pointer">
                      <IoInformationCircleOutline className="text-gray-600" />
                    </HoverCardTrigger>
                    <HoverCardContent side="top">
                      Max supply in the context of cryptocurrency refers to the
                      maximum quantity of digital coins or tokens that will ever
                      be created for a specific cryptocurrency. It establishes a
                      predefined upper limit for the total number of coins that
                      can ever be in circulation, influencing factors such as
                      scarcity and long-term value.
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-bold">Website</div>
            </div>
            <div>
              <div className="grid grid-cols-3 mr-3 mb-1">
                {marketData?.links?.homepage?.[0] && (
                  <Button
                    variant="outline"
                    className="text-right mr-2 cursor-pointer"
                  >
                    <span className="mr-1">
                      <IoMdGlobe />
                    </span>
                    <a target="_blank" href={marketData?.links?.homepage?.[0]}>
                      Homepage
                    </a>
                  </Button>
                )}
                {marketData?.links?.whitepaper && (
                  <Button variant="outline" className="cursor-pointer mr-2">
                    <span className="mr-1">
                      <IoDocumentsOutline />
                    </span>
                    <a target="_blank" href={marketData?.links?.whitepaper}>
                      Whitepaper
                    </a>
                  </Button>
                )}
                {marketData?.links?.repos_url?.github?.[0] && (
                  <Button variant="outline" className="cursor-pointer">
                    <span className="mr-1">
                      <FaGithub />
                    </span>
                    <a
                      target="_blank"
                      href={marketData?.links?.repos_url?.github?.[0]}
                    >
                      Repository
                    </a>
                  </Button>
                )}
              </div>
            </div>
            {marketData?.links?.blockchain_site?.[0] && (
              <div className="mt-3">
                <div className="flex">
                  <span className="font-bold mt-2 mr-10">
                    Blockchain Explorer
                  </span>
                  <Button variant="outline">
                    <span className="mr-1">
                      <MdExplore />
                    </span>
                    <a
                      target="_blank"
                      href={marketData?.links?.blockchain_site?.[0]}
                    >
                      Explorer
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default StreamComponent;
