import CommonResponse from "@/dto/common/CommonResponse";
import { getOwnArticle } from "@/services/ArticleService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = params.id;
    const article = await getOwnArticle(articleId);
    return NextResponse.json(new CommonResponse(0, "Success", article));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      new CommonResponse(1, "Fetch article failed.", error)
    );
  }
}
export const revalidate = 0;
