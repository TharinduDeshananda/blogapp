import Image from "next/image";
import React from "react";

function ArticleCard() {
  return (
    <div className="w-full flex flex-col items-center max-w-[640px] rounded-md overflow-hidden genp border">
      <div className="w-full  aspect-video relative rounded-md overflow-hidden">
        <Image
          fill
          src={"/nature.webp"}
          alt="nature image"
          className="object-cover"
        />
      </div>
      {/* card details */}
      <div className="flex flex-col w-full">
        <h1>How create more partitions in windows 11</h1>
        <p className="w-full text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          vitae, quo fugiat est inventore asperiores laboriosam velit veritatis
          quasi, deleniti quod necessitatibus rem accusantium dolorum ratione
          odio magnam deserunt impedit?
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;
