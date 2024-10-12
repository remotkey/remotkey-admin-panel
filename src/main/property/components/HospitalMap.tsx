"use client";

import { GoogleMapMultipleMarkers } from "@/common/components/molecules/GoogleMapMultipleMarkers";
import { MapListAccordionList } from "@/common/components/molecules/MapListAccordionList";
import { ShimmerMapOnly } from "@/common/components/molecules/Shimmer/ShimmerMapOnly";
import { useLoadScript } from "@react-google-maps/api";
import { LatLng } from "../interfaces";

const libraries: Array<"places"> = ["places"];

export const HospitalMap = ({ hospitals }: { hospitals: LatLng[] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (!isLoaded) {
    return <ShimmerMapOnly />;
  }

  return (
    <div className="flex flex-col gap-[1.88rem]">
      {isLoaded && <GoogleMapMultipleMarkers markers={hospitals || []} />}
      <div className="flex flex-col justify-center gap-[0.94rem]">
        {hospitals &&
          hospitals?.map((item, index) => (
            <MapListAccordionList
              key={index}
              index={index}
              data={item || []}
              icon="/icons/hospital.svg"
            />
          ))}
      </div>
    </div>
  );
};
