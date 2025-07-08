"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useShareOpenStore } from "@/hooks/store";
import { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "sonner";

export default function ShareDialog() {
  const { isOpen, onClose } = useShareOpenStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyLink = () => {
    if (navigator.clipboard && window) {
      navigator.clipboard
        .writeText(decodeURIComponent(window.location.href))
        .then(() => toast.success("링크가 복사되었습니다!"))
        .catch(() =>
          toast.error("링크 복사에 실패했습니다. 다시 시도해주세요.")
        );
    }
  };

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-center font-mediom leading-6 text-gray-900">
            공유하기
          </DialogTitle>
        </DialogHeader>
        <section className="w-full mx-auto px-4 min-h-[10vh] flex items-center overflow-auto">
          <div className="w-full flex items-center justify-between gap-4">
            <Input
              type="text"
              value={decodeURIComponent(window.location.href)}
              readOnly
              className="md:w-[85%] hidden md:block md:text-xl"
            />
            <button
              onClick={handleCopyLink}
              className="border border-gray-300 font-semibold rounded-lg p-2 w-full md:w-[15%] flex justify-center items-center gap-2 cursor-pointer hover:bg-black/5"
            >
              <AiOutlineCopy className="text-xl" /> 복사
            </button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
