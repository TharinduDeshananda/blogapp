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
    <div className="min-h-[60px] border-b flex flex-row items-center sticky left-0 top-0 bg-gray-50 z-50">
      <div className="absolute left-3 md:hidden">Menu Button</div>
      <div className="flex-[3] flex justify-center items-center">
        <Link href={"/"}>Title</Link>
      </div>
      <div className="flex-[2] hidden md:flex items-center justify-end mr-3 gap-x-3 ">
        <Link href="/manage">Manage</Link>
        <Link href="#">About</Link>
        <Link href="#">About</Link>
        {session.status === "unauthenticated" && (
          <Link href="/login">
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
