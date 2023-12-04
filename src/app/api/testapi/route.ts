import { uploadFileToS3 } from "@/util/s3client/FileUpload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("resourceFiles") as File[];
    console.log(files[0]);
    const result = await uploadFileToS3(files[0], files[0].name);
    console.log(result);
    return NextResponse.json(files[0]);
  } catch (e) {
    return NextResponse.json("NOT OK");
  }
}

export const revalidate = 0;
