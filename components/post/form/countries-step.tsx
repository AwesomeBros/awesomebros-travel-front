import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindCountriesAll } from "@/hooks/query/use-country";
import { usePostFormStore } from "@/hooks/store";
import { cn } from "@/lib/utils";
import { CountryType, PostFormCountryType } from "@/type";
import { PostFormCountrySchema } from "@/validation";
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
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const form = useForm<PostFormCountryType>({
    resolver: zodResolver(PostFormCountrySchema),
    defaultValues: {
      countryId: postForm.countryId || "",
    },
  });
  console.log("form errors", form.formState.errors);

  const onSubmit = (data: PostFormCountryType) => {
    console.log("onSubmit data", data);
    const newCountryId = selectedCountry ?? "";
    const currentCountryId = postForm.countryId;
    const updatedPostForm = {
      ...postForm,
      countryId: newCountryId,
    };

    if (newCountryId !== currentCountryId) {
      updatedPostForm.cityId = "";
      updatedPostForm.districtId = "";
    }
    setPostForm(updatedPostForm);
    setStep(step + 1);
  };
  useEffect(() => {
    if (postForm.countryId) {
      setSelectedCountry(postForm.countryId);
    }
  }, [postForm.countryId]);

  useEffect(() => {
    form.setValue("countryId", selectedCountry ?? "");
  }, [selectedCountry, form.setValue]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }
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
                    onClick={() => setSelectedCountry(country.id)}
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
