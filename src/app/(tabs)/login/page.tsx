"use client";
import React from "react";
import Login from "./login";

interface Props {
  isLoggedIn: boolean;
  login: (token: string) => void;
}

const Page = ({ isLoggedIn, login }: Props) => {
  return (
    <>
      <Login isLoggedIn={isLoggedIn} login={login} />
    </>
  );
};

export default Page;
