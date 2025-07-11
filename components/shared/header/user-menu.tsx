"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NO_IMG } from "@/constants";
import { usePostOpenStore } from "@/hooks/store";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";

const publicRoute = [
  {
    label: "로그인",
    href: "/login",
  },
  {
    label: "회원가입",
    href: "/signup",
  },
];

const privateRoute = [
  {
    label: "마이페이지",
    href: "/user/mypage",
  },
  {
    label: "로그아웃",
    href: "#",
    signOut: true,
  },
];
export default function UserMenu({ session }: { session: Session | null }) {
  const { data } = useSession();
  const { onOpen } = usePostOpenStore();
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {session && session.user ? (
          <button
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => onOpen()}
          >
            글작성 하기
          </button>
        ) : (
          <button
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={() => router.push("/login")}
          >
            로그인 후 글작성 하기
          </button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu className="cursor-pointer sm:ml-2" />

              {session?.user ? (
                <div className="relative overflow-hidden size-[32px] rounded-full">
                  <Image
                    src={session.user.url ? data?.user.url ?? NO_IMG : NO_IMG}
                    alt={`Profile`}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="p-0 sm:p-1.5">
                  <LuUserRound className="size-5" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {session?.user ? (
              <div className="flex flex-col">
                {privateRoute.map((item) => (
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(item.href);
                      item.signOut && signOut();
                    }}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {publicRoute.map((item) => (
                  <DropdownMenuItem
                    onClick={() => router.push(item.href)}
                    key={item.label}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
