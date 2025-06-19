"use client";

import { Loader } from "@/components/shared/loader";
import { useFindPostsAll } from "@/hooks/query/use-post";
import { usePostTypeStore } from "@/hooks/store";
import { useHydratedStore } from "@/hooks/store/use-hydrate-store";
import { PostType } from "@/type";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import PostCard from "./post-card";
import PostItem from "./post-item";

interface Props {
  params: {
    country?: string;
    city?: string;
    district?: string;
    page?: string;
  };
}

export default function PostsList({ params }: Props) {
  const isHydrated = useHydratedStore(
    usePostTypeStore,
    (state) => state !== undefined
  );
  const { postType, setPostType } = usePostTypeStore();
  const { data } = useFindPostsAll(params);
  const postsAll = data.posts || [];
  const page = data.page || 1;
  const take = data.take || 12;
  const totalCount = data.totalCount || 0;
  if (!isHydrated) {
    return (
      <div className="w-full h-[calc(100vh-97px-80px)] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-5 p-4 rounded-xl shadow-md bg-white">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-medium">{"후기 목록"}</div>
          <div>
            <p className="text-muted-foreground text-sm">
              {"여행 후기를 작성하고 공유해보세요!"}
            </p>
          </div>
        </div>
        <Tabs value={postType}>
          <TabsList className="w-full">
            <TabsTrigger value="list" onClick={() => setPostType("list")}>
              <FaThList />
            </TabsTrigger>
            <TabsTrigger value="gallery" onClick={() => setPostType("gallery")}>
              <IoGrid />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {postType === "list" && (
        <div className="w-full grid gap-6">
          {postsAll.length > 0 ? (
            postsAll.map((post: PostType, index: number) => (
              <PostItem key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="w-full h-30 flex justify-center items-center">
              <p className="text-muted-foreground">
                {"작성된 후기가 없습니다."}
              </p>
            </div>
          )}
        </div>
      )}
      {postType === "gallery" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {postsAll.length > 0 ? (
            postsAll.map((post: PostType, index: number) => (
              <PostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-1 md:col-span-4 h-30 flex justify-center items-center">
              <p className="text-muted-foreground">
                {"작성된 후기가 없습니다."}
              </p>
            </div>
          )}
        </div>
      )}
      {postsAll.length > 0 && (
        <PaginationWithLinks page={page} take={take} totalCount={totalCount} />
      )}
    </div>
  );
}
