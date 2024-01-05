import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import mongoose, {
  Aggregate,
  Document,
  FilterQuery,
  PipelineStage,
} from "mongoose";
import UserModelDto from "@/dto/modeldto/UserModelDto";

export async function removeArticle(articleId: string) {
  try {
    console.log("method removeArticle start");
    const success = await db.ArticleEntity.findByIdAndDelete(articleId);
    console.log("method removeArticle success");
    return success;
  } catch (error) {
    console.log("method removeArticle failed: ", (error as Error).message);
    throw error;
  }
}

export class ArticleFilterType {
  title?: string;
  authorName?: string;
  authorEmail?: string;
  published?: boolean;
  page?: number;
  size?: number;
}

export async function getArticle(filter: ArticleFilterType) {
  try {
    console.log("method getArticle start");
    const page: number = filter.page ?? 0;
    const size: number = filter.size ?? 10;
    const pipeline: PipelineStage[] = [];
    if (filter.title) {
      pipeline.push({ $match: { title: new RegExp(filter.title, "i") } });
    }
    if (filter.published) {
      pipeline.push({ $match: { published: true } });
    }
    if (filter.authorName || filter.authorEmail) {
      pipeline.push({
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorobj",
        },
      });

      if (filter.authorName) {
        pipeline.push({
          $match: { "authorobj.userName": new RegExp(filter.authorName, "i") },
        });
      }
      if (filter.authorEmail) {
        pipeline.push({
          $match: { "authorobj.email": new RegExp(filter.authorEmail, "i") },
        });
      }
    }

    pipeline.push({ $skip: size * page });
    pipeline.push({ $limit: size });

    const filteredArticles: ArticleModelDto[] =
      await db.ArticleEntity.aggregate(pipeline);

    console.log("method getArticle success");
    return filteredArticles;
  } catch (e) {
    console.log("Method getArticle failed: ", e);
    throw e;
  }
}

export async function getOwnArticles(filter: ArticleFilterType) {
  try {
    console.log("method getOwnArticles start");

    const session = await getServerSession(authOptions);
    console.log(session);
    const email = session?.user?.email;
    if (!email) throw new Error("User not logged in");
    const page: number = filter.page ?? 0;
    const size: number = filter.size ?? 10;
    const pipeline: PipelineStage[] = [];
    if (filter.title) {
      pipeline.push({ $match: { title: new RegExp(filter.title, "i") } });
    }
    if (filter.published) {
      pipeline.push({ $match: { published: true } });
    }

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorobj",
      },
    });

    pipeline.push({
      $match: { "authorobj.email": email },
    });

    // pipeline.push({ $skip: size * page });
    // pipeline.push({ $limit: size });

    const filteredArticles: ArticleModelDto[] =
      await db.ArticleEntity.aggregate(pipeline);

    console.log("method getOwnArticles success");
    return filteredArticles;
  } catch (e) {
    console.log("Method getOwnArticles failed: ", e);
    throw e;
  }
}

export async function startArticle(title: string): Promise<ArticleModelDto> {
  try {
    if (!title) throw new Error("Title cannot be empty");
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const email = session?.user?.email;
    const user: Document<UserModelDto> | null = await db.UserEntity.findOne({
      email,
    });
    if (!user) throw new Error("user not found");

    const article = <ArticleModelDto>{
      title: title,
      published: false,
      author: user._id,
    };

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
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const email = session?.user?.email;
    const user: Document<UserModelDto> | null = await db.UserEntity.findOne({
      email,
    });
    if (!user) throw new Error("user not found");

    if (!dto.id) throw new Error("Article id required");
    const article: Document<ArticleModelDto> | null =
      await db.ArticleEntity.findById(dto.id);
    if (!article) throw new Error("Article not found");

    if (article.get("author").toString() !== user.id)
      throw new Error("You have no permission to update this article");

    if (dto.title) article.set("title", dto.title);
    if (dto.content) article.set("content", dto.content);
    if (dto.published) article.set("published", dto.published);

    if (dto.titleImage) article.set("titleImage", dto.titleImage);

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
