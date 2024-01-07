import Image from "next/image";
import React from "react";
import Avatar from "../avatar/Avatar";
import Link from "next/link";

type PropType = {
  titleImg?: string;
  title?: string;
  authorEmail?: string;
  authorUserName?: string;
  authorImgUrl?: string;
  createdAt?: Date;
  articleId?: string;
};

function ArticleCard({
  titleImg,
  title,
  authorEmail,
  authorUserName,
  createdAt,
  authorImgUrl,
  articleId,
}: PropType) {
  return (
    <div className="w-full flex flex-col items-center max-w-[640px] rounded-md overflow-hidden genp border">
      <h1 className="text-center font-bold text-gray-500 md:text-2xl text-lg  capitalize my-2 break-all px-2">
        {title}
      </h1>
      <div className="w-full  aspect-video relative rounded-md overflow-hidden">
        <Image
          fill
          src={titleImg ?? "/nature.webp"}
          alt={`${title} article image`}
          className="object-cover"
        />
      </div>
      {/* card details */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-x-5 shadow-md border py-2 px-2 rounded-lg">
          <Avatar imageUrl={authorImgUrl} />
          <div className="flex-1 flex-col justify-center gap-y-1 ">
            <h1 className="text-sm text-gray-500 font-bold">
              {authorUserName}
            </h1>
            <h1 className="text-xs text-gray-500">{authorEmail}</h1>
          </div>
        </div>
        <Link href={`/article/${articleId}`}>
          <button className="genbtn text-xs my-2">View</button>
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
