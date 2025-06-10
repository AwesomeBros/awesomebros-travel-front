import { auth } from "@/auth";
import Header from "@/components/shared/header/header";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import Provider from "@/provider/provider";
import "@/style/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME!,
  },
  description: APP_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <Provider session={session}>
          <Header session={session} />
          {children}
        </Provider>
      </body>
    </html>
  );
}
