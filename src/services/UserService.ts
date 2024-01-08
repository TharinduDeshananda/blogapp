import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserModelDto from "@/dto/modeldto/UserModelDto";
import { getUserRoleEnumFromString } from "@/enum/UserRole";
import db from "@/lib/db";
import { hashPassword } from "@/util/passwordUtil";
import { Document } from "mongoose";
import { getServerSession } from "next-auth";

export async function createUser(dto: UserModelDto) {
  try {
    console.log("Method createUser start");
    if (dto.password) dto.password = await hashPassword(dto.password);
    const savedUser: Document<UserModelDto> = await db.UserEntity.create(dto);
    console.log("Method createUser success");
    return <UserModelDto>{
      userName: savedUser.get("userName"),
      email: savedUser.get("email"),
      role: savedUser.get("role"),
      profileImgUrl: savedUser.get("profileImgUrl"),
    };
  } catch (error) {
    console.error("Method createUser failed", error);
    throw error;
  }
}
export async function updateUser(dto: UserModelDto): Promise<UserModelDto> {
  try {
    console.log("Method updateUser start");
    const savedUser: Document<UserModelDto> | null =
      await db.UserEntity.findById(dto.id);
    if (!savedUser) throw new Error("User not found");

    if (dto.userName) savedUser.set("userName", dto.userName);
    if (dto.password) savedUser.set("password", hashPassword(dto.password));
    if (dto.profileImgUrl) savedUser.set("profileImgUrl", dto.profileImgUrl);
    if (dto.role) savedUser.set("role", dto.role);
    await savedUser.save();
    console.log("Method updateUser success");
    return {
      id: savedUser._id as string,
      userName: savedUser.get("userName"),
      email: savedUser.get("email"),
      profileImgUrl: savedUser.get("profileImgUrl"),
      role: savedUser.get("role"),
    };
  } catch (error) {
    console.error("Method updateUser failed", error);
    throw error;
  }
}
export async function getUser(email?: string): Promise<UserModelDto> {
  try {
    console.log("method getUser start");
    const user: Document<UserModelDto> | null = await db.UserEntity.findOne({
      email,
    });
    if (!user) throw new Error("User not found");
    console.log("method getUser success");
    return {
      email: user?.get("email"),
      userName: user?.get("userName"),
      password: user?.get("password"),
      profileImgUrl: user?.get("profileImgUrl"),
      role: getUserRoleEnumFromString(user?.get("role")) ?? undefined,
      id: user?.id,
    };
  } catch (error) {
    console.error("Method getUser failed: ", error);
    throw error;
  }
}

export async function addFavouriteArticle(articleId: string) {
  try {
    console.log("method addFavouriteArticle start ");
    const article = await db.ArticleEntity.findById(articleId);
    if (!article) throw new Error("article not found");

    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Need to be logged in");
    const user = session.user;
    if (!user) throw new Error("logged in user not found");

    const result = await db.UserEntity.findOneAndUpdate(
      {
        email: user.email,
        favouriteArticles: { $not: { $elemMatch: { $eq: articleId } } },
      },
      { $addToSet: { favouriteArticles: articleId } }
    );
    console.log(result);
    console.log("method addFavouriteArticle success ");
  } catch (error) {
    console.log("method addFavouriteArticle failed: ", error);
    throw error;
  }
}

export async function filterUsers() {}
