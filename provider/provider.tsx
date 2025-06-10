import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import OpenProvider from "./open-porvider";
import QueryProvider from "./query-provider";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
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
