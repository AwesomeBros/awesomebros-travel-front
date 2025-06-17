import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindDistrictsAllByCity } from "@/hooks/query/use-district";
import { usePostFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { DistrictType, PostFormDistrictType } from "@/type";
import { PostFormDistrictSchema } from "@/validation";
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
  const { data, isLoading } = useFindDistrictsAllByCity(postForm.cityId);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const form = useForm<PostFormDistrictType>({
    resolver: zodResolver(PostFormDistrictSchema),
    defaultValues: {
      districtId: postForm.districtId || undefined,
    },
  });
  console.log("postForm", postForm);

  console.log("form errors", form.formState.errors);

  const onSubmit = () => {
    setPostForm({
      ...postForm,
      districtId: selectedDistrict ?? "",
    });
    setStep(step + 1);
  };
  useEffect(() => {
    if (postForm.districtId) {
      setSelectedDistrict(postForm.districtId);
    }
  }, [postForm.districtId]);

  useEffect(() => {
    form.setValue("districtId", selectedDistrict ?? "");
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
            <ScrollArea className="w-full h-[600px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5 px-10">
                {data.map((district: DistrictType) => (
                  <button
                    type="button"
                    key={district.id}
                    onClick={() => {
                      setSelectedDistrict(district.id);
                      if (district.id) {
                        form.setValue("districtId", district.id);
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
            </ScrollArea>
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
