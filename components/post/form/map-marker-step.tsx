import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { usePostFormStore } from "@/hooks/store";
import { PlaceType, PostFormCoordinateType } from "@/type/post.type"; // PostFormCoordinateType 정의 확인 필요!
import { PostFormCoordinateSchema } from "@/validation/post.schema"; // PostFormCoordinateSchema 정의 확인 필요!
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Dispatch, useEffect, useState } from "react"; // useEffect 추가
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

const AddressMap = dynamic(() => import("@/components/post/form/address-map"), {
  ssr: false,
  loading: () => (
    <div className="w-1/2 h-[60vh] flex justify-center items-center">
      <Loader />
    </div>
  ),
});

const AddressSearch = dynamic(
  () => import("@/components/post/form/address-search"),
  {
    ssr: false,
    loading: () => (
      <div className="w-1/2 h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    ),
  }
);

export default function MapMarkerStep({ step, setStep }: Props) {
  const [selectPositions, setSelectPositions] = useState<PlaceType[] | []>([]);
  const { postForm, setPostForm } = usePostFormStore();

  const form = useForm<PostFormCoordinateType>({
    resolver: zodResolver(PostFormCoordinateSchema),
    defaultValues: {
      coordinates:
        postForm.coordinates && postForm.coordinates.length > 0
          ? postForm.coordinates.map((coordinate) => ({
              lat: coordinate.lat,
              lng: coordinate.lng,
              name: coordinate.name,
            }))
          : [],
    },
  });

  console.log("MapMarkerStep selectPositions", selectPositions);
  console.log("form errors", form.formState.errors);

  useEffect(() => {
    const coordinatesForForm = selectPositions.map((position) => ({
      lat: position.geometry.coordinates[1],
      lng: position.geometry.coordinates[0],
      name: position.properties.geocoding.name,
    }));
    form.setValue("coordinates", coordinatesForForm, { shouldValidate: true });
  }, [selectPositions, form.setValue]);

  useEffect(() => {
    if (postForm.coordinates && postForm.coordinates.length > 0) {
      postForm.coordinates.map((coordinate) => {
        const place: PlaceType = {
          geometry: {
            coordinates: [coordinate.lng, coordinate.lat],
          },
          properties: {
            geocoding: {
              name: coordinate.name || "",
            },
          },
        };
        setSelectPositions((prev) => [...prev, place]);
      });
    }
  }, [postForm.coordinates]);

  const onSubmit = (data: PostFormCoordinateType) => {
    console.log("onSubmit data", data);
    setPostForm({
      ...postForm,
      coordinates: data.coordinates,
    });

    setStep(step + 1);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stepper count={5} />
          <div className="space-y-4 mt-10">
            <div className="flex w-full size-full">
              <div className="w-1/2 h-[60vh]">
                <AddressMap
                  setSelectPositions={setSelectPositions}
                  selectPositions={selectPositions}
                />
              </div>
              <div className="w-1/2 h-full">
                <AddressSearch setSelectPositions={setSelectPositions} />
              </div>
            </div>
          </div>
          <ButtonWrap
            prevOnClick={() => setStep(step - 1)}
            nextDisabled={selectPositions.length === 0}
            nextOnClick={form.handleSubmit(onSubmit)}
          />
        </form>
      </Form>
    </>
  );
}
