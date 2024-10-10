"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { ShimmerInputContainer } from "@/common/components/molecules/Shimmer/ShimmerInputContainer";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./PropertyForm";

const libraries: Array<"places"> = ["places"];

export const AutoCompleteInput = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<FormValues>();
  const autocompleteRef = useRef<any>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    const formattedAddress = place?.formatted_address || "";
    register("location", {
      value: formattedAddress,
    });
  };

  if (!isLoaded) return <ShimmerInputContainer />;

  return (
    <>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}>
        <InputContainer
          isMandatory
          error={errors.location?.message as string}
          inputLabel="Location">
          <input
            type="text"
            placeholder="Search location..."
            {...register("location")}
          />
        </InputContainer>
      </Autocomplete>
    </>
  );
};
