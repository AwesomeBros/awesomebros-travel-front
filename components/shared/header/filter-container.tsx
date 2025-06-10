import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
  isShow?: boolean;
}
export default function FilterContainer({ children, title, isShow }: Props) {
  return (
    <div
      className={cn(
        "absolute top-76 sm:top-[75px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full sm:max-w-3xl rounded-xl",
        {
          hidden: !isShow,
        }
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}
