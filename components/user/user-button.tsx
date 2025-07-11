"use client";

import { useDeleteUser } from "@/hooks/query/use-user";
import { useUserEditOpenStore } from "@/hooks/store";
import { useConfirm } from "@/hooks/use-confirm";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function UserButton({ userId }: { userId?: string }) {
  const { onOpen } = useUserEditOpenStore();
  const [ConfirmDialog, confirm] = useConfirm(
    "정말로 탈퇴하시겠습니까?",
    "삭제된 유저는 복구할 수 없습니다."
  );
  const deleteUser = useDeleteUser();

  const handleDelete = async (userId?: string) => {
    const ok = await confirm();
    if (ok) {
      deleteUser.mutate(userId);
      await signOut();
    }
  };

  return (
    <div className="flex gap-3 justify-end">
      <ConfirmDialog />
      <Button onClick={() => onOpen(userId)}>수정</Button>
      <Button variant={"destructive"} onClick={() => handleDelete(userId)}>
        탈퇴
      </Button>
    </div>
  );
}
