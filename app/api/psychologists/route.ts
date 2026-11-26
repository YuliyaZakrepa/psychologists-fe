import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { serverApi } from "@/lib/api/serverApi";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page");
  const filter = searchParams.get("filter");

  try {
    const apiRes = await serverApi.get("/psychologists", {
      params: {
        ...(page && { page }),
        ...(filter && { filter }),
      },
      headers: { Cookie: cookieStore.toString() },
      timeout: 5000,
    });

    return NextResponse.json(apiRes.data, {
      status: apiRes.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    console.error("Psychologists fetch failed:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
