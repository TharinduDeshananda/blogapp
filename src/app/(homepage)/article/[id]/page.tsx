import AuthorBar from "@/components/authorbar/AuthorBar";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import { getSingleArticle } from "@/services/ArticleService";
import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";

async function getArticle(id: string) {
  try {
    const articleData: ArticleModelDto = await getSingleArticle(id);

    return articleData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function ArticlePage({ params }: { params: { id: string } }) {
  const articleData = await getArticle(params.id);
  // const content = DOMPurify.sanitize(articleData?.content ?? "");
  const content = articleData?.content ?? "";

  if (!articleData)
    return (
      <div className="w-full min-h-[500px] max-w-5xl mx-auto rounded-lg flex flex-col justify-center items-center gap-y-5 bg-white">
        <h1>Article not found</h1>
        <Link href={"/"}>
          <button className="genbtn text-xs">Back to Home</button>
        </Link>
      </div>
    );
  return (
    <div className="w-full min-h-screen max-w-5xl mx-auto bg-white genp rounded-md">
      <h1 className="font-bold text-3xl text-center my-5 capitalize ">
        {articleData.title}hjhjh
      </h1>
      <div className="font-bold text-xs">Article by</div>
      <AuthorBar
        userName={articleData.author?.userName}
        email={articleData.author?.email}
        authorImg={articleData.author?.profileImgUrl}
        createdAt={(articleData as any).createdAt}
      />
      <div className="text-xs">
        Article last updated: {(articleData as any).updatedAt?.toString()}
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}

export default ArticlePage;
export const revalidate = 0;
