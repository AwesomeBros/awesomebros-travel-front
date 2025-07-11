"use client";

import {
  useFindCommentById,
  useUpdateComment,
} from "@/hooks/query/use-comment";
import { useCommentEditOpenStore } from "@/hooks/store";
import CommentForm from "../post/detail/comment-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function CommentEditDialog() {
  const { isOpen, onClose, id } = useCommentEditOpenStore();
  const { data: comment, isLoading } = useFindCommentById(id);
  const updateComment = useUpdateComment(id);

  const onSubmit = (values: { content: string }) => {
    updateComment.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  if (isLoading || !comment) return null;
  const defaultValues = {
    content: comment.content,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            댓글 수정하기
          </DialogTitle>
        </DialogHeader>
        <CommentForm
          id={id}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  );
}
