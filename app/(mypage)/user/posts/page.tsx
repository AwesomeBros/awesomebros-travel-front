"use client";

import PostSearchFilter from "@/components/post/form/post-search-filter";
import { Loader } from "@/components/shared/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeletePost, useFindPostsByUserId } from "@/hooks/query/use-posts";
import { usePostEditOpenStore, useSearchStore } from "@/hooks/store";
import { useConfirm } from "@/hooks/use-confirm";
import { PostType } from "@/type/post.type";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function MyPostsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { q } = useSearchStore();
  const { onOpen } = usePostEditOpenStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const deletePost = useDeletePost();
  const observerRef = useRef<HTMLDivElement>(null);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useFindPostsByUserId({ title: q, userId: session?.user.id });

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
    throw new Error("내 게시글 목록을 불러오는 중 오류가 발생했습니다.");
  }

  const handleDelete = async (postId: number) => {
    const ok = await confirm();
    if (ok) {
      deletePost.mutate(postId);
    }
  };
  return (
    <div className="w-full mx-auto max-w-7xl px-4 md:px-0">
      <ConfirmDialog />
      <div className="mt-10 mb-40 w-full bg-white p-6 rounded-lg shadow-md px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">
          나의 게시글 관리
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
                      {post.districts.name}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      {format(new Date(post.created_at!), "yyyy-MM-dd HH:mm")}
                    </td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <td className="px-6 py-4 min-w-[80px]">
                          <button className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full">
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onOpen(post.id)}>
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(post.id)}>
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        {(isFetching || hasNextPage || isFetchingNextPage) && (
          <div className="flex justify-center items-center mt-4">
            <Loader />
          </div>
        )}
        <div className="w-full touch-none h-10 mb-10" ref={observerRef} />
      </div>
    </div>
  );
}
