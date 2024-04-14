import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/_navbar/navbar";
import Footer from "./_navbar/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Daily Blockchain Ph",
  description: "Giving your daily dose of cryptocurrency needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // wards state login
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
