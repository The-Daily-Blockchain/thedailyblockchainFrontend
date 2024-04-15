"use client";
import { useAuth } from "@/app/_context/authContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = async () => {
    const response = await axios.post(`api/logout`);
    Cookies.remove("token");
    logout();
  };
  return (
    isLoggedIn && (
      <Button className="my-2 mr-2" onClick={handleLogout}>
        Logout
      </Button>
    )
  );
};

export default LogoutButton;
