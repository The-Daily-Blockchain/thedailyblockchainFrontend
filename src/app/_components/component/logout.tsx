"use client";
import { useAuth } from "@/app/_context/authContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useGetLogUser } from "../hooks/useGetLogUser";
import { useRouter, usePathname } from "next/navigation";

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post(`api/logout`);
    Cookies.remove("token");
    logout();
  };

  const { data } = useGetLogUser();
  const pathname = usePathname();
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
            <Button className="flex-1 hover:opacity-60" onClick={handleLogout}>
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
        </div>
      </div>
    )
  );
};

export default LogoutButton;
