import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { useFindDistrictsAll } from "@/hooks/query/use-districts";
import { usePostFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { DistrictType } from "@/type/district.type";
import { PostFormDistrictType } from "@/type/post.type";
import { PostFormDistrictSchema } from "@/validation/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export default function DistrictsStep({ step, setStep }: Props) {
  const { postForm, setPostForm } = usePostFormStore();
  const { data, isLoading } = useFindDistrictsAll(postForm.cities_id);
  const [selectedDistrict, setSelectedDistrict] = useState<
    number | undefined
  >();
  const form = useForm<PostFormDistrictType>({
    resolver: zodResolver(PostFormDistrictSchema),
    defaultValues: {
      districts_id: postForm.districts_id || undefined,
    },
  });
  console.log("postForm", postForm);

  console.log("form errors", form.formState.errors);

  const onSubmit = () => {
    setPostForm({
      ...postForm,
      districts_id: selectedDistrict ?? 0,
    });
    setStep(step + 1);
  };
  useEffect(() => {
    if (postForm.districts_id) {
      setSelectedDistrict(postForm.districts_id);
    }
  }, [postForm.districts_id]);

  useEffect(() => {
    form.setValue("districts_id", selectedDistrict ?? 0);
  }, [selectedDistrict, form.setValue]);

  return (
    <>
      <Stepper count={3} />
      <Form {...form}>
        <form className="mb-20 md:mb-0 flex flex-col gap-4">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            지역 선택
          </h1>
          {isLoading ? (
            <div className="w-full h-[500px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
              {data.map((district: DistrictType) => (
                <button
                  type="button"
                  key={district.id}
                  onClick={() => {
                    setSelectedDistrict(district.id);
                    if (district.id) {
                      form.setValue("districts_id", district.id);
                    }
                  }}
                  className={cn(
                    "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                    {
                      "border-2 border-primary":
                        selectedDistrict === district.id,
                      "border-2 border-purple-300":
                        selectedDistrict !== district.id,
                    }
                  )}
                >
                  <h1 className="font-semibold text-xs md:text-lg">
                    {district.name}
                  </h1>
                </button>
              ))}
            </div>
          )}
          <ButtonWrap
            prevOnClick={() => setStep(step - 1)}
            nextDisabled={!selectedDistrict}
            nextOnClick={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </>
  );
}
