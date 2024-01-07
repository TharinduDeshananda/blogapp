import ArticleCard from "@/components/articleCard/ArticleCard";
import ArticleItem from "@/components/articleitem/ArticleItem";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import db from "@/lib/db";

async function getMostRecentArticle() {
  const result: ArticleModelDto[] | null = await db.ArticleEntity.find()
    .sort({ createdAt: -1 })
    .populate("author")
    .limit(1);
  if (!result || result.length == 0) return null;
  return result[0];
}

async function getOtherArticles(page: number, size: number) {
  const result: ArticleModelDto[] | null = await db.ArticleEntity.find()
    .populate("author")
    .sort({ createdAt: -1 })
    .skip(1 + page)
    .limit(size);

  return result;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt((searchParams["page"] as string) ?? "0");
  const size = parseInt((searchParams["size"] as string) ?? "0");

  console.log(page, size);

  const article = await getMostRecentArticle();
  const articles: ArticleModelDto[] | null = await getOtherArticles(0, 10);

  if (!article)
    return (
      <div className="w-full min-h-screen max-w-5xl mx-auto bg-white genp rounded-md">
        No article available
      </div>
    );
  return (
    <div className="w-full min-h-screen max-w-5xl mx-auto bg-white genp rounded-md">
      <h1 className="genh">Most recent..</h1>
      <div className="w-full min-h-[400px] flex justify-center items-center ">
        <ArticleCard
          articleId={(article as any)._id}
          title={article.title}
          titleImg={article.titleImage}
          authorEmail={article.author?.email}
          authorImgUrl={article.author?.profileImgUrl}
          authorUserName={article.author?.userName}
          createdAt={(article as any).createdAt}
        />
      </div>
      {articles && (
        <>
          <h1 className="genh">Previous articles</h1>
          <div className="flex w-full flex-col gap-y-10">
            {articles.map((i, index: number) => (
              <ArticleItem
                key={index}
                title={i.title}
                imageUrl={i.titleImage}
                dateTime={(i as any).createdAt}
                authorName={i?.author?.userName}
                authorEmail={i?.author?.email}
                authorImgUrl={i.author?.profileImgUrl}
                id={(i as any)._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const revalidate = 0;
