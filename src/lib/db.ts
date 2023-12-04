import getArticleModel from "@/dto/modeldto/schema/ArticleSchema";
import getResourceModel from "@/dto/modeldto/schema/ResourceSchema";
import getUserModel from "@/dto/modeldto/schema/UserSchema";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_CONNECTION_STR ?? "");
mongoose.Promise = global.Promise;

const db = {
  UserEntity: getUserModel(),
  ResourceEntity: getResourceModel(),
  ArticleEntity: getArticleModel(),
};

export default db;
