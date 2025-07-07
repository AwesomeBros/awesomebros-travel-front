import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const setCookieHeaders = request.headers.get("set-cookie");

  if (!setCookieHeaders) {
<<<<<<< HEAD
    // console.log("Set-Cookie 헤더가 없습니다.");
    return;
  }

=======
    console.log("Set-Cookie 헤더가 없습니다.");
    return;
  }

  // Set-Cookie 헤더에서 visitor_id 쿠키를 찾아서 브라우저에 설정해줘.
>>>>>>> a64d6dcd6b52e22ea92dc8b6e8ff486a615095c9
  const visitorIdCookieHeader = Array.isArray(setCookieHeaders)
    ? setCookieHeaders.find((header) => header.startsWith("visitor_id="))
    : undefined;

  if (visitorIdCookieHeader) {
<<<<<<< HEAD
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
=======
    // Set-Cookie 헤더 문자열에서 값과 옵션을 파싱해야 할 수도 있어.
    // 또는 NestJS에서 visitorId 값만 응답 본문에 담아 보내고,
    // 서버 액션에서 그 값을 받아서 cookies().set()으로 설정하는 게 더 간단할 수도 있어!
    // 여기서는 헤더 문자열을 직접 파싱하는 예시 (간단화)
    const [nameValue, ...options] = visitorIdCookieHeader.split(";");
    const [cookieName, cookieValue] = nameValue.split("=");
    console.log("쿠키 이름:", cookieName);
    console.log("쿠키 값:", cookieValue);

    if (cookieName === "visitor_id") {
      // Next.js cookies().set() 함수로 브라우저에 쿠키 설정
      // 옵션은 NestJS에서 보낸 옵션을 참고하거나, Next.js에서 다시 설정해줘.
      // maxAge, httpOnly, secure, path, sameSite 옵션 등을 다시 설정해야 해!
      (
        await // Next.js cookies().set() 함수로 브라우저에 쿠키 설정
        // 옵션은 NestJS에서 보낸 옵션을 참고하거나, Next.js에서 다시 설정해줘.
        // maxAge, httpOnly, secure, path, sameSite 옵션 등을 다시 설정해야 해!
        cookies()
      ).set(cookieName, cookieValue, {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 예시: 1년
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Next.js 환경에 맞게 설정
        path: "/",
        sameSite: "lax", // 또는 'none'
        // ... 다른 옵션들
      });
      console.log("서버 액션: 브라우저에 visitor_id 쿠키 설정 완료");
>>>>>>> a64d6dcd6b52e22ea92dc8b6e8ff486a615095c9
    }
  }
  return NextResponse.json({
    message: "쿠키 설정 완료",
  });
};
