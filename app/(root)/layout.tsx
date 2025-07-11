import { auth } from "@/auth";
import Header from "@/components/shared/header/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <main className="flex flex-col min-h-screen gap-10">
      <Header session={session} />
      <div className="w-full max-w-[1200px] mx-auto px-2 md:px-0">
        {children}
      </div>
    </main>
  );
}
