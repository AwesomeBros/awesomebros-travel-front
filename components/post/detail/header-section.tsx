"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NO_IMG } from "@/constants";
import { PostType } from "@/type/post.type";
import { format } from "date-fns";
import Image from "next/image";

export default function HeaderSection({ post }: { post: PostType }) {
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
              {format(post.created_at, "yyyy-MM-dd HH:mm")}
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
      <Separator />
    </div>
  );
}
