import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindCountriesAll } from "@/hooks/query/use-country";
import { cn } from "@/lib/utils";
import { CountryType, PostFormType } from "@/type";
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
<<<<<<< HEAD
  const [selectedCountry, setSelectedCountry] = useState<string>(
    form.getValues("countryId") || ""
  );
=======
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const form = useForm<PostFormCountryType>({
    resolver: zodResolver(PostFormCountrySchema),
    defaultValues: {
      countryId: postForm.countryId || "",
    },
  });
  console.log("form errors", form.formState.errors);

  const onSubmit = () => {
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
>>>>>>> a64d6dcd6b52e22ea92dc8b6e8ff486a615095c9

  useEffect(() => {
    form.setValue("countryId", selectedCountry ?? "");
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
            prevOnClick={handlePrevStep}
            nextDisabled={!selectedCountry}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
