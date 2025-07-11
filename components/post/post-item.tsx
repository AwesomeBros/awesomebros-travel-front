import { BLUR_DATA_URL, NO_IMG, NO_THUMBNAIL } from "@/constants";
import { PostType } from "@/type";
import { format } from "date-fns";
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

export default function PostItem({
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
    >
      <Link
        href={`/posts/${post.id}/${encodeURIComponent(post.slug)}`}
        className="p-4 bg-white flex items-center gap-[30px] cursor-pointer hover:bg-[#00000005] rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="relative size-8 rounded-full overflow-hidden shadow-md">
              <Image
                src={post.users?.url || NO_IMG}
                alt="profile"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[#000000b3] text-xs font-medium leading-[140%]">
                {post.users?.nickname}
              </div>
              <div className="text-[#00000066] text-xs font-normal leading-[140%]">
                {format(post.createdAt, "yyyy-MM-dd HH:mm")}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-md font-medium leading-[140%]">
              {post.title}
            </div>
            <div
              className="text-xs font-medium leading-[140%] line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/<img.*?\/?>/g, ""),
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="text-md font-medium text-muted-foreground flex items-center gap-3">
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
            <p className="text-end text-primary font-bold">
              {post.district?.name}
            </p>
          </div>
        </div>
        <div className="relative w-[180px] h-[130px] overflow-hidden">
          <Image
            src={post.url ? post.url : NO_THUMBNAIL}
            alt="Board Image"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            fill
            className="rounded-[10px]"
            style={{
              objectFit: "cover",
            }}
          />
          <LikeButton post={post} userId={userId} />
        </div>
      </Link>
    </motion.div>
  );
}
