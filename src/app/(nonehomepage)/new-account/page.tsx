"use client";
import Avatar from "@/components/avatar/Avatar";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import { createUserMutation } from "@/controller/user/UserQueries";
import UserRole from "@/enum/UserRole";
import UserContext, { UserAction } from "@/lib/UserContext";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

function NewAccountPage() {
  const [state, dispatch] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfileImage, setUserProfileImage] = useState<File | null>(null);
  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
  const router = useRouter();
  const userCreateMuTation = useMutation({
    mutationFn: createUserMutation,
    onSuccess: (data) => {
      console.log("use creation success");
      toast.success("User creation success");
      setTimeout(() => router.replace("/login"), 2000);
    },
  });

  const handleCreateAccount = () => {
    // Implement create account logic here
    console.log("Create account clicked");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("UserProfileImage:", userProfileImage);

    userCreateMuTation.mutate({
      password,
      email,
      profileImgUrl: profileImgUrl ?? "",
      userName: username,
      role: UserRole.USER,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files[0]) {
        setUserProfileImage(files[0]);
        const imgUrl = URL.createObjectURL(files[0]);
        setProfileImgUrl(imgUrl);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {userCreateMuTation.isLoading && <LoadingComp />}
      {userCreateMuTation.isError && (
        <div className="bg-red-100 rounded-lg text-red-500 text-xs genp text-center">
          {userCreateMuTation.error as string}
        </div>
      )}
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <div className="w-full flex justify-center items-center">
            <Avatar imageUrl={profileImgUrl} />
          </div>
        </div>

        <form className="mt-8 space-y-6">
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
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="userProfileImage" className="sr-only">
                User Profile Image
              </label>
              <input
                id="userProfileImage"
                name="userProfileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAccountPage;
