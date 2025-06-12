"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function Top4Item() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isLg ? (
    <div className="relative hover:opacity-90 cursor-pointer">
      <Image
        className="rounded-[10px] flex flex-col-reverse object-cover object-center cursor-pointer shadow-sm hover:shadow-lg"
        src={"/images/obelisk.jpg"}
        width={336}
        height={460}
        alt="top-4-item"
      />
      <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-2 left-2 flex flex-col gap-4 z-10">
        <div className="flex items-center gap-2">
          <Avatar className="size-8 ">
            <AvatarImage src={"/images/noProfileImage.jpg"} />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <div className="text-white text-xs font-medium leading-[140%]">
              사용자
            </div>
            <div className="text-[#ffffffb3] text-xs font-normal leading-[140%]">
              2025-06-04
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="w-full line-clamp-1 text-white text-md font-medium leading-[140%]">
            제목
          </div>
          <div className="w-full line-clamp-2 text-[#ffffffb3] font-semibold leading-[140%]">
            내용
          </div>
        </div>
        <div>
          <div className="text-[#ffffffb3] text-xs font-normal leading-[140%]">{`댓글 0 ・ 좋아요 0 ・ 조회수 0`}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full relative hover:opacity-90 cursor-pointer ">
      <div>
        <div className="relative w-full h-[200px] border overflow-hidden rounded-md">
          <Image
            className="object-cover object-center"
            src={"/images/obelisk.jpg"}
            fill
            alt="top-4-item"
          />
        </div>
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute w-full p-2 bottom-0 left-0 flex flex-col gap-1 z-10">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={"/images/noProfileImage.jpg"} />
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="text-white text-xs font-medium leading-[140%]">
                사용자
              </div>
              <div className="text-[#ffffffb3] text-xs font-normal leading-[140%]">
                2025-06-04
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="w-full line-clamp-1 text-white text-md font-medium leading-[140%]">
              제목
            </div>
          </div>
          <div>
            <div className="text-[#ffffffb3] text-xs font-normal leading-[140%]">{`댓글 0 ・ 좋아요 0 ・ 조회수 0`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
