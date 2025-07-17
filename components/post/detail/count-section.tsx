"use client";

import {
  useFindPostById,
  useIncrementViewCount,
} from "@/hooks/query/use-posts";
import { useShareOpenStore } from "@/hooks/store";
import { PostType } from "@/type";
import { useEffect } from "react";
import { FaRegCommentDots, FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiEyesFill } from "react-icons/pi";

export default function CountSection({ post }: { post: PostType }) {
  const incrementView = useIncrementViewCount(post.id);
  const { onOpen } = useShareOpenStore();

  useEffect(() => {
    if (post.id) {
      incrementView.mutate();
    }
  }, [post.id, incrementView.mutate]);
  const { data, isLoading } = useFindPostById(post.id);
  return (
    <div className="flex justify-between">
      <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
        <p className="flex items-center gap-1">
          <FaRegCommentDots /> {0}
        </p>
        <p className="flex items-center gap-1">
          <FaRegHeart /> {0}
        </p>
        <p className="flex items-center gap-1">
          <PiEyesFill className="text-lg" />{" "}
          {isLoading ? post.viewCount : data.viewCount}
        </p>
      </div>
      <div
        className="flex items-center gap-1 text-md py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        onClick={onOpen}
      >
        <IoShareSocialOutline className="size-5" /> 공유하기
      </div>
    </div>
  );
}
