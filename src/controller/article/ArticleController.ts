export default async function fetchArtciles({ title }: ArticleQueryDto) {
  const response = await fetch("/api/article", { method: "GET" });

  const body = await response.json();

  if (!response.ok) throw new Error(body.message);

  return body.body;
}

export type ArticleQueryDto = {
  title?: string;
};
