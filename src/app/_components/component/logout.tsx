"use client";
import axios from "axios";
import Cookies from "js-cookie";

const LogoutButton = ({ logout }: any) => {
  const handleLogout = async () => {
    const response = await axios.post(`api/logout/`);
    console.log("Logout successful!:", response);
    Cookies.remove("token");
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
