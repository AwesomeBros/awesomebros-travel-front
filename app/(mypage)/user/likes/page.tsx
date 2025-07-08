"use client";

import PostSearchFilter from "@/components/post/form/post-search-filter";
import { Loader } from "@/components/shared/loader";
import { useFindLikesByUserId, useToggleLike } from "@/hooks/query/use-like";
import { useSearchStore } from "@/hooks/store";
import { useConfirm } from "@/hooks/use-confirm";
import { PostType } from "@/type";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";

export default function MyPostsPage() {
  const { data: session } = useSession();
  const { q } = useSearchStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const observerRef = useRef<HTMLDivElement>(null);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useFindLikesByUserId({ title: q, userId: session?.user.id });

  const toggleLike = useToggleLike();

  function toggleLikeHandler(postId: number) {
    toggleLike.mutate(postId);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) {
    throw new Error("내 좋아요 목록을 불러오는 중 오류가 발생했습니다.");
  }

  return (
    <div className="w-full mx-auto max-w-7xl px-4 md:px-0">
      <ConfirmDialog />
      <div className="mt-10 mb-40 w-full bg-white p-6 rounded-lg shadow-md px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">
          나의 좋아요 관리
        </h1>
        <PostSearchFilter />
        <table className="w-full text-sm text-left text-muted-foreground">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 min-w-[250px] md:min-w-[300px]"
              >
                제목
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-3 min-w-[100px]"
              >
                지역
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-3 min-w-[100px]"
              >
                등록일
              </th>
              <th scope="col" className="px-6 py-3 min-w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {posts?.pages.map((page, index) => (
              <Fragment key={index}>
                {page.data.map((post: PostType) => (
                  <tr className="bg-white border-b" key={post.id}>
                    <td className="px-6 py-4">
                      <Link
                        href={`/posts/${post.id}/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      {post.district.name}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      {format(new Date(post.createdAt!), "yyyy-MM-dd HH:mm")}
                    </td>

                    <td className="px-6 py-4 min-w-[80px]">
                      <button
                        className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full"
                        onClick={() => toggleLikeHandler(post.id)}
                      >
                        제거
                      </button>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
            {posts?.pages.every((page) => page.data.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  좋아요한 게시글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {(isFetching || hasNextPage || isFetchingNextPage) && (
          <div className="flex justify-center items-center mt-4">
            <Loader />
          </div>
        )}
        <div className="w-full touch-none h-10" ref={observerRef} />
      </div>
    </div>
  );
}
