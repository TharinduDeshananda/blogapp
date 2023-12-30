import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { Document } from "mongoose";
export async function createArticle() {}
export async function updateArticle() {}
export async function removeArticle() {}
export async function filterArticle() {}
export async function getArticle() {}

export async function startArticle(title: string): Promise<ArticleModelDto> {
  try {
    if (!title) throw new Error("Title canotbe empty");
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
