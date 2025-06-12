import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}

export default function ButtonWrap({ step, setStep, disabled }: Props) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        type="button"
        disabled={step === 1 || disabled}
        className="mt-1.5"
        onClick={() => setStep((prev) => prev - 1)}
      >
        {"이전"}
      </Button>
      <Button
        type="button"
        disabled={disabled}
        className="mt-1.5"
        onClick={() => setStep((prev) => prev + 1)}
      >
        {step > 6 ? "완료" : "다음"}
      </Button>
    </div>
  );
}
