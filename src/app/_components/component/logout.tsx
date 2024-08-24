"use client";
import { useAuth } from "@/app/_context/authContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useGetLogUser } from "../hooks/useGetLogUser";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post(`/api/logout`);
  };

  const { data } = useGetLogUser();
  const pathname = usePathname();

  useEffect(() => {
    console.log("*");
  }, [data]);

  if (!data) return <></>;

  return (
    isLoggedIn && (
      <div>
        <div className="flex py-2 mr-2 items-center">
          {data && (
            <div className="flex-1 ml-2 text-left">
              Logged User: {data?.first_name} {data?.last_name}
            </div>
          )}
          <div>
            <Button
              className="flex-1 hover:opacity-60"
              onClick={() => {
                handleLogout();
                logout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="flex">
          <Button
            variant={pathname === "/createarticle" ? "secondary" : undefined}
            onClick={() => router.push("/createarticle")}
            className="ml-2 mb-2 hover:opacity-60"
          >
            Create Article
          </Button>
          <Button
            variant={pathname === "/createpost" ? "secondary" : undefined}
            onClick={() => router.push("/createpost")}
            className="ml-2 mb-2 hover:opacity-60"
          >
            Create Post
          </Button>
          <Button
            variant={pathname === "/sendfb" ? "secondary" : undefined}
            onClick={() => router.push("/sendfb")}
            className="ml-2 mb-2 hover:opacity-60"
          >
            Send Facebook
          </Button>
        </div>
      </div>
    )
  );
};

export default LogoutButton;
