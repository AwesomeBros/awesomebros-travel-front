import { Form } from "@/components/ui/form";

import { Loader } from "@/components/shared/loader";
import { useFindCitiesAllByCountry } from "@/hooks/query/use-city";
import { usePostFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { CityType, PostFormCityType } from "@/type";
import { PostFormCitySchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export default function CitiesStep({ step, setStep }: Props) {
  const { postForm, setPostForm } = usePostFormStore();
  const { data, isLoading } = useFindCitiesAllByCountry(postForm.countryId);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const form = useForm<PostFormCityType>({
    resolver: zodResolver(PostFormCitySchema),
    defaultValues: {
      cityId: postForm.cityId || undefined,
    },
  });
  console.log("postForm", postForm);

  console.log("form errors", form.formState.errors);

  const onSubmit = () => {
    const newCityId = selectedCity ?? 0;
    const currentCityId = postForm.cityId;
    const updatedPostForm = {
      ...postForm,
      cityId: newCityId,
    };

    if (newCityId !== currentCityId) {
      updatedPostForm.districtId = "";
    }
    setPostForm(updatedPostForm);
    setStep(step + 1);
  };
  useEffect(() => {
    if (postForm.cityId) {
      setSelectedCity(postForm.cityId);
    }
  }, [postForm.cityId]);

  useEffect(() => {
    form.setValue("cityId", selectedCity ?? 0);
  }, [selectedCity, form.setValue]);
  console.log("data", data);

  return (
    <>
      <Stepper count={2} />
      <Form {...form}>
        <form className="mb-20 md:mb-0 flex flex-col gap-4">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            도시 선택
          </h1>
          {isLoading ? (
            <div className="w-full h-[500px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <ScrollArea className="w-full h-[600px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5 px-10">
                {data.map((city: CityType) => (
                  <button
                    type="button"
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city.id);
                      if (city.id) {
                        form.setValue("cityId", city.id);
                      }
                    }}
                    className={cn(
                      "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                      {
                        "border-2 border-primary": selectedCity === city.id,
                        "border-2 border-purple-300": selectedCity !== city.id,
                      }
                    )}
                  >
                    <h1 className="font-semibold text-xs md:text-lg">
                      {city.name}
                    </h1>
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
          <ButtonWrap
            prevDisabled={step === 1}
            prevOnClick={() => setStep(step - 1)}
            nextDisabled={!selectedCity}
            nextOnClick={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </>
  );
}
