import mongoose, { Schema } from "mongoose";
import UserModelDto from "../UserModelDto";

const userSchema = new Schema<UserModelDto>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    articles: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
    favouriteArticles: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
    profileImgUrl: String,
  },
  { timestamps: true }
);

export default function getUserModel() {
  return (
    mongoose.models.User || mongoose.model<UserModelDto>("User", userSchema)
  );
}
