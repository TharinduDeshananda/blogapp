import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { Document } from "mongoose";

export async function createArticle() {}

export async function removeArticle() {}
export async function filterArticle() {}
export async function getArticle() {}

export async function startArticle(title: string): Promise<ArticleModelDto> {
  try {
    if (!title) throw new Error("Title cannot be empty");
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");
    console.log(session);

    const email = session?.user?.email;
    const user = await db.UserEntity.findOne({ email });
    if (!user) throw new Error("user not found");

    const article = <ArticleModelDto>{ title: title, published: false };

    const createdArticle: Document<ArticleModelDto> =
      await db.ArticleEntity.create(article);

    return {
      title: createdArticle.get("title"),
      id: createdArticle.id,
      published: createdArticle.get("published"),
    };
  } catch (error) {
    console.log("method startArticle failed: ", error);
    throw error;
  }
}

export async function updateArticle(
  dto: ArticleModelDto
): Promise<ArticleModelDto> {
  try {
    console.log(dto);
    if (!dto.id) throw new Error("Article id required");
    const article: Document<ArticleModelDto> | null =
      await db.ArticleEntity.findById(dto.id);
    if (!article) throw new Error("Article not found");

    if (dto.title) article.set("title", dto.title);
    if (dto.content) article.set("content", dto.content);
    if (dto.published) article.set("published", dto.published);

    await article.save();
    return {
      title: article.get("title"),
      id: article.id,
      content: article.get("content"),
      published: article.get("published"),
    };
  } catch (e) {
    console.log("method update article failed: ", e);
    throw e;
  }
}
