"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/_navbar/navbar";
import Footer from "./_navbar/footer";
import { AuthProvider, useAuth } from "./_context/authContext";
import LogoutButton from "./_components/component/logout";
import { useGetLogUser } from "./_components/hooks/useGetLogUser";

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
  const { data } = useGetLogUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <div className="flex text-white bg-black items-center">
            {data && (
              <div className="flex-1 ml-2 text-left">
                Logged User: {data?.first_name} {data?.last_name}
              </div>
            )}
            <div className="flex-1 text-right">
              <LogoutButton />
            </div>
          </div>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
