"use client";

import { useIsLiked, useToggleLike } from "@/hooks/query/use-likes";
import { cn } from "@/lib/utils";
import { PostType } from "@/type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "../ui/icon";

export default function LikeButton({ post }: { post: PostType }) {
  const { data: session, status } = useSession({ required: true });
  const toggleLike = useToggleLike();
  const { data: isLiked } = useIsLiked(post.id);
  console.log("session", session);
  const router = useRouter();
  function toggleLikeHandler() {
    if (!session) {
      toast.error("로그인이 필요한 서비스입니다.");
      router.push("/login");
    } else {
      toggleLike.mutate(post.id);
    }
  }

  return (
    <button
      className="absolute top-2 right-2 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={toggleLikeHandler}
    >
      <Icon.like
        className={cn({
          "size-6 stroke-2 stroke-white fill-[#00000080] like-drop-shadow":
            true,
          "fill-[#ff385c]": isLiked,
        })}
      />
    </button>
  );
}
