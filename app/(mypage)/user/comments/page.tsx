"use client";

import PostSearchFilter from "@/components/post/form/post-search-filter";
import { Loader } from "@/components/shared/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NO_IMG } from "@/constants";
import {
  useDeleteComment,
  useFindCommentsByUserId,
} from "@/hooks/query/use-comment";
import { useCommentEditOpenStore, useSearchStore } from "@/hooks/store";
import { useConfirm } from "@/hooks/use-confirm";
import { CommentType } from "@/type";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import { BiChevronRight } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function MyCommentsPage() {
  const deleteComment = useDeleteComment();
  const { q } = useSearchStore();
  const { onOpen } = useCommentEditOpenStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다."
  );
  const observerRef = useRef<HTMLDivElement>(null);
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useFindCommentsByUserId({ content: q });

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
    throw new Error("내 댓글 목록을 불러오는 중 오류가 발생했습니다.");
  }
  console.log("comments", comments);

  const handleDelete = async (commentId: string) => {
    const ok = await confirm();
    if (ok) {
      deleteComment.mutate(commentId);
    }
  };
  return (
    <div className="w-full mx-auto max-w-7xl px-4 md:px-0">
      <ConfirmDialog />
      <div className="my-10 w-full bg-white p-6 rounded-lg shadow-md px-4">
        <h1 className="mb-10 text-lg md:text-2xl font-semibold">
          나의 댓글 관리
        </h1>
        <PostSearchFilter />
        <div className="mt-12 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {comments?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map((comment: CommentType) => (
                <div key={comment.id} className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="relative overflow-hidden size-[48px] rounded-full shadow">
                      <Image
                        src={comment.user.image ? comment.user.image : NO_IMG}
                        alt={`Profile`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold">
                        {comment?.user?.name || "-"}
                      </h1>
                      <div className="text-gray-500 text-xs">
                        {format(comment?.createdAt, "yyyy-MM-dd HH:mm")}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="max-w-lg text-gray-600">
                      {comment.content}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="hover:bg-neutral-100 transition cursor-pointer p-3 rounded-full">
                          <BsThreeDotsVertical />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onOpen(comment.id)}>
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(comment.id)}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <button
                    onClick={() =>
                      window.open(
                        `/posts/${comment.post.id}/${comment.post.slug}`,
                        "_blank"
                      )
                    }
                    type="button"
                    className="underline flex gap-1 items-center justify-start hover:text-gray-500 cursor-pointer font-semibold"
                  >
                    게시글 보기 <BiChevronRight className="text-xl" />
                  </button>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
        {(isFetching || isLoading) && <Loader />}
        <div className="w-full touch-none h-10" ref={observerRef} />
      </div>
    </div>
  );
}
