"use client";

import { useFindPostsBySort } from "@/hooks/query/use-home";
import { PostType } from "@/type/post.type";
import { useState } from "react";
import PostCard from "../post/post-card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function PopularLatestPostsList() {
  const [sort, setSort] = useState<"latest" | "popular">("latest");
  const { data: postsAll, isLoading } = useFindPostsBySort(sort);

  return (
    <div className="flex flex-col gap-5 mb-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-black text-2xl font-medium">
          {sort === "latest" ? "최신 후기" : "인기 후기"}
        </div>
        <Tabs defaultValue="latest">
          <TabsList className="w-full">
            <TabsTrigger value="latest" onClick={() => setSort("latest")}>
              최신
            </TabsTrigger>
            <TabsTrigger value="popular" onClick={() => setSort("popular")}>
              인기
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
        {isLoading
          ? null
          : postsAll.map((post: PostType) => (
              <PostCard key={post.id} post={post} />
            ))}
      </div>
    </div>
  );
}
