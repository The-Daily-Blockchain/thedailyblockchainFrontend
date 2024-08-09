import React from "react";

interface Props {
  children: any;
}

const FullScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="hidden xl:block">
      <div className="grid grid-cols-[1fr,3fr,1fr]">
        <div></div>
        <div>{children}</div>
        <div></div>
      </div>
    </div>
  );
};

export default FullScreenAdhoc;
