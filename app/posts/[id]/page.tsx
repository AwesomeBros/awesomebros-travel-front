import { findPostById } from "@/actions/post.actions";
import { PostType } from "@/type/post.type";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: number }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PostRedirectPage({ params }: Props) {
  const { id } = await params;
  const response = await findPostById(id);
  const post: PostType = response?.body;
  console.log("post", post);

  if (!post) notFound();
  redirect(`/posts/${id}/${encodeURIComponent(post.slug)}`);
}
