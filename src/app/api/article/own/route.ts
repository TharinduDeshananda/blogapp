import CommonResponse from "@/dto/common/CommonResponse";
import { ArticleFilterType, getOwnArticles } from "@/services/ArticleService";
import { plainToInstance } from "class-transformer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const plainObj: any = {};
    if (params) {
      for (const [key, value] of params) {
        plainObj[key] = value;
      }
    }
    const filterDto = plainToInstance(ArticleFilterType, plainObj);

    const ownArticles = await getOwnArticles(filterDto);
    return NextResponse.json(new CommonResponse(0, "Success", ownArticles));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      new CommonResponse(1, "Filterring failed", (error as Error).message)
    );
  }
}

export const revalidate = 0;
