import { CommentType } from "@/type";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function CommentItem({
  comment,
  index,
}: {
  comment: CommentType;
  index: number;
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
      className="flex flex-col gap-2"
    >
      <div>
        <div className="flex gap-2 items-center">
          <div className="relative overflow-hidden size-[48px] rounded-full shadow">
            <Image
              src={
                comment.user.image
                  ? comment.user.image
                  : "/images/noProfileImage.jpg"
              }
              alt={`Profile`}
              fill
              className="object-cover object-center"
            />
          </div>
          <div>
            <h1 className="font-semibold">{comment?.user?.name || "-"}</h1>
            <div className="text-gray-500 text-xs">
              {format(comment?.createdAt, "yyyy-MM-dd HH:mm")}
            </div>
          </div>
        </div>
        <div className="max-w-md text-gray-600">{comment?.content}</div>
      </div>
    </motion.div>
  );
}
