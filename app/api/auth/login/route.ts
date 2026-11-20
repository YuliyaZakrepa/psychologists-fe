import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { serverApi } from "@/lib/api/serverApi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await serverApi.post("/auth/login", body);
    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      for (const cookie of setCookie) {
        response.headers.append("set-cookie", cookie);
      }
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: error.message },
        { status: error.response?.status ?? 500 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
