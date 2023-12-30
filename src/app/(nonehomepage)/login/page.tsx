"use client";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function LoginPage() {
  const params = useSearchParams();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic here

    signIn("credentials", {
      username: userName,
      password: password,
      callbackUrl: "/",
      redirect: true,
    });
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen">
      <div className="max-w-md w-full space-y-8 bg-white genp rounded-lg">
        {params?.get("error") && (
          <div className="bg-red-100 rounded-lg text-red-500 text-xs genp text-center">
            {params.get("error")}
          </div>
        )}

        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Continue with Google
            </button>
          </div>
        </form>
        <Link
          href={"/new-account"}
          className="text-blue-500 cursor-pointer text-sm text-center hover:underline"
        >
          If you do not have an account. Create one.
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
