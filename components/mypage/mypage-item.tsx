"use client";

import { usePostOpenStore } from "@/hooks/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  item: {
    href: string;
    icon: ReactNode;
    title: string;
    description: string;
  };
}

export default function MypageItem({ item }: Props) {
  const { onOpen } = usePostOpenStore();
  const handleClick = (e: React.MouseEvent) => {
    if (item.title === "게시글 작성") {
      e.preventDefault();
      onOpen();
    } else if (item.title === "로그아웃") {
      e.preventDefault();
      signOut();
    }
  };
  return (
    <Link
      href={item.href}
      className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      onClick={handleClick}
    >
      {item.icon}
      <div>
        <h1 className="font-semibold">{item.title}</h1>
        <h2 className="text-sm text-gray-500">{item.description}</h2>
      </div>
    </Link>
  );
}
