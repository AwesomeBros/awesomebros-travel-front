"use client";

import { useToggleLike } from "@/hooks/query/use-like";
import { cn } from "@/lib/utils";
import { PostType } from "@/type/post.type";
import { Icon } from "../ui/icon";

export default function LikeButton({
  post,
  userId,
}: {
  post: PostType;
  userId?: string;
}) {
  const toggleLike = useToggleLike();
  function toggleLikeHandler() {
    toggleLike.mutate(post.id);
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
          "fill-[#ff385c]": post?.like?.some(
            (like: { userId: string }) => like.userId === userId
          ),
        })}
      />
    </button>
  );
}
