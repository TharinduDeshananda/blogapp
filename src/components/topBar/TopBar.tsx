import Link from "next/link";
import React from "react";

function TopBar() {
  return (
    <div className="min-h-[60px] border-b flex flex-row items-center sticky left-0 top-0 bg-gray-50 z-50">
      <div className="absolute left-3 md:hidden">Menu Button</div>
      <div className="flex-[3] flex justify-center items-center">
        <Link href={"/"}>Title</Link>
      </div>
      <div className="flex-[2] hidden md:flex items-center justify-end mr-3 gap-x-3">
        <Link href="/manage">Manage</Link>
        <Link href="#">About</Link>
        <Link href="#">About</Link>
        <Link href="#">About</Link>
      </div>
    </div>
  );
}

export default TopBar;
