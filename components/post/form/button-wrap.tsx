import { Button } from "../../ui/button";

interface Props {
  prevText?: string;
  nextText?: string;
  prevOnClick?: () => void;
  nextOnClick?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  prevType?: "button" | "submit";
  nextType?: "button" | "submit";
}

export default function ButtonWrap({
  prevText = "이전",
  nextText = "다음",
  prevOnClick,
  nextOnClick,
  prevDisabled = false,
  nextDisabled = false,
  prevType = "button",
  nextType = "button",
}: Props) {
  return (
    <div className="fixed bottom-20 inset-x-0 flex justify-center gap-4">
      <Button
        type={prevType}
        onClick={prevOnClick}
        disabled={prevDisabled}
        className="rounded-full max-w-[160px] px-6 py-4"
      >
        {prevText}
      </Button>
      <Button
        type={nextType}
        onClick={nextOnClick}
        disabled={nextDisabled}
        className="rounded-full max-w-[160px] px-6 py-4"
      >
        {nextText}
      </Button>
    </div>
  );
}
