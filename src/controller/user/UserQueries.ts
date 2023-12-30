import { UserCreateType } from "@/app/api/user/route";
import UserModelDto from "@/dto/modeldto/UserModelDto";

export async function createUserMutation(dto: UserCreateType) {
  try {
    const formData = new FormData();
    formData.set("userName", dto.userName ?? "");
    formData.set("email", dto.email ?? "");
    if (dto.password) formData.set("password", dto.password ?? "");
    if (dto.role) formData.set("role", dto.role.toString());
    if (dto.userProfileImgFile)
      formData.set("userProfileImgFile", dto.userProfileImgFile);

    const response = await fetch("/api/user", {
      method: "POST",
      body: formData,
    });

    const body = await response.json();
    if (body.status !== 0) throw new Error(body.statusMessage);
    return body.body;
  } catch (error) {
    throw error;
  }
}
