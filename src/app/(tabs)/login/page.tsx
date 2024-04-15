"use client";
import React, { useEffect, useState } from "react";
import Login from "./login";
import Cookies from "js-cookie";
import { redirect, usePathname, useRouter } from "next/navigation";
import Loader from "@/app/loader";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Login />
    </>
  );
};

export default Page;
