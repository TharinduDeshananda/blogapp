import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import TopBar from "@/components/topBar/TopBar";
import SearchBox from "@/components/searchcomponent/SearchBox";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      <div className="max-w-5xl mx-auto w-full">
        <SearchBox />
      </div>
      <div className="w-full ">{children}</div>

      <Footer />
    </div>
  );
}