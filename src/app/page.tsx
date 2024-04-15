"use client";
import React from "react";
import Body from "./_mainbody/body";
import LogoutButton from "./_components/component/logout";

const index = () => {
  return (
    <div>
      <LogoutButton />
      <Body />
    </div>
  );
};

export default index;
