"use client";
import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import NavBar from "@/app/_navbar/navbar";
import Footer from "./_navbar/footer";
import { AuthProvider, useAuth } from "./_context/authContext";
import LogoutButton from "./_components/component/logout";

// const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "The Daily Blockchain Ph",
  description: "Giving your daily dose of cryptocurrency needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          <div className="bg-black text-white">
            <LogoutButton />
          </div>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
