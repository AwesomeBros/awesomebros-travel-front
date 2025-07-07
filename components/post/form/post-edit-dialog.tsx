"use client";

import { useFindPostById, useUpdatePost } from "@/hooks/query/use-posts";
import { usePostEditOpenStore } from "@/hooks/store";
import { PostFormType } from "@/type/post.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import PostForm from "../post-form";

export default function PostEditDialog() {
  const { isOpen, onClose, id } = usePostEditOpenStore();
  const updatePost = useUpdatePost(id);
  const { data: post, isLoading } = useFindPostById(id);
  if (isLoading || !post) return null;
  // console.log("Post data:", post);

  const defaultValues: PostFormType = {
    url: post.url || "",
    title: post.title || "",
    locations: post.locations || [],
    content: post.content || "",
    cities_id: post.cities_id || "",
    countries_id: post.countries_id || "",
    districts_id: post.districts_id || "",
    slug: post.slug || "",
  };
  function onSubmit(data: PostFormType) {
    console.log("Submitting post data:", data);
    updatePost.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            글 수정하기
          </DialogTitle>
        </DialogHeader>
        <section className="w-full mx-auto px-4 min-h-[80vh] overflow-auto">
          <PostForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            isUpdateMode={true}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
}
