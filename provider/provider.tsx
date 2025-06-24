import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import OpenProvider from "./open-porvider";
import QueryProvider from "./query-provider";

export default async function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div>
      <QueryProvider>
        <SessionProvider session={session}>
          {children}
          <OpenProvider />
          <Toaster />
        </SessionProvider>
      </QueryProvider>
    </div>
  );
}
