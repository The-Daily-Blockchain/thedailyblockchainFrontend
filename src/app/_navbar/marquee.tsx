/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect, useState } from "react";

import Marquee from "react-fast-marquee";
import { Constants } from "../_components/constants/common/constants";
import { convertSymbolToName } from "../_components/utils/convertsymboltoname";
import {
  formatAmount,
  newFormatAmount,
} from "../_components/utils/formatamount";
import { fetcher } from "../_components/utils/fetcher";
import useSWR from "swr";

const MarQuee = () => {
  const [crypto, setCrypto] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);

  const { data: marqueeData } = useSWR("/api/marquee", fetcher);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        if (!marqueeData) {
          return;
        }

        setCrypto(marqueeData?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCrypto();

    const interval = setInterval(() => {
      fetchCrypto();
    }, 500000);
    return () => clearInterval(interval);
  }, [marqueeData]);

  return (
    <div>
      {!isLoading && (
        <Marquee>
          <div className="hidden sm:block">
            <div className="flex mt-1 border-y-4 border-[#000]">
              {crypto?.map?.((coin, index) => (
                <div
                  className="mr-3 flex border-solid border-black border-r-2 pr-2"
                  key={coin.symbol}
                >
                  <img
                    src={
                      convertSymbolToName(coin.symbol.replace(/USDT$/, ""))
                        .imageUrl
                    }
                    alt={coin.name}
                    className="w-8 h-8 mt-2 mr-2 rounded-full"
                  />

                  <div className="grid grid-cols-1 mr-2">
                    <span> {coin.name}</span>
                    <span>
                      {
                        convertSymbolToName(coin.symbol.replace(/USDT$/, ""))
                          .name
                      }
                    </span>
                  </div>
                  <div className="grid grid-cols-1">
                    <p>${newFormatAmount(coin?.weightedAvgPrice)}</p>
                    <p
                      className={`justify-self-center px-1 ${
                        typeof coin.priceChangePercent === "string" &&
                        !isNaN(parseFloat(coin.priceChangePercent))
                          ? parseFloat(coin.priceChangePercent) < 0
                            ? "text-red-500"
                            : "text-green-500"
                          : "N/A"
                      }`}
                    >
                      {typeof coin.priceChangePercent === "string" &&
                      !isNaN(parseFloat(coin.priceChangePercent))
                        ? parseFloat(coin.priceChangePercent).toFixed(2)
                        : "N/A"}
                      %
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* mobile */}
          <div className="sm:hidden">
            <div className="flex border-b-2 border-[#000]">
              {crypto?.map?.((coin) => (
                <div
                  className="mr-2 flex border-solid border-black border-r-2 pr-2"
                  key={coin.symbol}
                >
                  <img
                    src={
                      convertSymbolToName(coin.symbol.replace(/USDT$/, ""))
                        .imageUrl
                    }
                    alt={coin.name}
                    className="w-4 h-4 mt-2 mr-2 rounded-full"
                  />

                  <div className="grid grid-cols-1 mr-2">
                    <span className="text-[10px]">{coin.name}</span>
                    <span className="text-[10px]">
                      {
                        convertSymbolToName(coin.symbol.replace(/USDT$/, ""))
                          .name
                      }
                    </span>
                  </div>
                  <div className="grid grid-cols-1 text-[10px]">
                    ₱{coin?.weightedAvgPrice.toLocaleString("en-US")}
                    <p
                      className={`justify-self-center px-1 ${
                        typeof coin?.priceChangePercent === "string" &&
                        !isNaN(parseFloat(coin.priceChangePercent))
                          ? parseFloat(coin?.priceChangePercent) < 0
                            ? "text-red-500"
                            : "text-green-500"
                          : "N/A"
                      }`}
                    >
                      {typeof coin.priceChangePercent === "string" &&
                      !isNaN(parseFloat(coin?.priceChangePercent))
                        ? parseFloat(coin?.priceChangePercent).toFixed(2)
                        : "N/A"}
                      %
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Marquee>
      )}
    </div>
  );
};
export default MarQuee;
