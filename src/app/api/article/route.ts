import CommonResponse from "@/dto/common/CommonResponse";
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

export const revalidate = 0;
