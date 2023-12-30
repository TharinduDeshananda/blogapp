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
  const formData = new FormData();
  formData.set("title", title);
  const response = await fetch("/api/article", {
    method: "POST",
    body: formData,
  });
  const body = await response.json();

  if (body.status !== 0) throw new Error(body.statusMessage);
  return body.body;
}
