"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";

export default function UserMenu({ session }: { session: Session | null }) {
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
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          글작성 하기
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu className="cursor-pointer sm:ml-2" />

              {session?.user ? (
                <Avatar>
                  <AvatarImage
                    src={
                      session.user.url
                        ? session.user.url
                        : "/images/noProfileImage.jpg"
                    }
                    alt="profile"
                  />
                </Avatar>
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
