import { Loader } from "@/components/shared/loader";
import { Form } from "@/components/ui/form";
import { LocationType, PlaceType, PostFormType } from "@/type/post.type";
import dynamic from "next/dynamic";
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

export default function MapMarkerStep({
  step,
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  const [selectPositions, setSelectPositions] = useState<PlaceType[]>([]);

  useEffect(() => {
    const initialFormLocations = form.getValues("locations");
    if (
      initialFormLocations &&
      initialFormLocations.length > 0 &&
      selectPositions.length === 0
    ) {
      const convertedToPlaceType: PlaceType[] = initialFormLocations.map(
        (loc, idx) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [loc.lng, loc.lat],
          },
          properties: {
            geocoding: {
              name: loc.name,
              label: loc.name,
              place_id: idx,
            },
          },
        })
      );
      setSelectPositions(convertedToPlaceType);
    }
  }, [form.getValues("locations")]);

  useEffect(() => {
    const coordinatesForForm: LocationType[] = selectPositions.map(
      (position, idx) => ({
        id: position.properties.geocoding.place_id ?? idx,
        lat: position.geometry.coordinates[1],
        lng: position.geometry.coordinates[0],
        name: position.properties.geocoding.name,
      })
    );
    form.setValue("locations", coordinatesForForm, { shouldValidate: true });
  }, [selectPositions, form.setValue]);

  // console.log("MapMarkerStep selectPositions", selectPositions);
  // console.log("form errors", form.formState.errors);

  return (
    <>
      <Form {...form}>
        <form>
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
            prevDisabled={step === 1}
            prevOnClick={handlePrevStep}
            nextDisabled={!selectPositions.length}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
