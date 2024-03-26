"use client";
import { newFormatAmount } from "@/app/_components/utils/formatamount";
import NumberFormatter from "@/app/_components/utils/numberFormater";
import React from "react";

interface Props {
  chartData: any[];
  dataStream: any;
}

const AllTime = ({ chartData, dataStream }: Props) => {
  const [highestValue, highestValueDate, lowestValue, lowestValueDate] =
    chartData.reduce(
      ([maxValue, maxDate, minValue, minDate], current) => {
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
        // Update maximum value and its date
        if (fourthElement > maxValue) {
          maxValue = fourthElement;
          maxDate = futureDateWithoutTime;
        }

        // Update minimum value and its date
        if (fifthElement < minValue || minValue === null) {
          minValue = fifthElement;
          minDate = currentDateWithoutTime;
        }

        return [maxValue, maxDate, minValue, minDate];
      },
      [null, null, null, null]
    );

  console.log("Highest Value:", highestValue);
  console.log("Date of Highest Value:", highestValueDate);
  console.log("Lowest Value:", lowestValue);
  console.log("Date of Lowest Value:", lowestValueDate);
  console.log(dataStream.w);
  //   console.log(timeStamps.currentDate);
  return (
    <>
      <div className="grid grid-cols-[1fr,2fr] w-[360px] p-2">
        <div className="mt-2">All Time High</div>
        <div className="text-right grid grid-cols-[2fr,1fr] text-sm">
          <div className="mr-1">
            <div> ${newFormatAmount(highestValue)}</div>
            <div> {highestValueDate}</div>
          </div>
          <div>
            <div>
              <NumberFormatter
                value={(
                  ((dataStream.w - highestValue) / highestValue) *
                  100
                ).toFixed(2)}
              />
            </div>
            <div> ()</div>
          </div>
        </div>
        <div className="mt-2">All Time Low</div>
        <div className="text-right grid grid-cols-[2fr,1fr] text-sm">
          <div className="mr-1">
            <div> ${newFormatAmount(lowestValue)}</div>
            <div> {lowestValueDate}</div>
          </div>
          <div>
            <div>
              <NumberFormatter
                value={(
                  ((dataStream.w - lowestValue) / lowestValue) *
                  100
                ).toFixed(2)}
              />
            </div>
            <div> (12 days)</div>
          </div>
        </div>
      </div>
      <div className="text-center font-bold">Powered by binance</div>
    </>
  );
};

export default AllTime;
