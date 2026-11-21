import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/api/serverApi";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken && sessionId) {
    try {
      const apiRes = await serverApi.post("/auth/refresh", null, {
        headers: { Cookie: cookieStore.toString() },
      });

      const response = NextResponse.json({ success: true });

      const setCookie = apiRes.headers["set-cookie"];
      if (setCookie) {
        for (const cookie of setCookie) {
          response.headers.append("set-cookie", cookie);
        }
      }
      return response;
    } catch {
      return NextResponse.json({ success: false });
    }
  }

  return NextResponse.json({ success: false });
}
