import CommonResponse from "@/dto/common/CommonResponse";
import UserModelDto from "@/dto/modeldto/UserModelDto";
import { createUser, updateUser } from "@/services/UserService";
import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
  } catch (error) {
    return NextResponse.json(
      new CommonResponse(1, (error as Error).message, null)
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const dto = plainToInstance(UserModelDto, data);
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
    return NextResponse.json(
      new CommonResponse(1, (error as Error).message, null)
    );
  }
}

export const revalidate = 0;
