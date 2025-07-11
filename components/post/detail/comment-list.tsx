"use client";

import { Loader } from "@/components/shared/loader";
import { useFindCommentsByPostId } from "@/hooks/query/use-comment";
import { CommentType } from "@/type";
import { Fragment, useEffect, useRef } from "react";
import CommentItem from "./comment-item";

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
              {page.data.map((comment: CommentType, index: number) => (
                <CommentItem key={comment.id} comment={comment} index={index} />
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
