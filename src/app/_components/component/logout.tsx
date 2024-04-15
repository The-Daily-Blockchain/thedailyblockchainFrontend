"use client";
import { useAuth } from "@/app/_context/authContext";
import axios from "axios";
import Cookies from "js-cookie";

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = async () => {
    const response = await axios.post(`api/logout`);
    console.log("Logout successful!:", response);
    Cookies.remove("token");
    logout();
  };
  return isLoggedIn && <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
