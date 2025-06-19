import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindCountriesAll } from "@/hooks/query/user-country";
import { usePostFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { CountryType } from "@/type/country.type";
import { PostFormCountryType } from "@/type/post.type";
import { PostFormCountrySchema } from "@/validation/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

export default function CountriesStep({ step, setStep }: Props) {
  const { postForm, setPostForm } = usePostFormStore();
  const { data, isLoading } = useFindCountriesAll();
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const form = useForm<PostFormCountryType>({
    resolver: zodResolver(PostFormCountrySchema),
    defaultValues: {
      countries_id: postForm.countries_id || undefined,
    },
  });
  console.log("form errors", form.formState.errors);

  const onSubmit = (data: PostFormCountryType) => {
    console.log("onSubmit data", data);
    const newCountryId = selectedCountry ?? 0;
    const currentCountryId = postForm.countries_id;
    const updatedPostForm = {
      ...postForm,
      countryId: newCountryId,
    };

    if (newCountryId !== currentCountryId) {
      updatedPostForm.cities_id = 0;
      updatedPostForm.districts_id = 0;
    }
    setPostForm(updatedPostForm);
    setStep(step + 1);
  };
  useEffect(() => {
    if (postForm.countries_id) {
      setSelectedCountry(postForm.countries_id!);
    }
  }, [postForm.countries_id]);

  useEffect(() => {
    form.setValue("countries_id", selectedCountry ?? 0);
  }, [selectedCountry, form.setValue]);

  return (
    <>
      <Stepper count={1} />
      <Form {...form}>
        <form className="mb-20 md:mb-0 flex flex-col gap-4">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            국가 선택
          </h1>
          {isLoading ? (
            <div className="w-full h-[500px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <ScrollArea className="w-full h-[600px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5 px-10">
                {data.map((country: CountryType) => (
                  <button
                    type="button"
                    key={country.id}
                    onClick={() => setSelectedCountry(country.id!)}
                    className={cn(
                      "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                      {
                        "border-2 border-primary":
                          selectedCountry === country.id,
                        "border-2 border-purple-300":
                          selectedCountry !== country.id,
                      }
                    )}
                  >
                    <h1 className="font-semibold text-xs md:text-lg">
                      {country.name}
                    </h1>
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
          <ButtonWrap
            prevDisabled={step === 1}
            nextDisabled={!selectedCountry}
            nextOnClick={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </>
  );
}
