"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetMe, useUpdateUser } from "@/hooks/query/use-users";
import { useUserEditOpenStore } from "@/hooks/store";
import { UserFormType } from "@/type/user.type";
import { useSession } from "next-auth/react";
import UserForm from "./user-form";

export default function UserEditDialog() {
  const { isOpen, onClose, id } = useUserEditOpenStore();
  const { data: user, isLoading } = useGetMe(id);
  const { update } = useSession();
  const updateUser = useUpdateUser();

  if (isLoading || !user) return null;

  const defaultValues = {
    nickname: user.nickname,
    url: user.url || "",
  };

  function onSubmit(values: UserFormType) {
    updateUser.mutate(values, {
      onSuccess: async (data) => {
        const updatedData = {
          user: {
            nickname: data.body.nickname,
            url: data.body.url,
          },
        };
        await update(updatedData);
        onClose();
      },
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-mediom text-center leading-6 text-gray-900">
            유저 정보 수정하기
          </DialogTitle>
        </DialogHeader>
        <div>
          <UserForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            user={user}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
