"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <div className="border-double border-t-4">
      <div className="bg-white z-10" style={{ visibility: "hidden" }}>
        <div className="text-center">
          .. -. / -- . -- --- .-. -.-- / --- ..-. / --. .-. .- -.-. . / .-.. .
          -. - .
        </div>
      </div>
      <div className="justify-center flex font-bold bg-[#fff]">
        Copyright <AiOutlineCopyrightCircle className="mr-2" />
        The Daily Blockchain PH 2024
      </div>
      <div
        onClick={() => router.push("/privacy-policy")}
        className="text-indigo-400 justify-center flex cursor-pointer"
      >
        {" "}
        Privacy Policy
      </div>
      <div className="bg-white z-10" style={{ visibility: "hidden" }}>
        <div className="text-center">
          .. -. / -- . -- --- .-. -.-- / --- ..-. / --. .-. .- -.-. . / .-.. .
          -. - .
        </div>
      </div>
    </div>
  );
};

export default Footer;
