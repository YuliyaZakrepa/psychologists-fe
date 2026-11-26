import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/favorites"];

const isPrivateRoute = (pathname: string) =>
  privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isPrivateRoute(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const sessionId = request.cookies.get("sessionId")?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  if (refreshToken && sessionId) {
    try {
      const sessionRes = await fetch(
        new URL("/api/auth/session", request.url),
        {
          headers: { cookie: request.headers.get("cookie") ?? "" },
          cache: "no-store",
        }
      );
      const data = await sessionRes.json();

      if (data.success) {
        const response = NextResponse.next();

        for (const cookie of sessionRes.headers.getSetCookie()) {
          response.headers.append("set-cookie", cookie);
        }
        return response;
      }
    } catch {}
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/favorites/:path*"],
};
