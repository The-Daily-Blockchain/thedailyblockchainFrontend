import MobileCover from "@/app/_navbar/mobilefolder/mobileCover";
import React from "react";

interface Props {
  data: any;
}

const CoverMobileBody = ({ data }: Props) => {
  return (
    <div className="pt-6 border-b-4 pb-10 border-double border-slate-600">
      <MobileCover data={data} />
    </div>
  );
};

export default CoverMobileBody;
