"use client";

import { useFilterStore } from "@/hooks/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const { resetFilterValue } = useFilterStore();
  return (
    <button
      onClick={() => {
        router.push("/");
        resetFilterValue();
      }}
    >
      <Image
        src={"/logo/logo.png"}
        alt="Logo"
        height={100}
        width={100}
        className="hidden md:block cursor-pointer"
      />
    </button>
  );
}
