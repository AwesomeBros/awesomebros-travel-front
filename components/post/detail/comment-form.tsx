"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommentFormType } from "@/type";
import { CommentFormSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function CommentForm({
  id,
  onSubmit,
  disabled,
  defaultValues,
}: {
  id?: string;
  onSubmit: (values: CommentFormType) => void;
  disabled?: boolean;
  defaultValues: CommentFormType;
}) {
  const form = useForm<CommentFormType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form
        className="mt-8"
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values);
          form.reset({ content: "" });
        })}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="댓글을 작성해주세요..."
                  className="resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse mt-4">
          <Button disabled={disabled}>{id ? "수정하기" : "작성하기"}</Button>
        </div>
      </form>
    </Form>
  );
}
