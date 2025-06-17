"use client";
import { PostFormType } from "@/type/post.type";
import { useState } from "react";
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
  disabled?: boolean;
}

export default function PostForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: WriteFormProps) {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        {step === 1 && <CountriesStep step={step} setStep={setStep} />}
        {step === 2 && <CitiesStep step={step} setStep={setStep} />}
        {step === 3 && <DistrictsStep step={step} setStep={setStep} />}
        {step === 4 && <InfoStep step={step} setStep={setStep} />}
        {step === 5 && <MapMarkerStep step={step} setStep={setStep} />}
        {step === 6 && (
          <ThumbnailStep step={step} setStep={setStep} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
}
