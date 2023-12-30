"use client";
import Avatar from "@/components/avatar/Avatar";
import LoadingComp from "@/components/loadingcomp/LoadingComp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

type FormType = {
  userName?: string;
  password?: string;
  profileImgFile?: File;
  id: string;
};

function Profile() {
  const session = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImgFile, setProfileImgFile] = useState<File | null>(null);
  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
  const [haveChanges, sethaveChanges] = useState(false);

  const updateUserMutation = useMutation({
    mutationFn: async (data: FormType) => {
      try {
        if (!data.id) throw new Error("user id is not available");
        const formData = new FormData();
        formData.set("id", data.id);
        formData.set("userName", data.userName ?? "");
        formData.set("password", data.password ?? "");
        if (data.profileImgFile)
          formData.set("userProfileImgFile", data.profileImgFile);

        const response = await fetch("/api/user", {
          method: "POST",
          body: formData,
        });
        const body = await response.json();
        if (body.status !== 0) throw new Error(body.statusMessage);
        return body.body;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Update success");
      session.update();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Update failed " + (error as any).message);
      sethaveChanges(true);
    },
  });

  function handleSubmit() {
    sethaveChanges(false);
    const mutateParams = { userName: userName, password: password } as FormType;
    if (profileImgFile) mutateParams.profileImgFile = profileImgFile;
    if (session.data?.user?.id) mutateParams.id = session.data?.user?.id;
    updateUserMutation.mutate(mutateParams);
  }

  useEffect(() => {
    console.log(session?.data);
    if (session.status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (session.status === "loading") return;
    setUserName(session.data?.user?.name ?? "");
    setProfileImgUrl(session.data?.user?.image ?? null);
  }, [session, router]);

  return (
    <div className="w-full flex flex-col items-center">
      {(updateUserMutation.isLoading || session.status === "loading") && (
        <LoadingComp />
      )}
      {updateUserMutation.isError && (
        <div className="bg-red-100 rounded-lg text-red-500 text-xs genp text-center">
          {(updateUserMutation?.error as Error).message}
        </div>
      )}
      {/* user avatar start */}
      <label
        className="w-auto h-auto relative border rounded-full cursor-pointer"
        htmlFor="imgFile"
      >
        <Avatar imageUrl={profileImgUrl} wrapperStyle={"w-24 h-24"} />
      </label>
      {/* user avatar end */}

      <h1 className="text-center font-bold text-gray-500 text-xl">
        {session?.data?.user?.email}
      </h1>

      <div className="grid grid-cols-2 w-full max-w-2xl text-sm gap-y-3 genp items-center">
        <label htmlFor="userName">User Name</label>
        <input
          type="text"
          className="geninput"
          placeholder="Your user name here"
          value={userName}
          onChange={(e) => {
            sethaveChanges(true);
            setUserName(e.target.value);
          }}
        />
        <h2 className="text-gray-500 text-xs col-span-2">
          Enter new password if intend to change the password also.
        </h2>
        <label htmlFor="userName">Password</label>
        <input
          type="password"
          className="geninput"
          placeholder="Your password here"
          value={password}
          onChange={(e) => {
            sethaveChanges(true);
            setPassword(e.target.value);
          }}
        />
        <div className="flex justify-center items-center col-span-2 flex-col">
          <button
            className="genbtn"
            disabled={!haveChanges}
            onClick={handleSubmit}
          >
            Apply Changes
          </button>
          <input
            type="file"
            id="imgFile"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                setProfileImgFile(file);
                setProfileImgUrl(URL.createObjectURL(file));
                sethaveChanges(true);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PencilIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={twMerge(`w-6 h-6`, className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 21l-1.42-1.42L15.17 12H2v-2h13.17L8.58 4.41 10 3l7 7-7 7z"
      />
    </svg>
  );
}

export default Profile;
