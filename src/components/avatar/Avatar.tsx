import Image from "next/image";
import React from "react";

type PropType = {
  imageUrl?: string | null;
};

function Avatar({ imageUrl }: PropType) {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden relative ">
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
