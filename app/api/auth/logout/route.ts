import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/serverApi";

export async function POST() {
  const cookieStore = await cookies();

  try {
    await serverApi.post("/auth/logout", null, {
      headers: { Cookie: cookieStore.toString() },
    });
  } catch {}

  const response = new NextResponse(null, { status: 204 });
  response.cookies.delete("sessionId");
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  return response;
}
