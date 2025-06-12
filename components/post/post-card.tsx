import { PostType } from "@/type/post.type";
import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }: { post: PostType }) {
  console.log("PostCard post:", post);
  return (
    <Link
      className="hover:bg-[#00000005] shadow-sm rounded-lg border"
      href={`posts/${post.id}/${encodeURIComponent(post.slug)}`}
      key={post.id}
    >
      <div className="relative aspect-[2/1.5] rounded-lg overflow-hidden">
        <Image
          src={"/images/obelisk.jpg"}
          alt="Board Image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="p-2">
        <h2 className="text-black text-lg font-bold mt-2 line-clamp-1">
          {post.title}
        </h2>
        <p
          className="text-gray-500 text-sm leading-[140%] line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        <div className="flex justify-end xl:justify-between items-center mt-3">
          <p className="hidden xl:block text-gray-500 text-sm leading-[140%]">
            {`댓글 ${1} · 좋아요 ${1} · 조회수 ${post.viewCount}`}
          </p>
          <p className="text-primary font-bold">{post?.districts?.name}</p>
        </div>
      </div>
    </Link>
  );
}
