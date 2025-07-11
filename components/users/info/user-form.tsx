"use client";

import { imageUpload } from "@/actions/files.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormType, UserType } from "@/type/user.type";
import { UserFormSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddAPhoto } from "react-icons/md";

export default function UserForm({
  onSubmit,
  disabled,
  defaultValues,
  user,
}: {
  onSubmit: (values: UserFormType) => void;
  disabled?: boolean;
  defaultValues: UserFormType;
  user: UserType;
}) {
  const [image, setImage] = useState<string | null>(user.url || null);
  const form = useForm<UserFormType>({
    resolver: zodResolver(UserFormSchema),
    defaultValues,
  });

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const data = await imageUpload(formData);
      form.setValue("url", data || "");
      setImage(data || null);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    form.setValue("url", "");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full mt-10 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="gap-4 flex items-center justify-center">
          <div className="relative overflow-hidden size-[150px] rounded-full">
            {image ? (
              <Image
                src={image}
                alt={`Profile`}
                fill
                className="object-cover cursor-pointer"
                onClick={handleImageRemove}
              />
            ) : (
              <Label
                id="image"
                className="cursor-pointer gap-4 border flex justify-center items-center overflow-hidden size-[150px] rounded-full"
              >
                <div className="text-center">
                  <MdAddAPhoto className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <span>클릭하여 업로드</span>
                    <input
                      type="file"
                      id={"image"}
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImagesChange}
                    />
                  </div>
                </div>
              </Label>
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse mt-4">
          <Button disabled={disabled}>{"수정하기"}</Button>
        </div>
      </form>
    </Form>
  );
}
