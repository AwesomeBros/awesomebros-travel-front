import { Form } from "@/components/ui/form";

import { Loader } from "@/components/shared/loader";
import { useFindCitiesAllByCountry } from "@/hooks/query/use-cities";
import { cn } from "@/lib/utils";
import { CityType, PostFormType } from "@/type";
import { ScrollArea } from "@radix-ui/react-scroll-area";
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

export default function CitiesStep({
  step,
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  const { data, isLoading } = useFindCitiesAllByCountry(
    form.getValues("countries_id") || 0
  );
  const [selectedCity, setSelectedCity] = useState<number>(
    form.getValues("cities_id") || 0
  );

  // console.log("form errors", form.formState.errors);

  useEffect(() => {
    form.setValue("cities_id", selectedCity ?? 0);
  }, [selectedCity, form.setValue]);
  // console.log("data", data);

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
                      setSelectedCity(city.id ?? 0);
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
            prevOnClick={handlePrevStep}
            nextDisabled={!selectedCity}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
