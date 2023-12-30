import mongoose, { Schema } from "mongoose";
import ArticleModelDto from "../ArticleModelDto";

const articleSchema = new Schema<ArticleModelDto>({
  content: { type: String, required: false },
  resources: [{ type: mongoose.Types.ObjectId, ref: "Resource" }],
  title: { type: String, required: true },
  published: { type: Boolean, default: false },
});

export default function getArticleModel() {
  return mongoose.models.Article || mongoose.model("Article", articleSchema);
}
