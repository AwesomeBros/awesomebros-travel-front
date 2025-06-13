"use client";

import PostCard from "@/components/post/post-card";
import PostItem from "@/components/post/post-item";
import { Loader } from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { useFindPostsAll } from "@/hooks/query/use-posts";
import { PostType } from "@/type/post.type";
import { useEffect, useState } from "react";

export default function HomePostsList() {
  const [type, setType] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const boardType = localStorage.getItem("boardType");
      return boardType ? Number(boardType) : 1;
    }
    return 1;
  });

  useEffect(() => {
    localStorage.setItem("boardType", String(type));
  }, [type]);
  const { data: popularPostsAll, isLoading: popularIsLoading } =
    useFindPostsAll("popular");
  const { data: latestPostsAll, isLoading: latestIsLoading } =
    useFindPostsAll("latest");
  if (popularIsLoading || latestIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <main className="container mx-auto px-2 md:px-0">
      <div className="py-10 flex flex-col justify-center gap-10">
        <div className="w-full max-w-[1200px] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-black text-2xl font-medium leading-[140%]">
                {"인기 후기 목록"}
              </div>
            </div>
            <div>
              <Button variant={"outline"} onClick={() => setType(1)}>
                1
              </Button>
              <Button variant={"outline"} onClick={() => setType(2)}>
                2
              </Button>
            </div>
          </div>
          {type === 1 && (
            <div className="w-full grid gap-6">
              {popularPostsAll.slice(0, 4).map((post: PostType) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          )}
          {type === 2 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
              {popularPostsAll.slice(0, 4).map((post: PostType) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        <div className="w-full max-w-[1200px] flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-black text-2xl font-medium leading-[140%]">
                {"최신 후기 목록"}
              </div>
            </div>
            <div>
              <Button variant={"outline"} onClick={() => setType(1)}>
                1
              </Button>
              <Button variant={"outline"} onClick={() => setType(2)}>
                2
              </Button>
            </div>
          </div>
          {type === 1 && (
            <div className="w-full grid gap-6">
              {latestPostsAll.slice(0, 4).map((post: PostType) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          )}
          {type === 2 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
              {latestPostsAll.slice(0, 4).map((post: PostType) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
