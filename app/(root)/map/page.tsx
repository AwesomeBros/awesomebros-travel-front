"use client";

import { PlaceType } from "@/type";
import dynamic from "next/dynamic";
import { useState } from "react";

const AddressMap = dynamic(
  () => import("@/components/post/form/location-map"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

const AddressSearch = dynamic(
  () => import("@/components/post/form/location-search"),
  { ssr: false, loading: () => <p>Loading map...</p> }
);

export default function MapPage() {
  const [selectPositions, setSelectPositions] = useState<PlaceType[] | []>([]);
  console.log("selectPositions", selectPositions);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-[50vw] h-full">
        <AddressMap selectPositions={selectPositions} />
      </div>
      <div className="w-[50vw] h-full">
        <AddressSearch setSelectPositions={setSelectPositions} />
      </div>
    </div>
  );
}
