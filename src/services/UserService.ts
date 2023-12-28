import UserModelDto from "@/dto/modeldto/UserModelDto";
import db from "@/lib/db";
import { hashPassword } from "@/util/passwordUtil";
import { Document } from "mongoose";

export async function createUser(dto: UserModelDto) {
  try {
    console.log("Method createUser start");
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
export async function getUser() {}
export async function filterUsers() {}
