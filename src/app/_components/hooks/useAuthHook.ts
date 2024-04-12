import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const login = (token: string) => {
    Cookies.set("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
