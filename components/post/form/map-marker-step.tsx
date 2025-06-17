import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { usePostFormStore } from "@/hooks/store";
import { PlaceType, PostFormLocationType } from "@/type";
import { PostFormLocationSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Dispatch, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
}

const AddressMap = dynamic(
  () => import("@/components/post/form/location-map"),
  {
    ssr: false,
    loading: () => (
      <div className="w-1/2 h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    ),
  }
);

const AddressSearch = dynamic(
  () => import("@/components/post/form/location-search"),
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

  const form = useForm<PostFormLocationType>({
    resolver: zodResolver(PostFormLocationSchema),
    defaultValues: {
      location:
        postForm.location && postForm.location.length > 0
          ? postForm.location.map((location) => ({
              lat: location.lat,
              lng: location.lng,
              name: location.name,
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
    form.setValue("location", coordinatesForForm, { shouldValidate: true });
  }, [selectPositions, form.setValue]);

  useEffect(() => {
    if (postForm.location && postForm.location.length > 0) {
      postForm.location.map((location) => {
        const place: PlaceType = {
          geometry: {
            coordinates: [location.lng, location.lat],
          },
          properties: {
            geocoding: {
              name: location.name || "",
            },
          },
        };
        setSelectPositions((prev) => [...prev, place]);
      });
    }
  }, [postForm.location]);

  const onSubmit = (data: PostFormLocationType) => {
    console.log("onSubmit data", data);
    setPostForm({
      ...postForm,
      location: data.location,
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
