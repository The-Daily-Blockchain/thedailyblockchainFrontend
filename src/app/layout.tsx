import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/_navbar/navbar";
import Footer from "./_navbar/footer";
import { AuthProvider, useAuth } from "./_context/authContext";
import LogoutButton from "./_components/component/logout";
import { ROOT_SEO } from "@/app/_seo/seo_config";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ROOT_SEO.TITLE,
  description: ROOT_SEO.DESCRIPTION,
  icons: { icon: ROOT_SEO.LOGO },
  authors: { name: ROOT_SEO.AUTHOR },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={""}>
            <NavBar />
          </Suspense>
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
