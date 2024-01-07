import Image from "next/image";
import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
type ArticleDataType = {
  title?: string;
  description?: string;
  dateTime?: Date;
  id?: string;
  imageUrl?: string;
  authorName?: string;
  authorEmail?: string;
  authorImgUrl?: string;
};

function ArticleItem(props: ArticleDataType) {
  return (
    <div className="w-full flex flex-col shadow-md border sm:flex-row genp gap-x-3">
      <div className="relative w-full max-w-[300px] aspect-video self-center overflow-hidden rounded-md">
        <Image
          src={props.imageUrl ?? "/nature.webp"}
          className="object-cover"
          fill
          alt="article image"
        />
      </div>
      <div className="sm:flex-1 flex flex-col">
        <h1 className="font-bold text-lg text-gray-800">
          {props.title ?? "No Title Available"}
        </h1>
        <div className="flex flex-row gap-x-2 border px-2 py-2 rounded-lg">
          <Avatar imageUrl={props.authorImgUrl} />
          <div className="flex flex-col  flex-12  ">
            <h1 className="text-sm text-gray-500 font-bold">
              {props.authorName}
            </h1>
            <h1 className="text-xs text-gray-500">{props.authorEmail}</h1>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          created at: {props.dateTime?.toString() ?? "NA"}
        </div>
        <div className="flex flex-1 flex-col justify-end">
          <Link href={`article/${props.id}`}>
            <button className="genbtn">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
