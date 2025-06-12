import { NO_IMG } from "@/constants";
import { PostType } from "@/type/post.type";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { PiEyesFill } from "react-icons/pi";

export default function PostItem({ post }: { post: PostType }) {
  return (
    <Link
      href={`/posts/${post.id}/${encodeURIComponent(post.slug)}`}
      className="p-4 bg-white flex items-center gap-[30px] cursor-pointer hover:bg-[#00000005] rounded-lg border shadow-sm hover:shadow-lg"
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="relative size-8 rounded-full overflow-hidden">
            <Image
              src={post.users.url || NO_IMG}
              alt="profile"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[#000000b3] text-xs font-medium leading-[140%]">
              {post.users?.username}
            </div>
            <div className="text-[#00000066] text-xs font-normal leading-[140%]">
              {format(post.createdAt, "yyyy-MM-dd HH:mm")}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="text-black text-md font-medium leading-[140%]">
            {post.title}
          </div>
          <div
            className="text-[#000000b3] text-xs font-medium leading-[140%] line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>
        <div>
          <div className="text-[#000000b3] text-md font-medium leading-[140%] flex items-center gap-3">
            {/* {`댓글 ${1} · 좋아요 ${1} · 조회수 ${post.viewCount}`} */}
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
        </div>
      </div>
      {/* {boardListItem !== null && ( */}
      <div>
        <div className="relative size-[100px] overflow-hidden">
          {post.url && (
            <Image
              src={post.url ? post.url : "/images/obelisk.jpg"}
              alt="Board Image"
              fill
              className="rounded-[10px]"
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <p className="text-end text-primary font-bold">{post.districts.name}</p>
      </div>
      {/* )} */}
    </Link>
  );
}
