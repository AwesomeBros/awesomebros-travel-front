import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindDistrictsAllByCity } from "@/hooks/query/use-district";
import { cn } from "@/lib/utils";
import { DistrictType, PostFormType } from "@/type";
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

export default function DistrictsStep({
  step,
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  const { data, isLoading } = useFindDistrictsAllByCity(
    form.getValues("cityId") || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    form.getValues("districtId") || ""
  );

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
            prevDisabled={step === 1}
            prevOnClick={handlePrevStep}
            nextDisabled={!selectedDistrict}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
