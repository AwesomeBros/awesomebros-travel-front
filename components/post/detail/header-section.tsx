"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NO_IMG } from "@/constants";
import { useIncrementViewCount } from "@/hooks/query/use-posts";
import { useShareOpenStore } from "@/hooks/store";
import { PostType } from "@/type";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import CountSection from "../count-section";

export default function HeaderSection({ post }: { post: PostType }) {
  const incrementView = useIncrementViewCount(post.id);
  const { onOpen } = useShareOpenStore();

  useEffect(() => {
    if (post.id) {
      incrementView.mutate();
    }
  }, [post.id, incrementView.mutate]);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-3xl font-medium">{post.title}</div>
      <div className="relative flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative size-12 overflow-hidden rounded-full shadow-md">
            <Image
              src={post.users?.url || NO_IMG}
              fill
              alt="user"
              className="object-cover object-center"
            />
          </div>
          <div>
            <p className="text-md font-medium leading-[140%] cursor-pointer">
              {post.users?.nickname}
            </p>
            <div className="text-xs text-muted-foreground">
              {format(post.createdAt, "yyyy-MM-dd HH:mm")}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {post.locations?.map((loc) => (
            <Badge key={loc.name} className="p-2 shadow-md">
              {loc.name}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Separator className="mb-2" />
        <div className="flex justify-between">
          <CountSection post={post} />
          <div
            className="flex items-center gap-1 text-md py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            onClick={onOpen}
          >
            <IoShareSocialOutline className="size-5" /> 공유하기
          </div>
        </div>
      </div>
    </div>
  );
}
