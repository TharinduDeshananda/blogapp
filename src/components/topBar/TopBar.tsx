"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
import ContextMenu, { ContextMenuItem } from "@/util/contextmenu/ContextMenu";

function TopBar() {
  const session = useSession();

  return (
    <div className="h-[60px] border-b flex flex-row items-center sticky left-0 top-0 overflow-hidden z-50 bg-gray-500">
      <div className="absolute left-3 md:hidden">Menu Button</div>
      <div className="flex-[3] flex justify-center items-center overflow-hidden ">
        <Link href={"/"}>Title</Link>
      </div>
      <div className="flex-[2] hidden md:flex  justify-end  items-stretch h-[60px]">
        <Link
          href="/manage"
          className="bg-gray-900 flex items-center hover:bg-gray-800 transition duration-300"
        >
          <div className="text-gray-400 hover:text-gray-300 transition duration-300 ease-in-out  text-xs genp ">
            <span>Manage</span>
          </div>
        </Link>
        <Link
          href="/#"
          className="bg-gray-900 flex items-center hover:bg-gray-800 transition duration-300"
        >
          <div className="text-gray-400 hover:text-gray-300 transition duration-300 ease-in-out  text-xs genp ">
            <span>Favourites</span>
          </div>
        </Link>
        <Link
          href="/#"
          className="bg-gray-900 flex items-center hover:bg-gray-800 transition duration-300"
        >
          <div className="text-gray-400 hover:text-gray-300 transition duration-300 ease-in-out  text-xs genp ">
            <span>About</span>
          </div>
        </Link>
        {session.status === "unauthenticated" && (
          <Link
            href="/login"
            className="bg-gray-900 flex items-center hover:bg-gray-800 transition duration-300 genp"
          >
            <button className="genbtn">Login</button>
          </Link>
        )}
        {session.status === "authenticated" && (
          <ContextMenu
            onClickAway={() => {}}
            wrapperItem={
              <Avatar
                imageUrl={session.data.user?.image}
                wrapperStyle="cursor-pointer"
              />
            }
          >
            <Link href={"/manage/profile"}>
              <ContextMenuItem title="Profile" />
            </Link>
            <Link href={"/logout"}>
              <ContextMenuItem title="Logout" />
            </Link>
          </ContextMenu>
        )}
      </div>
    </div>
  );
}
export const revalidate = 0;
export default TopBar;
