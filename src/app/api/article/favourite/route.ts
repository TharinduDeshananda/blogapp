import CommonResponse from "@/dto/common/CommonResponse";
import { addFavouriteArticle } from "@/services/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const articleId = formData.get("articleId") as string;
    await addFavouriteArticle(articleId);
    return NextResponse.json(new CommonResponse(0, "Success", null));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      new CommonResponse(1, (error as Error).message, null)
    );
  }
}
