import { imageUpload } from "@/actions/files.actions";
import { PostFormType } from "@/type";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { AiFillCamera } from "react-icons/ai";
import { toast } from "sonner";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  form: UseFormReturn<PostFormType>;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

export default function ThumbnailStep({
  step,
  form,
  handlePrevStep,
  handleNextStep,
}: Props) {
  const [image, setImage] = useState<string | null>(
    form.getValues("url") || null
  );
  const [uploading, setUploading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      try {
        const formData = new FormData();

        Array.from(acceptedFiles).forEach((file) => {
          formData.append("files", file);
        });
        const data = await imageUpload(formData);
        console.log("data", data.body[0]);
        form.setValue("url", String(data.body[0]) || "");
        setImage(String(data.body[0]));
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        toast.error("이미지 업로드에 실패했습니다.");
      } finally {
        setUploading(false);
      }
    },
    [image, form]
  );
  const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop });

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <>
      <Stepper count={6} />
      <div className="flex flex-col gap-6 px-4">
        <h1 className="font-semibold text-lg md:text-2xl text-center">
          이미지를 추가해주세요
        </h1>
        <div className="flex flex-col gap-2">
          <div className="col-span-full">
            {!image ? (
              <div
                className={`mt-2 flex justify-center rounded-lg w-full aspect-2/1 border border-dashed border-gray-900/25 px-6 py-30 cursor-pointer ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                {...getRootProps()}
              >
                <input {...getInputProps()} className="sr-only" />
                {!isDragActive ? (
                  <div className="text-center">
                    <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <div className="relative rounded-md bg-white font-semibold text-primary">
                        <span>이미지를</span>
                      </div>
                      <p className="pl-1">업로드 해주세요</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      이미지 선택 및 드래그 앤 드롭
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <AiFillCamera className="mx-auto h-12 w-12 text-gray-300" />
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <p className="text-center">파일을 내려놓으세요.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-10 w-full gap-4">
        {image && (
          <div className="relative w-full aspect-2/1 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt="미리보기"
              fill
              className="object-cover object-center"
              onClick={() => handleImageRemove()}
            />
          </div>
        )}
      </div>
      <ButtonWrap
        prevDisabled={step === 1}
        prevOnClick={handlePrevStep}
        nextOnClick={handleNextStep}
        nextText="완료"
      />
    </>
  );
}
