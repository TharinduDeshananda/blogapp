import UserRole from "@/enum/UserRole";
import ArticleModelDto from "./ArticleModelDto";

export default class UserModelDto {
  userName?: string;
  password?: string;
  email?: string;
  role?: UserRole;
  articles?: ArticleModelDto[];
}
