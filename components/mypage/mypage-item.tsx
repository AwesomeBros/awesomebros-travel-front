"use client";

import { usePostWriteOpenStore } from "@/hooks/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { MouseEvent } from "react";

export default function MypageItem({
  item,
}: {
  item: {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  };
}) {
  const { onOpen } = usePostWriteOpenStore();
  return (
    <Link
      href={item.href}
      className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
      onClick={(e: MouseEvent) => {
        if (item.title === "게시글 작성") {
          e.preventDefault();
          onOpen();
        } else if (item.title === "로그아웃") {
          e.preventDefault();
          signOut();
        }
      }}
    >
      {item.icon}
      <div>
        <h1 className="font-semibold">{item.title}</h1>
        <h2 className="text-sm text-gray-500">{item.description}</h2>
      </div>
    </Link>
  );
}
