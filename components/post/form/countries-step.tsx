import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindCountriesAll } from "@/hooks/query/user-country";
import { cn } from "@/lib/utils";
import { CountryType } from "@/type/country.type";
import { PostFormType } from "@/type/post.type";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  form: UseFormReturn<PostFormType>;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

export default function CountriesStep({
  step,
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  const { data, isLoading } = useFindCountriesAll();
  const [selectedCountry, setSelectedCountry] = useState<number>(
    form.getValues("countries_id") || 0
  );

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
                    onClick={() => setSelectedCountry(country.id ?? 0)}
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
            prevOnClick={handlePrevStep}
            nextDisabled={!selectedCountry}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
