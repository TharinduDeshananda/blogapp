"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Avatar from "../avatar/Avatar";
import { useMutation } from "react-query";
import { addArticleToFavouritesOfUser } from "@/controller/favourite/FavouriteQuery";
import { toast } from "react-toastify";
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
  const favouriteMutation = useMutation({
    mutationFn: addArticleToFavouritesOfUser,
    onError: (e: Error) => {
      toast.error("failed: " + e.message);
    },
    onSuccess: () => {
      toast.success("Success");
    },
  });

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
        <div className="flex  flex-row justify-end flex-wrap gap-x-2">
          <Link href={`article/${props.id}`}>
            <button className="genbtn text-xs">View</button>
          </Link>

          <button
            className="genbtn text-xs flex items-center gap-x-2"
            onClick={() => favouriteMutation.mutate(props.id ?? "")}
          >
            Add to Favourites{" "}
            {favouriteMutation.isLoading && (
              <div className="w-3 h-3 rounded-full border-t border-r border-b border-white animate-spin "></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
