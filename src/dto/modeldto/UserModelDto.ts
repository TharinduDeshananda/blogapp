import UserRole from "@/enum/UserRole";
import ArticleModelDto from "./ArticleModelDto";

export default class UserModelDto {
  id?: string;
  userName?: string;
  password?: string;
  email?: string;
  role?: UserRole;
  articles?: ArticleModelDto[];
  profileImgUrl?: string;
}
