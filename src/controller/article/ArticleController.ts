import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";

export default async function fetchArtciles({ title }: ArticleQueryDto) {
  const response = await fetch("/api/article", { method: "GET" });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body.body;
}

export type ArticleQueryDto = {
  title?: string;
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
