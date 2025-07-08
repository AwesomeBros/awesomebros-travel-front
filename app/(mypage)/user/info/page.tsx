import { getMe } from "@/actions/users.actions";
import { Button } from "@/components/ui/button";
import { NO_IMG } from "@/constants";
import { UserType } from "@/type/user.type";
import Image from "next/image";
import Link from "next/link";

export default async function UserInfoPage() {
  const user: UserType = await getMe();

  return (
    <main className="max-w-5xl md:h-[calc(100vh-177px)] mx-auto px-4 flex items-center">
      <div className="my-auto w-full bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between gap-4">
          <h1 className="text-3xl font-semibold">유저 정보</h1>
        </div>
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 mb-28">
          <div className="flex justify-center items-center">
            <div className="relative overflow-hidden size-[150px] rounded-full shadow">
              <Image
                src={user.url ? user.url : NO_IMG}
                alt={`Profile`}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-gray-200 border-b py-4">
            <h1 className="font-semibold">이름</h1>
            <div className="text-gray-500 text-sm">{user.nickname}</div>
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
        <div className="flex justify-center">
          <Link href={"/user/edit"}>
            <Button>수정하기</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
