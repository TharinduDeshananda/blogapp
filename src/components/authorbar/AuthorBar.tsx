"use client";
import React from "react";
import Avatar from "../avatar/Avatar";
interface PropType {
  userName?: string;
  email?: string;
  createdAt?: Date;
  authorImg?: string;
}

function AuthorBar({
  userName = "NA",
  createdAt,
  email = "NA",
  authorImg,
}: PropType) {
  return (
    <div className="w-full flex items-center genp border rounded-lg mb-5 gap-x-5">
      <Avatar imageUrl={authorImg} />
      <div className="flex flex-col flex-1 justify-center">
        <h1 className="text-base font-bold text-blue-700  cursor-pointer">
          {userName}
        </h1>
        <h1 className="text-xs font-bold text-gray-500  cursor-pointer">
          {email}
        </h1>
        <h5 className="text-xs font-bold text-gray-500  cursor-pointer">
          {createdAt?.toString() ?? ""}
        </h5>
      </div>
    </div>
  );
}

export default AuthorBar;
