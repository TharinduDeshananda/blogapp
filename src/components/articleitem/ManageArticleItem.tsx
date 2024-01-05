"use client";

import Modal from "@/util/modal/Modal";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
type ArticleDataType = {
  title?: string;
  description?: string;
  dateTime?: Date;
  id?: string;
  imageUrl?: string;
};

function ManageArticleItem(props: ArticleDataType) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
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
          <h1 className="font-bold text-lg text-gray-500">
            {props.title ?? "No Title Available"}
          </h1>
          {/* <div className="text-justify line-clamp-2 text-sm font-bold text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
            veritatis, aperiam eveniet, tenetur exercitationem illum harum quas
            repellat enim doloribus eos sint, nesciunt nisi molestias! Impedit
            ducimus nostrum molestias animi?
          </div> */}
          <div className="text-xs text-gray-500">2023-12-05</div>
          <div className="flex flex-1 flex-row gap-x-5 items-center">
            <Link href={"/manage/manage-article/" + props.id}>
              <button className="genbtn">View</button>
            </Link>
            <button
              onClick={() => setShowMessage(true)}
              className="genbtn bg-red-500 hover:bg-white border border-red-500 hover:text-red-500 hover:border-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {showMessage && (
        <Modal onClickDark={() => setShowMessage(false)}>fdsf</Modal>
      )}
    </>
  );
}

export default ManageArticleItem;
