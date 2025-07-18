"use client";

import { useIsLiked, useToggleLike } from "@/hooks/query/use-likes";
import { cn } from "@/lib/utils";
import { PostType } from "@/type/post.type";
import { Icon } from "../ui/icon";

export default function LikeButton({ post }: { post: PostType }) {
  const toggleLike = useToggleLike();
  const { data: isLiked } = useIsLiked(post.id);
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
          "fill-[#ff385c]": isLiked,
        })}
      />
    </button>
  );
}
