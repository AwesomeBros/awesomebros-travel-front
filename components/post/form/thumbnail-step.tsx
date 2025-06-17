import { imageUpload } from "@/actions/file.actions";
import { useCreatePost } from "@/hooks/query/user-post";
import { usePostFormStore, usePostOpenStore } from "@/hooks/store";
import useQuillImageReplacement from "@/hooks/use-image-replacement";
import { PostFormType } from "@/type";
import Image from "next/image";
import { Dispatch, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillCamera } from "react-icons/ai";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
  onSubmit: (data: PostFormType) => void;
}

export default function ThumbnailStep({ setStep, step, onSubmit }: Props) {
  const { postForm, setPostForm, resetPostForm } = usePostFormStore();
  const { replaceImages } = useQuillImageReplacement();
  const { onClose } = usePostOpenStore();
  const [image, setImage] = useState<string | null>(null);
  const createPost = useCreatePost();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const data = await imageUpload(formData);
      if (data) {
        setImage(data);
        setPostForm({
          ...postForm,
          image: data,
        });
        console.log("ThumbnailStep image uploaded:", data);
      }
    }
  }, []);
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const handleImageRemove = () => {
    setImage(null);
  };
  const handleSubmit = async () => {
    postForm.content = await replaceImages(postForm.content, postForm.slug);
    setPostForm({
      ...postForm,
      image: image || postForm.image,
    });
    createPost.mutate(postForm, {
      onSuccess: () => {
        onSubmit(postForm);
        resetPostForm();
        onClose();
      },
    });
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
              <label
                htmlFor="file-upload"
                className="mt-2 flex justify-center rounded-lg w-full aspect-2/1 border border-dashed border-gray-900/25 px-6 py-30 cursor-pointer"
                {...getRootProps()}
              >
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                />
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
              </label>
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
        prevOnClick={() => setStep(step - 1)}
        // nextDisabled={image === null}
        nextText="완료"
        nextOnClick={handleSubmit}
      />
    </>
  );
}
