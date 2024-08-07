"use client";
import { capitalizeFirstLetter } from "@/app/_components/utils/capitalizefirstletter";
import { newFormatAmount } from "@/app/_components/utils/formatamount";
import NumberFormatter from "@/app/_components/utils/numberFormater";
import React from "react";
import Image from "next/image";
import { FiMinus } from "react-icons/fi";

interface Props {
  chartData: any[];
  dataStream: any;
  symbol: string;
}

const AllTime = ({ chartData, dataStream, symbol }: Props) => {
  const [
    highestValue,
    highestValueDate,
    lowestValue,
    lowestValueDate,
    highestValueDiffDays,
    lowestValueDiffDays,
  ] = chartData.reduce(
    (
      [maxValue, maxDate, minValue, minDate, maxDiffDays, minDiffDays],
      current
    ) => {
      const fourthElement = parseFloat(current[2]);
      const fifthElement = parseFloat(current[3]);
      const currentDate = new Date(parseInt(current[0])); // Assuming current[0] is a Unix timestamp

      const addDate = parseInt(current[0]) + 3 * 24 * 60 * 60 * 1000;
      const formattedAddDate = new Date(addDate);

      // Extracting only the date part from the timestamp and formatting it
      const currentDateWithoutTime = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const futureDateWithoutTime = formattedAddDate.toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );
      const futureDate = new Date(futureDateWithoutTime);
      const diffHighestDays = Math.floor(
        (Date.now() - futureDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Update maximum value and its date
      if (fourthElement > maxValue) {
        maxValue = fourthElement;
        maxDate = futureDateWithoutTime;
        maxDiffDays = diffHighestDays;
      }

      const diffLowestDays = Math.floor(
        (Date.now() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Update minimum value and its date
      if (fifthElement < minValue || minValue === null) {
        minValue = fifthElement;
        minDate = currentDateWithoutTime;
        minDiffDays = diffLowestDays;
      }

      return [maxValue, maxDate, minValue, minDate, maxDiffDays, minDiffDays];
    },
    [null, null, Infinity, null, null, Infinity]
  );

  const formatDateDifference = (diffDays: any) => {
    if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);
      const remainingDays = diffDays % 365;
      return remainingDays === 0
        ? `${years} year${years > 1 ? "s" : ""} ago`
        : `${years} year${years > 1 ? "s" : ""} and ${remainingDays} day${
            remainingDays > 1 ? "s" : ""
          } ago`;
    } else if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return remainingDays === 0
        ? `${months} month${months > 1 ? "s" : ""} ago`
        : `${months} month${months > 1 ? "s" : ""} and ${remainingDays} day${
            remainingDays > 1 ? "s" : ""
          } ago`;
    } else {
      return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    }
  };

  const formatSymbol = capitalizeFirstLetter(symbol);

  const formattedHighestValueDiff = formatDateDifference(highestValueDiffDays);
  const formattedLowestValueDiff = formatDateDifference(lowestValueDiffDays);
  const HighValueSevenDays = Math.max(
    ...chartData.slice(-2).map((array) => parseFloat(array[2]))
  );
  const LowestValueSevenDays = Math.min(
    ...chartData.slice(-2).map((array) => parseFloat(array[3]))
  );
  const HighValueOneYear = Math.max(
    ...chartData.slice(-52).map((array) => parseFloat(array[2]))
  );
  const LowestValueOneYear = Math.min(
    ...chartData.slice(-52).map((array) => parseFloat(array[3]))
  );

  return (
    <>
      <div className="mt-3 ml-2 mb-1 font-semibold">
        {formatSymbol} Historical Price
      </div>
      <div className="grid grid-cols-[1fr,3fr] p-2">
        <div className="mt-[6px] text-[12px] font-medium">7d Range</div>
        <div className="mt-2 text-[12px] flex justify-end">
          <div className="mr-1">
            <div> ${LowestValueSevenDays}</div>
          </div>
          <div>
            <div className="mt-[3px] mr-1">
              <FiMinus />
            </div>
          </div>
          <div>
            <div>${HighValueSevenDays}</div>
          </div>
        </div>
        <div className="mt-[6px] text-[12px] font-medium">1y Range</div>
        <div className="mt-2 text-[12px] flex justify-end">
          <div className="mr-1">
            <div> ${LowestValueOneYear}</div>
          </div>
          <div className="mt-[3px] mr-1">
            <FiMinus />
          </div>
          <div>
            <div>${HighValueOneYear}</div>
          </div>
        </div>
        <div className="mt-6 text-[12px] font-medium">All Time High</div>
        <div className="mt-4 text-right grid grid-cols-[2fr,1fr] text-[12px]">
          <div className="mr-1">
            <div> ${newFormatAmount(highestValue)}</div>
            <div> {highestValueDate}</div>
          </div>
          <div>
            <div>
              <NumberFormatter
                value={(
                  ((dataStream?.w - highestValue) / highestValue) *
                  100
                ).toFixed(2)}
              />
            </div>
            <div> ({formattedHighestValueDiff})</div>
          </div>
        </div>
        <div className="mt-4 text-[12px] font-medium">All Time Low</div>
        <div className="mt-2 text-right grid grid-cols-[2fr,1fr] text-[12px]">
          <div className="mr-1">
            <div> ${newFormatAmount(lowestValue)}</div>
            <div> {lowestValueDate}</div>
          </div>
          <div>
            <div>
              <NumberFormatter
                value={(
                  ((dataStream?.w - lowestValue) / lowestValue) *
                  100
                ).toFixed(2)}
              />
            </div>
            <div> ({formattedLowestValueDiff})</div>
          </div>
        </div>
      </div>
      <div className="justify-center flex font-bold mb-3">
        <div className="mr-2 text-[#F3BA2F]">Powered by</div>
        <Image
          src="/binance_logo.svg.png"
          alt="binance"
          width={100}
          height={10}
          // className="absolute bottom-[6px]"
        />
      </div>
    </>
  );
};

export default AllTime;
