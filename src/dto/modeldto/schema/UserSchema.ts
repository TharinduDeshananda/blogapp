import mongoose, { Schema } from "mongoose";
import UserModelDto from "../UserModelDto";
import { type } from "os";

const userSchema = new Schema<UserModelDto>({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
  profileImgUrl: String,
});

export default function getUserModel() {
  return (
    mongoose.models.User || mongoose.model<UserModelDto>("User", userSchema)
  );
}
