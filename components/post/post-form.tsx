"use client";

import { PostFormType } from "@/type";
import { PostFormSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CitiesStep from "./form/cities-step";
import CountriesStep from "./form/countries-step";
import DistrictsStep from "./form/districts-step";
import InfoStep from "./form/info-step";
import MapMarkerStep from "./form/map-marker-step";
import ThumbnailStep from "./form/thumbnail-step";
interface WriteFormProps {
  id?: number;
  onSubmit: (data: PostFormType) => void;
  defaultValues?: PostFormType;
  isUpdateMode: boolean;
  onStepSave?: (data: PostFormType) => void;
}

export default function PostForm({
  defaultValues,
  onSubmit,
  isUpdateMode,
  onStepSave,
}: WriteFormProps) {
  const [step, setStep] = useState<number>(1);
  const form = useForm<PostFormType>({
    resolver: zodResolver(PostFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const handleNextStep = async () => {
    const stepFieldMapping: { [key: number]: (keyof PostFormType)[] } = {
      1: ["countries_id"],
      2: ["cities_id"],
      3: ["districts_id"],
      4: ["title", "content", "slug"],
      5: ["locations"],
      6: ["url"],
    };

    const fieldsForCurrentStep = stepFieldMapping[step];

    if (!fieldsForCurrentStep) {
      return;
    }

    const isValid = await form.trigger(fieldsForCurrentStep);

    if (isValid) {
      if (!isUpdateMode && onStepSave) {
        onStepSave(form.getValues());
      }
      const lastStep = 6;

      if (step < lastStep) {
        setStep(step + 1);
      } else {
        onSubmit(form.getValues());
      }
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        {step === 1 && (
          <CountriesStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 2 && (
          <CitiesStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 3 && (
          <DistrictsStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 4 && (
          <InfoStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 5 && (
          <MapMarkerStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 6 && (
          <ThumbnailStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
      </div>
    </div>
  );
}
