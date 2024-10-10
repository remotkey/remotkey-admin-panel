"use client";

import { GoogleMapMultipleMarkers } from "@/common/components/molecules/GoogleMapMultipleMarkers";
import { ShimmerMapOnly } from "@/common/components/molecules/Shimmer/ShimmerMapOnly";
import { Icon } from "@/lib/next-image/Icon";
import { useLoadScript } from "@react-google-maps/api";
import Link from "next/link";
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
            <Link
              href={`https://www.google.com/maps?q=${item?.lat},${item?.lng}(${item?.place})&z=15&!3m1`}
              className="hover:shadow-none"
              key={index}
              target="_blank">
              <div
                className="font_reg_7 flex cursor-pointer gap-[0.62rem]"
                key={index}>
                <Icon src={"/icons/hospital.svg"} alt="checkIcon" size={25} />
                <span className="text-C_0E0E0E">{item?.place}</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
