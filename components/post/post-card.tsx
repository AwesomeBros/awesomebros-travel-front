import { BLUR_DATA_URL, NO_THUMBNAIL } from "@/constants";
import { PostType } from "@/type/post.type";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";
import LikeButton from "./like-button";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function PostCard({
  post,
  index,
  userId,
}: {
  post: PostType;
  index: number;
  userId?: string;
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="hover:bg-[#00000005] rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className="relative aspect-[2/1.5] rounded-lg overflow-hidden">
        <Link
          href={`posts/${post.id}/${encodeURIComponent(post.slug)}`}
          key={post.id}
        >
          <Image
            src={post.url ? post.url : NO_THUMBNAIL}
            alt="Board Image"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            fill
            className="object-cover object-center"
          />
        </Link>
        <LikeButton post={post} userId={userId} />
      </div>
      <Link
        href={`posts/${post.id}/${encodeURIComponent(post.slug)}`}
        key={post.id}
      >
        <div className="p-2">
          <h2 className="text-lg font-bold mt-2 line-clamp-1 hover:underline">
            {post.title}
          </h2>

          <div
            className="text-muted-foreground text-sm line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/<img.*?\/?>/g, ""),
            }}
          />
          <div className="flex justify-end xl:justify-between items-center mt-3">
            <div className="text-md font-medium  text-muted-foreground flex items-center gap-3">
              <p className="flex items-center gap-1">
                <FaRegCommentDots /> {0}
              </p>
              <p className="flex items-center gap-1">
                <FaRegHeart /> {0}
              </p>
              <p className="flex items-center gap-1">
                <PiEyesFill className="text-lg" /> {post.viewCount || 0}
              </p>
            </div>
            <p className="text-primary font-bold">{post?.districts?.name}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
