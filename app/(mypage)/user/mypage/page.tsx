import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { TbHeart, TbPencilCheck, TbPencilPlus } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";

export default async function MyPage() {
  const session = await auth();

  return (
    <main className="max-w-5xl md:h-[calc(100vh-177px)] mx-auto px-4 flex items-center">
      <div className="my-auto w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold mb-10">마이페이지</h1>
        <div className="flex gap-2 mt-2 text-lg">
          <div className="relative overflow-hidden size-[32px] rounded-full">
            <Image
              src={
                session?.user.image
                  ? session.user.image
                  : "/images/noProfileImage.jpg"
              }
              alt={`Profile`}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="font-semibold">{session?.user.name}</div>
          <div className="font-semibold">·</div>
          <div className="text-gray-700">{session?.user.email}</div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-12 mb-20">
          <Link
            href={"/user/info"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <AiOutlineUser className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">유저 정보</h1>
              <h2 className="text-sm text-gray-500">
                유저 정보 및 프로필 이미지
              </h2>
            </div>
          </Link>
          <Link
            href={"#"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl cursor-pointer"
          >
            <TbPencilPlus className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">게시글 작성</h1>
              <h2 className="text-sm text-gray-500">게시글 작성하기</h2>
            </div>
          </Link>
          <Link
            href={"/user/posts"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <TbPencilCheck className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">게시글 관리</h1>
              <h2 className="text-sm text-gray-500">게시글 관리하기</h2>
            </div>
          </Link>
          <Link
            href={"/user/like"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <TbHeart className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">좋아요</h1>
              <h2 className="text-sm text-gray-500">좋아요 목록 모아보기</h2>
            </div>
          </Link>
          <Link
            href={"/user/comments"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <AiOutlineComment className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">나의 댓글</h1>
              <h2 className="text-sm text-gray-500">나의 댓글 모아보기</h2>
            </div>
          </Link>
          <Link
            href={"#"}
            className="shadow-lg rounded-lg flex flex-col justify-between p-4 gap-12 hover:shadow-xl"
          >
            <VscKey className="text-xl md:text-3xl" />
            <div>
              <h1 className="font-semibold">로그아웃</h1>
              <h2 className="text-sm text-gray-500">로그아웃</h2>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
