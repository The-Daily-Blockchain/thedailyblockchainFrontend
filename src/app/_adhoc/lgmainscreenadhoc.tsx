import React from "react";

interface Props {
  children: any;
}

const LgMainScreenAdhoc = ({ children }: Props) => {
  return (
    <div className="hidden lg:block xl:hidden">
      <div className="grid grid-cols-[1fr,3fr]">
        <div></div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default LgMainScreenAdhoc;
