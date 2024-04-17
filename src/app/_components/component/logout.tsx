"use client";
import { useAuth } from "@/app/_context/authContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useGetLogUser } from "../hooks/useGetLogUser";

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = async () => {
    const response = await axios.post(`api/logout`);
    Cookies.remove("token");
    logout();
  };

  const { data } = useGetLogUser();
  return (
    isLoggedIn && (
      <div className="flex py-2 mr-2 items-center">
        {data && (
          <div className="flex-1 ml-2 text-left">
            Logged User: {data?.first_name} {data?.last_name}
          </div>
        )}
        <div>
          <Button className="flex-1" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    )
  );
};

export default LogoutButton;
