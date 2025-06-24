import { auth } from "@/auth";
import Header from "@/components/shared/header/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
}
