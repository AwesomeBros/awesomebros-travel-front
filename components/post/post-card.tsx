import { BLUR_DATA_URL, NO_THUMBNAIL } from "@/constants";
import { PostType } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";

export default function PostCard({ post }: { post: PostType }) {
  return (
    <Link
      className="hover:bg-[#00000005] shadow-sm rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
      href={`posts/${post.id}/${encodeURIComponent(post.slug)}`}
      key={post.id}
    >
      <div className="relative aspect-[2/1.5] rounded-lg overflow-hidden">
        <Image
          src={post.image ? post.image : NO_THUMBNAIL}
          alt="Board Image"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="p-2">
        <h2 className="text-lg font-bold mt-2 line-clamp-1">{post.title}</h2>
        <div
          className="text-muted-foreground text-sm leading-[140%] line-clamp-1"
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/<img.*?\/?>/g, ""),
          }}
        />
        <div className="flex justify-end xl:justify-between items-center mt-3">
          <div className="text-md font-medium flex items-center gap-3">
            <p className="flex items-center gap-1">
              <FaRegCommentDots /> {post.commentCount || 0}
            </p>
            <p className="flex items-center gap-1">
              <FaRegHeart /> {post.likeCount || 0}
            </p>
            <p className="flex items-center gap-1">
              <PiEyesFill className="text-lg" /> {post.viewCount || 0}
            </p>
          </div>
          <p className="text-primary font-bold">{post?.district?.name}</p>
        </div>
      </div>
    </Link>
  );
}
