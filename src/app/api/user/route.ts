import CommonResponse from "@/dto/common/CommonResponse";
import UserModelDto from "@/dto/modeldto/UserModelDto";
import UserRole, { getUserRoleEnumFromString } from "@/enum/UserRole";
import { createUser, updateUser } from "@/services/UserService";
import { uploadFileToS3 } from "@/util/s3client/FileUpload";
import { instanceToInstance, plainToInstance } from "class-transformer";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json(
      new CommonResponse(1, (error as Error).message, null)
    );
  }
}

export class UserCreateType extends UserModelDto {
  userProfileImgFile?: File;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const requestDto = <UserCreateType>{};
    requestDto.id = data.get("id") as string;
    requestDto.email = data.get("email") as string;
    requestDto.userName = data.get("userName") as string;
    requestDto.role =
      getUserRoleEnumFromString(data.get("role") as string) ?? undefined;
    requestDto.password = data.get("password") as string;
    requestDto.userProfileImgFile = data.get("userProfileImgFile") as File;

    if (requestDto.userProfileImgFile) {
      console.log(
        "image file is present. ",
        requestDto.userProfileImgFile.name,
        "  ",
        requestDto.userProfileImgFile.type
      );
      const file = requestDto.userProfileImgFile;
      const uploadResult = await uploadFileToS3(file, randomUUID() + file.name);
      requestDto.profileImgUrl = uploadResult.Location;
      console.log(" profile image upload success");
    }

    const dto: UserModelDto = requestDto;
    if (dto.id) {
      const updatedUser = await updateUser(dto);
      return NextResponse.json(
        new CommonResponse(0, "User updated", updatedUser)
      );
    } else {
      const createdUser = await createUser(dto);
      return NextResponse.json(
        new CommonResponse(0, "User updated", createdUser)
      );
    }
  } catch (error) {
    console.error("User creation failed: ", error);
    return NextResponse.json(
      new CommonResponse(1, (error as Error).message, null)
    );
  }
}

export const revalidate = 0;
