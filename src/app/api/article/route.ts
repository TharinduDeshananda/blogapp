import CommonResponse from "@/dto/common/CommonResponse";
import ArticleModelDto from "@/dto/modeldto/ArticleModelDto";
import { startArticle, updateArticle } from "@/services/ArticleService";
import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  try {
    const data = [1, 2, 3, 4, 5];
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

export const revalidate = 0;
