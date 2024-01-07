import ArticleCard from "@/components/articleCard/ArticleCard";
import ArticleItem from "@/components/articleitem/ArticleItem";
import PaginationComp from "@/components/paginationcomp/PaginationComp";
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
  if (page < 0) page = 0;
  if (size <= 0) size = 10;
  const result: ArticleModelDto[] | null = await db.ArticleEntity.find()
    .populate("author")
    .sort({ createdAt: -1 })
    .skip(1 + (page - 1) * size)
    .limit(size);

  return result;
}

async function getTotalPages(size: number) {
  if (size == 0) return 0;
  const count = await db.ArticleEntity.countDocuments({});
  if (!count) return 0;
  const totalPages = Math.floor((count - 1) / size + 1);
  console.log("total pages: ", totalPages);
  return totalPages;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt((searchParams["page"] as string) ?? "1");
  const size = parseInt((searchParams["size"] as string) ?? "10");
  const totalPages = await getTotalPages(size);
  console.log(page, size);

  const article = await getMostRecentArticle();
  const articles: ArticleModelDto[] | null = await getOtherArticles(page, size);

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
          <PaginationComp
            currentPage={page}
            perPage={size}
            totalPages={totalPages}
          />
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
