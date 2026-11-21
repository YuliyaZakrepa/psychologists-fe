import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { serverApi } from "@/lib/api/serverApi";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const apiRes = await serverApi.get("/users/current", {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
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
