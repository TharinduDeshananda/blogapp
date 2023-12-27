import UserModelDto from "@/dto/modeldto/UserModelDto";
import { createUser } from "@/services/UserService";
import { uploadFileToS3 } from "@/util/s3client/FileUpload";
import { plainToInstance } from "class-transformer";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const createduser = await createUser(plainToInstance(UserModelDto, body));

    return NextResponse.json(createduser);
  } catch (e) {
    return NextResponse.json("NOT OK");
  }
}

export const revalidate = 0;
