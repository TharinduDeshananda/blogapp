"use client";
import Image from "next/image";
import React from "react";

type ResourceType = {
  resourceUrl?: string;
  thumbnailUrl?: string;
};

function ArticleResource({ resourceUrl, thumbnailUrl }: ResourceType) {
  return (
    <div className="w-24 min-w-[96px] aspect-video flex flex-row relative rounded-md overflow-hidden shadow-md cursor-pointer">
      <Image
        src={thumbnailUrl ?? "/nature.webp"}
        fill
        alt="resource thumbnail"
      />
    </div>
  );
}

export default ArticleResource;
