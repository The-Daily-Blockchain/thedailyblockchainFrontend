"use client";
import { useAuth } from "@/app/_context/authContext";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {}, [isLoggedIn]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      const token = response.data;
      login(token);
      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError;
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
