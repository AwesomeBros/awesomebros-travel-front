import { BLUR_DATA_URL, NO_THUMBNAIL } from "@/constants";
import { PostType } from "@/type";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CountSection from "./count-section";
import LikeButton from "./like-button";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function PostCard({
  post,
  index,
}: {
  post: PostType;
  index: number;
}) {
  // console.log("PostCard post:", post);

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
        <LikeButton post={post} />
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
          <div className="flex justify-between items-center mt-3">
            <CountSection post={post} />
            <p className="text-primary font-bold">{post?.district?.name}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
