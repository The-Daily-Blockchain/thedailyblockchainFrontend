"use client";
import React from "react";
import Login from "./login";

interface Props {
  isLoggedIn: boolean;
  login: (token: string) => void;
}

const Page = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default Page;
