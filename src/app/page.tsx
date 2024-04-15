"use client";
import React from "react";
import Body from "./_mainbody/body";
import LogoutButton from "./_components/component/logout";

const index = () => {
  return (
    <div>
      <div className="text-right bg-black">
        <LogoutButton />
      </div>
      <Body />
    </div>
  );
};

export default index;
