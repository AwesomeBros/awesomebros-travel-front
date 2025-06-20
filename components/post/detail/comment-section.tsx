"use client";

import { useCreateComment } from "@/hooks/query/use-comment";
import { CommentFormType } from "@/type/comment.type";
import { PostType } from "@/type/post.type";
import { Session } from "next-auth";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";

interface Props {
  post: PostType;
  session: Session | null;
}

export default function CommentSection({ post, session }: Props) {
  const createComment = useCreateComment(post.id);
  const defaultValues: CommentFormType = {
    content: "",
  };
  const onSubmit = (values: CommentFormType) => {
    createComment.mutate(values);
  };

  return (
    <div className="flex flex-col p-4 rounded-xl shadow-md bg-white">
      <h1 className="font-semibold text-xl mb-2">댓글</h1>
      {session && session.user && (
        <CommentForm
          onSubmit={onSubmit}
          disabled={createComment.isPending}
          defaultValues={defaultValues}
        />
      )}
      <CommentList postId={post.id} />
    </div>
  );
}
