"use client";

import PostForm from "@/components/post/post-form";
import { useCreatePost } from "@/hooks/query/user-post";
import { PostFormType } from "@/type/post.type";

export default function WritePage() {
  const createPost = useCreatePost();
  const onSubmit = async (data: PostFormType) => {
    console.log(data);
    createPost.mutate(data);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] mt-10">
      <PostForm onSubmit={onSubmit} />
    </div>
  );
}
