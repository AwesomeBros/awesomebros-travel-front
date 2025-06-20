import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePostFormStore } from "@/hooks/store";
import { PostFormInfoType } from "@/type";
import { PostFormInfoSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

const ReactQuillEditor = dynamic(() => import("../react-quill-editor"), {
  ssr: false,
});

export default function InfoStep({ setStep, step }: Props) {
  const { postForm, setPostForm } = usePostFormStore();
  const form = useForm<PostFormInfoType>({
    resolver: zodResolver(PostFormInfoSchema),
    defaultValues: {
      title: postForm.title || "",
      slug: postForm.slug || "",
      content: postForm.content || "",
    },
  });
  const onSubmit = (data: PostFormInfoType) => {
    setPostForm({
      ...postForm,
      title: data.title,
      slug: data.slug,
      content: data.content,
    });
    setStep(step + 1);
  };
  return (
    <>
      <Form {...form}>
        <form>
          <Stepper count={4} />
          <div className="space-y-4 mt-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="제목"
                      className="mt-1.5"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        const slugValue = e.target.value
                          .replace(/\s+/g, "-")
                          .replace(/:/g, "");
                        form.setValue("slug", slugValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>슬러그</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="슬러그"
                      className="mt-1.5"
                      readOnly
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1.5">내용</FormLabel>
                  <FormControl>
                    <ReactQuillEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonWrap
            prevOnClick={() => setStep(step - 1)}
            nextDisabled={!form.formState.isValid}
            nextOnClick={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </>
  );
}
