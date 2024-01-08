export async function addArticleToFavouritesOfUser(articleId: string) {
  try {
    if (!articleId) throw new Error("article id is required");
    const formData = new FormData();
    formData.set("articleId", articleId);
    const result = await fetch("/api/article/favourite", {
      method: "POST",
      body: formData,
    });
    const body = await result.json();
    if (body.status !== 0) throw new Error(body.statusMessage);
    return body.body;
  } catch (error) {
    throw error;
  }
}
