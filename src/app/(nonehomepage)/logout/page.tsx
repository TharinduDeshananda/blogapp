"use client";
import { signOut } from "next-auth/react";
import React from "react";

function LogoutPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white w-full max-w-xl genp rounded-lg min-h-[400px] flex justify-center items-center flex-col gap-y-5">
        <h1 className="text-gray-500 font-bold text-2xl">Confirm Logout!!</h1>
        <button
          className="genbtn"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutPage;
