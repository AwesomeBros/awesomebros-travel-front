"use client";

import { useFindCountsByPostId } from "@/hooks/query/use-counts";
import { PostType } from "@/type/post.type";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";

export default function CountSection({ post }: { post: PostType }) {
  const { data: count, isLoading } = useFindCountsByPostId(post.id);

  if (!count || isLoading) {
    return (
      <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
        <p className="flex items-center gap-1">
          <FaRegCommentDots /> {0}
        </p>
        <p className="flex items-center gap-1">
          <FaRegHeart /> {0}
        </p>
        <p className="flex items-center gap-1">
          <PiEyesFill className="text-lg" /> {0}
        </p>
      </div>
    );
  }

  return (
    <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
      <p className="flex items-center gap-1">
        <FaRegCommentDots /> {count.comment_count}
      </p>
      <p className="flex items-center gap-1">
        <FaRegHeart /> {count.like_count}
      </p>
      <p className="flex items-center gap-1">
        <PiEyesFill className="text-lg" /> {count.view_count}
      </p>
    </div>
  );
}
