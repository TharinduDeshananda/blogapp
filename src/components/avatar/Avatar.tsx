import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

type PropType = {
  imageUrl?: string | null;
  wrapperStyle?: string | null;
};

function Avatar({ imageUrl, wrapperStyle = "" }: PropType) {
  return (
    <div
      className={twMerge(
        "w-12 h-12 rounded-full overflow-hidden relative ",
        wrapperStyle
      )}
    >
      <Image
        fill
        className="object-cover"
        alt="user profile image"
        src={imageUrl ?? "/user.jpg"}
      />
    </div>
  );
}

export default Avatar;
