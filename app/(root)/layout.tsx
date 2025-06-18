import { auth } from "@/auth";
import Header from "@/components/shared/header/header";
import "@/style/globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      <main className="w-full max-w-[1200px] mx-auto px-2 py-10 md:px-0">
        {children}
      </main>
    </>
  );
}
