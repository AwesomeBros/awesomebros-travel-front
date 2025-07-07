"use client";

import { useFindPostById, useUpdatePost } from "@/hooks/query/use-post";
import { usePostEditOpenStore } from "@/hooks/store";
import { PostFormType } from "@/type";
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
    image: post.image || "",
    title: post.title || "",
    location: post.location || [],
    content: post.content || "",
    cityId: post.cityId || "",
    countryId: post.countryId || "",
    districtId: post.districtId || "",
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
