"use client";

import { useFilterStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

export default function Header({ session }: { session: Session | null }) {
  const { showFilter, setShowFilter } = useFilterStore();
  return (
    <>
      <header className="sticky top-0 w-full bg-white z-20 shadow-sm">
        <div
          className={cn("py-4 border-b-[1px]", {
            "border-none": showFilter,
            "h-44": showFilter,
          })}
        >
          <main className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="flex flex-row items-center justify-between h-16 gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu session={session} />
            </div>
          </main>
        </div>
      </header>
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/20 z-[15]"
          onClick={() => setShowFilter(false)}
        />
      )}
    </>
  );
}
