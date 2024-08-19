"use client";
import React, { useEffect, useState } from "react";
import Login from "./login";
import Cookies from "js-cookie";
import { redirect, usePathname, useRouter } from "next/navigation";
import Loader from "@/app/loader";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
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

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <Login />
    </div>
  );
};

export default Page;
