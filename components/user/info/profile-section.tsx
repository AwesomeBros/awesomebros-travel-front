"use client";

import { Loader } from "@/components/shared/loader";
import { NO_IMG } from "@/constants";
import { useGetMe } from "@/hooks/query/use-users";
import Image from "next/image";

export default function ProfileSection({ userId }: { userId?: string }) {
  const { data: user, isLoading } = useGetMe(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[637px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto mt-10 mb-28">
      <div className="flex justify-center items-center">
        <div className="relative overflow-hidden size-[150px] rounded-full shadow">
          <Image
            src={user.image ? user.image : NO_IMG}
            alt={`Profile`}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
        <h1 className="font-semibold">이름</h1>
        <div className="text-gray-500 text-sm">{user.name}</div>
      </div>
      <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
        <h1 className="font-semibold">이메일</h1>
        <div className="text-gray-500 text-sm">{user.email}</div>
      </div>
      <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
        <h1 className="font-semibold">계정 유형</h1>
        <div className="text-gray-500 text-sm">{user.provider ?? "-"}</div>
      </div>
    </div>
  );
}
