import React from "react";
import { Tweet } from "react-tweet";

interface Props {
  children: any;
}

const MdScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="hidden md:block lg:hidden">
      <div className="grid grid-cols-[1fr,3fr]">
        <div></div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MdScreenAdhoc;
