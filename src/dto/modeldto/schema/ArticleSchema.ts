import mongoose, { Schema } from "mongoose";
import ArticleModelDto from "../ArticleModelDto";

const articleSchema = new Schema<ArticleModelDto>(
  {
    content: { type: String, required: false },
    resources: [{ type: mongoose.Types.ObjectId, ref: "Resource" }],
    title: { type: String, required: true },
    titleImage: String,
    published: { type: Boolean, default: false },
    author: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default function getArticleModel() {
  return (
    mongoose.models.Article ||
    mongoose.model<ArticleModelDto>("Article", articleSchema)
  );
}
