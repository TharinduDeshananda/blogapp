import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/topBar/TopBar";
import SearchBox from "@/components/searchcomponent/SearchBox";
import Footer from "@/components/footer/Footer";
import QueryClientWrapper from "@/util/QueryClientWrapper";
import UserContextWrapper from "@/lib/UserContextWrapper";
import ToastifyWrapper from "@/util/ToastifyWrapper";
import UserSessionWrapper from "@/lib/UserSessionWrapper";

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
    <html lang="en">
      <body className={inter.className}>
        <UserSessionWrapper>
          <QueryClientWrapper>
            <UserContextWrapper>
              <ToastifyWrapper>
                <div>{children}</div>
              </ToastifyWrapper>
            </UserContextWrapper>
          </QueryClientWrapper>
        </UserSessionWrapper>
      </body>
    </html>
  );
}
