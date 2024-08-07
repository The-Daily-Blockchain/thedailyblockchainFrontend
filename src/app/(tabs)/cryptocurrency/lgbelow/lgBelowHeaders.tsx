import { useCryptoStream } from "@/app/_components/hooks/useCryptoStream";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import { newFormatAmount } from "@/app/_components/utils/formatamount";
import useValueArrow from "@/app/_components/utils/usevaluearrow";
import { convertSymbolToName } from "@/app/_components/utils/convertsymboltoname";
import { useMarketData } from "@/app/_components/hooks/marketData";

const LgBelowHeaders = ({ name, dataStream }: any) => {
  const [isClient, setIsClient] = useState(false);
  const { arrowIcon, valueClassName } = useValueArrow(dataStream?.w);
  const symbol = dataStream?.s?.split("USDT")[0];
  const { data: marketData }: { data: any } = useMarketData(name);
  const { imageUrl } = convertSymbolToName(symbol);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="mt-3 mx-1 py-3 mb-3 content-center">
          <div>
            <div className="flex">
              <span className=" ml-4 mt-3 w-8 h-8 flex items-center justify-center text-lg font-semibold border-solid border-2 border-indigo-500 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                {marketData?.market_data?.market_cap_rank || "∞"}
              </span>
              <span className="ml-2 mt-[15px] font-bold">
                Cryptocurrency rank
              </span>
            </div>
            <div className="grid justify-items-center items-center mt-5">
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
                  ${newFormatAmount(parseFloat(dataStream?.w))}
                </span>
                <span className={`${valueClassName} ml-2 pl-3 w-[160px]`}>
                  {arrowIcon} {newFormatAmount(parseFloat(dataStream?.P))}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LgBelowHeaders;
