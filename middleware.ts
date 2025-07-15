import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "./auth";

const POST_DETAIL_PATH_REGEX = /^\/posts\/[0-9]+(\/.*)?$/;

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  const session = !!req.auth;
  const role = req.auth?.user.role || "guest";
  console.log(session, role, pathname);

  const protectedPaths = [/^\/user(\/.*)?$/];
  const adminPaths = [/^\/admin(\/.*)?$/];

  if (!session && protectedPaths.some((p) => p.test(pathname))) {
    return NextResponse.redirect(new URL("/users/login", req.url));
  }

  if (role !== "ADMIN" && adminPaths.some((p) => p.test(pathname))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (POST_DETAIL_PATH_REGEX.test(pathname)) {
    const visitorIdCookie = (await cookies()).get("visitor_id");

    if (!visitorIdCookie) {
      const newVisitorId = uuidv4();
      const response = NextResponse.next();

      response.cookies.set("visitor_id", newVisitorId, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return response;
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"],
};
