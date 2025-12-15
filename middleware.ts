import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/inventory/:path*",
    "/analytics/:path*",
    "/users/:path*",
    "/login",
    "/signup",
  ],
};

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Public routes
  const publicRoutes = ["/login", "/signup"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // ❌ Not logged in & accessing protected route
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ❌ Logged in & accessing login/signup
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
