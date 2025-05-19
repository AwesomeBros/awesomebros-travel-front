import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = !!req.auth;
  const role = req.auth?.user.role || "guest";

  const protectedPaths = [/\/user\/(.*)/];
  const adminPaths = [/\/admin\/(.*)/];

  if (!session && protectedPaths.some((p) => p.test(pathname))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (role !== "ADMIN" && adminPaths.some((p) => p.test(pathname))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});
