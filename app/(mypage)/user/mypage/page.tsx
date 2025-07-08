import { auth } from "@/auth";
import MypageItem from "@/components/mypage/mypage-item";
import { NO_IMG } from "@/constants";
import Image from "next/image";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { TbHeart, TbPencilCheck, TbPencilPlus } from "react-icons/tb";
import { VscKey } from "react-icons/vsc";

const MYPAGE_ITEMS = [
  {
    href: "/user/info",
    icon: <AiOutlineUser className="text-xl md:text-3xl" />,
    title: "유저 정보",
    description: "유저 정보 및 프로필 이미지",
  },
  {
    href: "#",
    icon: <TbPencilPlus className="text-xl md:text-3xl" />,
    title: "게시글 작성",
    description: "게시글 작성하기",
  },
  {
    href: "/user/posts",
    icon: <TbPencilCheck className="text-xl md:text-3xl" />,
    title: "게시글 관리",
    description: "게시글 관리하기",
  },
  {
    href: "/user/like",
    icon: <TbHeart className="text-xl md:text-3xl" />,
    title: "좋아요",
    description: "좋아요 목록 모아보기",
  },
  {
    href: "/user/comments",
    icon: <AiOutlineComment className="text-xl md:text-3xl" />,
    title: "나의 댓글",
    description: "나의 댓글 모아보기",
  },
  {
    href: "#",
    icon: <VscKey className="text-xl md:text-3xl" />,
    title: "로그아웃",
    description: "로그아웃",
  },
];

export default async function MyPage() {
  const session = await auth();

  return (
    <main className="max-w-5xl md:h-[calc(100vh-177px)] mx-auto px-4 flex items-center">
      <div className="my-auto w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold mb-10">마이페이지</h1>
        <div className="flex gap-2 mt-2 text-lg">
          <div className="relative overflow-hidden size-[32px] rounded-full">
            <Image
              src={session?.user.image ? session.user.image : NO_IMG}
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
          {MYPAGE_ITEMS.map((item) => (
            <MypageItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
