import { PostType } from "@/type/post.type";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";

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
        <div
          className="text-gray-500 text-sm leading-[140%] line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        <div className="flex justify-end xl:justify-between items-center mt-3">
          <div className="text-[#000000b3] text-md font-medium leading-[140%] flex items-center gap-3">
            <p className="flex items-center gap-1">
              <FaRegCommentDots /> 0
            </p>
            <p className="flex items-center gap-1">
              <FaRegHeart /> 0
            </p>
            <p className="flex items-center gap-1">
              <PiEyesFill className="text-lg" /> 0
            </p>
          </div>
          <p className="text-primary font-bold">{post?.districts?.name}</p>
        </div>
      </div>
    </Link>
  );
}
