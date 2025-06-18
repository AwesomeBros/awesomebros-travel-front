"use client";

import { Loader } from "@/components/shared/loader";
import { useFindCommentsByPostId } from "@/hooks/query/use-comment";
import { CommentType } from "@/type";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";

interface Props {
  postId?: number;
}

export default function CommentList({ postId }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useFindCommentsByPostId(postId);
  const observerRef = useRef<HTMLDivElement>(null);

  console.log("CommentList data", data);

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
  return (
    <>
      <div className="mt-8 grid md:grid-cols-2 gap-12 min-h-10">
        {isLoading ? (
          <div className="flex items-center justify-center md:col-span-2 h-10">
            <Loader />
          </div>
        ) : data?.pages[0].totalCount > 0 ? (
          data?.pages.map((page) => (
            <Fragment key={page.page}>
              {page.data.map((comment: CommentType) => (
                <div key={comment.id} className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <div className="relative overflow-hidden size-[48px] rounded-full shadow">
                      <Image
                        src={
                          comment.user.image
                            ? comment.user.image
                            : "/images/noProfileImage.jpg"
                        }
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
                  <div className="max-w-md text-gray-600">
                    {comment?.content}
                  </div>
                </div>
              ))}
            </Fragment>
          ))
        ) : (
          <p className="text-center md:col-span-2 text-muted-foreground">
            작성된 댓글이 없습니다.
          </p>
        )}
      </div>
      <div
        ref={observerRef}
        className="mt-10 h-10 flex items-center justify-center"
      >
        {isFetchingNextPage && <Loader />}
      </div>
    </>
  );
}
