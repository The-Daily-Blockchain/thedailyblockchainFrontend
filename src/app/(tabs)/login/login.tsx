"use client";
import { useAuth } from "@/app/_context/authContext";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <Card className="w-[350px] mt-[-30vh]">
      <CardHeader className="text-center">
        <CardTitle>Log Into TheDailyBlockchain-PH</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username:</Label>
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <CardFooter className="flex justify-center mt-6">
            <Button type="submit">LOGIN</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
