import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const setCookieHeaders = request.headers.get("set-cookie");

  if (!setCookieHeaders) {
    // console.log("Set-Cookie 헤더가 없습니다.");
    return;
  }

  const visitorIdCookieHeader = Array.isArray(setCookieHeaders)
    ? setCookieHeaders.find((header) => header.startsWith("visitor_id="))
    : undefined;

  if (visitorIdCookieHeader) {
    const [nameValue, ...options] = visitorIdCookieHeader.split(";");
    const [cookieName, cookieValue] = nameValue.split("=");

    if (cookieName === "visitor_id") {
      (await cookies()).set(cookieName, cookieValue, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
      // console.log("서버 액션: 브라우저에 visitor_id 쿠키 설정 완료");
    }
  }
  return NextResponse.json({
    message: "쿠키 설정 완료",
  });
};
