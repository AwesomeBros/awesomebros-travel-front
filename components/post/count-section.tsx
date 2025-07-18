"use client";

import { useFindCountsByPostId } from "@/hooks/query/use-counts";
import { PostType } from "@/type/post.type";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";

export default function CountSection({ post }: { post: PostType }) {
  const { data: count, isLoading } = useFindCountsByPostId(post.id);
  if (isLoading) return null;
  if (!count) {
    return (
      <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
        <p className="flex items-center gap-1">
          <FaRegCommentDots /> {post.count.commentCount}
        </p>
        <p className="flex items-center gap-1">
          <FaRegHeart /> {post.count.likeCount}
        </p>
        <p className="flex items-center gap-1">
          <PiEyesFill className="text-lg" /> {post.count.viewCount}
        </p>
      </div>
    );
  }

  return (
    <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
      <p className="flex items-center gap-1">
        <FaRegCommentDots /> {count.commentCount}
      </p>
      <p className="flex items-center gap-1">
        <FaRegHeart /> {count.likeCount}
      </p>
      <p className="flex items-center gap-1">
        <PiEyesFill className="text-lg" /> {count.viewCount}
      </p>
    </div>
  );
}
