import { findPostById } from "@/actions/posts.actions";
import { auth } from "@/auth";
import CommentSection from "@/components/post/detail/comment-section";
import FeatureSection from "@/components/post/detail/feature-section";
import HeaderSection from "@/components/post/detail/header-section";
import { PostType } from "@/type/post.type";
import { notFound, redirect } from "next/navigation";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: number; slug: string }>;
}) {
  const { id, slug } = await params;

  const response = await findPostById(id);
  const post: PostType = response;
  if (!post) notFound();
  const currentURL = `/posts/${id}/${slug}`;
  const targetURL = `/posts/${id}/${encodeURIComponent(post.slug)}`;
  if (currentURL !== targetURL) {
    redirect(targetURL);
  }
  const session = await auth();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-5 p-4 rounded-xl shadow-md bg-white mb-2.5">
        <HeaderSection post={post} />
        <FeatureSection post={post} />
      </div>
      <CommentSection post={post} session={session} />
    </div>
  );
}
