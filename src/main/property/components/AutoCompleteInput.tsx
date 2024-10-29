"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { ShimmerInputContainer } from "@/common/components/molecules/Shimmer/ShimmerInputContainer";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormValues } from "./PropertyForm";
import { LatLng } from "../interfaces";

const libraries: Array<"places"> = ["places"];

export const AutoCompleteInput = () => {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<FormValues>();
  const autocompleteRef = useRef<any | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const validateLocation = (location: LatLng) => {
    if (location?.lat === 0 && location?.lng === 0) {
      setError("location.lat", { message: "Please enter a valid location" });
      setError("location.lng", { message: "Please enter a valid location" });
    } else {
      clearErrors("location.lat");
      clearErrors("location.lng");
    }
  };

  const handlePlaceChanged = (onChange: (value: LatLng) => void) => {
    const place = autocompleteRef.current?.getPlace();
    const location: LatLng = {
      lat: place?.geometry?.location?.lat() ?? 0,
      lng: place?.geometry?.location?.lng() ?? 0,
      place: place?.formatted_address || "",
    };
    validateLocation(location);
    onChange(location);
  };

  useEffect(() => {
    if (errors?.location?.place) {
      setError("location.place", { message: "Invalid location name" });
    }
  }, [errors]);

  if (!isLoaded) return <ShimmerInputContainer />;

  return (
    <Controller
      name="location"
      control={control}
      rules={{
        validate: (value) => (value?.place ? true : "Location is required"),
      }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={() => handlePlaceChanged(onChange)}>
          <InputContainer
            isMandatory
            error={errors?.location?.place?.message as string}
            inputLabel="Location">
            <input
              type="text"
              placeholder="Search location..."
              value={value?.place || ""}
              onChange={(e) => {
                const newValue = { ...value, place: e.target.value };
                validateLocation(newValue);
                onChange(newValue);
              }}
            />
          </InputContainer>
        </Autocomplete>
      )}
    />
  );
};
