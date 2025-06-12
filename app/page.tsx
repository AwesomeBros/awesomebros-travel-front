"use client";
import Top4Item from "@/components/home/top-4-item";
import PostCard from "@/components/post/post-card";
import PostItem from "@/components/post/post-item";
import { Button } from "@/components/ui/button";
import { useFindPostsAll } from "@/hooks/query/user-post";
import { PostType } from "@/type/post.type";
import { useEffect, useState } from "react";

export default function HomePage() {
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
  const findPostsAll = useFindPostsAll();
  const { data: postsAll, isLoading } = findPostsAll;
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <main className="container mx-auto px-2 md:px-0">
      <div className="py-10 flex justify-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-5">
          <div className="w-full flex flex-col items-center gap-6">
            <div className="flex justify-between items-center w-full">
              <div className="text-black text-2xl font-medium leading-[140%]">
                {"TOP 4 후기"}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-1 w-full">
              <Top4Item />
              <Top4Item />
              <Top4Item />
              <Top4Item />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-black text-2xl font-medium leading-[140%]">
                {"후기 목록"}
              </div>
              <div>
                <p className="text-gray-500 text-sm leading-[140%]">
                  {"여행 후기를 작성하고 공유해보세요!"}
                </p>
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
              {postsAll.map((post: PostType) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          )}
          {type === 2 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
              {postsAll.map((post: PostType) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
