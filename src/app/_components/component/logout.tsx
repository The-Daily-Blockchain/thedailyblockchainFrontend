"use client";
import axios from "axios";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuthHook";
import { useEffect } from "react";

const LogoutButton = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    const response = await axios.post(`api/logout/`);
    console.log("Logout successful!:", response);
    logout();
  };
  useEffect(() => {
    console.log("Is logged in:", isLoggedIn);
  }, [isLoggedIn]);

  return <>{isLoggedIn && <button onClick={handleLogout}>Logout</button>}</>;
};

export default LogoutButton;
