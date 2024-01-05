import CommonResponse from "@/dto/common/CommonResponse";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import {
  ArticleFilterType,
  getArticle,
  startArticle,
  updateArticle,
} from "@/services/ArticleService";
import { uploadFileToS3 } from "@/util/s3client/FileUpload";
import { plainToInstance } from "class-transformer";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams.entries();

    const plainObj: any = {};
    if (params) {
      for (let [key, value] of params) {
        plainObj[key] = value;
      }
    }

    const filterDto = plainToInstance(ArticleFilterType, plainObj);

    const data = await getArticle(filterDto);
    return NextResponse.json(new CommonResponse(0, "Success", data));
  } catch (e) {
    console.error("Article fetch failed: " + e);
    return NextResponse.json(
      new CommonResponse(1, (e as any as Error).message, e)
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const title = body.get("title");
    const response = await startArticle(title as string);
    return NextResponse.json(new CommonResponse(0, "Success", response));
  } catch (e) {
    console.error("Article start failed: ", e);
    return NextResponse.json(
      new CommonResponse(1, (e as any as Error).message, e)
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const dto = plainToInstance(ArticleModelDto, body);
    const response = await updateArticle(dto);
    return NextResponse.json(new CommonResponse(0, "Success", response));
  } catch (e) {
    console.error("Article update failed: ", e);
    return NextResponse.json(
      new CommonResponse(1, (e as any as Error).message, e)
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.formData();
    const titleImg = body.get("titleImgFile") as File;
    if (!titleImg) throw new Error("Image file is required.");
    const articleId = body.get("articleId") as string;
    const result = await uploadFileToS3(titleImg, randomUUID() + titleImg.name);
    const dto = {
      id: articleId,
      titleImage: result.Location,
    } as ArticleModelDto;
    console.log(dto);
    const updatedArticle = await updateArticle(dto);
    return NextResponse.json(new CommonResponse(0, "Success", updatedArticle));
  } catch (e) {
    console.error("Article start failed: ", e);
    return NextResponse.json(
      new CommonResponse(1, (e as any as Error).message, e)
    );
  }
}

export const revalidate = 0;
