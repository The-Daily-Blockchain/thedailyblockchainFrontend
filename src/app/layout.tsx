"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/_navbar/navbar";
import Footer from "./_navbar/footer";
import LogoutButton from "./_components/component/logout";
import useAuth from "./_components/hooks/useAuthHook";
import Page from "./(tabs)/login/page";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "The Daily Blockchain Ph",
  description: "Giving your daily dose of cryptocurrency needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, login, logout } = useAuth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {isLoggedIn && <LogoutButton logout={logout} />}
        {false && <Page isLoggedIn={isLoggedIn} login={login} />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
