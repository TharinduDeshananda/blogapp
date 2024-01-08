import ArticleItem from "@/components/articleitem/ArticleItem";
import React from "react";

async function getPostsForQuery(keyword: string) {
  await new Promise((res) => setTimeout(res, 3000));

  try {
    return [
      {
        title: "Post title",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solutevitae, quo fugiat est inventore asperiores laboriosam velit veritatisquasi, deleniti quod necessitatibus rem accusantium dolorum rationeodio magnam deserunt impedit?",
        dateTime: new Date(),
      },
      {
        title: "Post title",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solutevitae, quo fugiat est inventore asperiores laboriosam velit veritatisquasi, deleniti quod necessitatibus rem accusantium dolorum rationeodio magnam deserunt impedit?",
        dateTime: new Date(),
      },
      {
        title: "Post title",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solutevitae, quo fugiat est inventore asperiores laboriosam velit veritatisquasi, deleniti quod necessitatibus rem accusantium dolorum rationeodio magnam deserunt impedit?",
        dateTime: new Date(),
      },
      {
        title: "Post title",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Solutevitae, quo fugiat est inventore asperiores laboriosam velit veritatisquasi, deleniti quod necessitatibus rem accusantium dolorum rationeodio magnam deserunt impedit?",
        dateTime: new Date(),
      },
    ];
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("search params: ", searchParams);
  const data = await getPostsForQuery("");

  return (
    <div className="flex flex-col gap-y-6">
      {data.map((i, index) => (
        <ArticleItem key={index} />
      ))}
    </div>
  );
}

export default SearchPage;
