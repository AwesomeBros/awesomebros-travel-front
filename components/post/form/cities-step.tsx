import { Form } from "@/components/ui/form";

import { Loader } from "@/components/shared/loader";
import { useFindCitiesAllByCountry } from "@/hooks/query/use-cities";
import { usePostFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { CityType } from "@/type/citiy.type";
import { PostFormCityType } from "@/type/post.type";
import { PostFormCitySchema } from "@/validation/post.schema";
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
  const { data, isLoading } = useFindCitiesAllByCountry(postForm.countries_id);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const form = useForm<PostFormCityType>({
    resolver: zodResolver(PostFormCitySchema),
    defaultValues: {
      cities_id: postForm.cities_id || 0,
    },
  });

  const onSubmit = () => {
    const newCityId = selectedCity ?? 0;
    const currentCityId = postForm.cities_id;
    const updatedPostForm = {
      ...postForm,
      cityId: newCityId,
    };

    if (newCityId !== currentCityId) {
      updatedPostForm.districts_id = 0;
    }
    setPostForm(updatedPostForm);
    setStep(step + 1);
  };
  useEffect(() => {
    if (postForm.cities_id) {
      setSelectedCity(postForm.cities_id);
    }
  }, [postForm.cities_id]);

  useEffect(() => {
    form.setValue("cities_id", selectedCity ?? 0);
  }, [selectedCity, form.setValue]);
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
                      setSelectedCity(city.id!);
                      if (city.id) {
                        form.setValue("cities_id", city.id);
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
