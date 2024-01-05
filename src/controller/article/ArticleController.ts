import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";

export default async function fetchArtciles({
  title,
  page = 0,
  size = 10,
}: ArticleQueryDto) {
  const response = await fetch(
    `/api/article/own?title=${title}&page=${page}&size=${size}`,
    { method: "GET" }
  );
  const body = await response.json();
  if (body.status != 0) throw new Error(body.statusMessage);
  console.log(body.body);
  return body.body;
}

export type ArticleQueryDto = {
  title?: string;
  page?: number;
  size?: number;
};

export async function startArticle(title: string) {
  try {
    const formData = new FormData();
    formData.set("title", title);
    const response = await fetch("/api/article", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();

    if (body.status !== 0) throw new Error(body.statusMessage);
    return body.body;
  } catch (error) {
    console.log("Article start failed");
    throw error;
  }
}

export async function updateArticle(dto: ArticleModelDto) {
  try {
    const response = await fetch("/api/article", {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
    const body = await response.json();

    if (body.status !== 0) throw new Error(body.statusMessage);
    return body.body;
  } catch (error) {
    console.log("Article update failed: ", error);
    throw error;
  }
}

export async function updateArticleWithTitleImage({
  imgFile,
  articleId,
}: {
  imgFile: File;
  articleId: string;
}) {
  try {
    const formData = new FormData();
    formData.set("titleImgFile", imgFile);
    formData.set("articleId", articleId);
    const response = await fetch("/api/article", {
      method: "PUT",
      body: formData,
    });
    const body = await response.json();

    if (body.status !== 0) throw new Error(body.statusMessage);
    return body.body;
  } catch (error) {
    console.log("Article update failed: ", error);
    throw error;
  }
}
