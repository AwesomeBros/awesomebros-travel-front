import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostFormType } from "@/type";
import dynamic from "next/dynamic";
import { UseFormReturn } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  form: UseFormReturn<PostFormType>;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

const ReactQuillEditor = dynamic(() => import("../react-quill-editor"), {
  ssr: false,
});

<<<<<<< HEAD
export default function InfoStep({
  step,
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
=======
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
>>>>>>> a64d6dcd6b52e22ea92dc8b6e8ff486a615095c9
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
            prevOnClick={handlePrevStep}
            nextDisabled={
              !form.getValues("title") || !form.getValues("content")
            }
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
