import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { serverApi } from "@/lib/api/serverApi";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const cookieStore = await cookies();
  try {
    const apiRes = await serverApi.get(
      `/psychologists/${encodeURIComponent(id)}`,
      {
        headers: { Cookie: cookieStore.toString() },
        timeout: 5000,
      }
    );

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
    console.error("Psychologist fetch failed:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
