"use client";

import { useCreatePost } from "@/hooks/query/use-posts";
import { usePostOpenStore } from "@/hooks/store";
import { PostFormType } from "@/type/post.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import PostForm from "../post-form";

export default function PostWriteDialog() {
  const { isOpen, onClose } = usePostOpenStore();
  const createPost = useCreatePost();
  function onSubmit(data: PostFormType) {
    createPost.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            글 작성하기
          </DialogTitle>
        </DialogHeader>
        <section className="w-full mx-auto px-4 min-h-[60vh] overflow-auto">
          <PostForm onSubmit={onSubmit} />
        </section>
      </DialogContent>
    </Dialog>
  );
}
