"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { ShimmerInputContainer } from "@/common/components/molecules/Shimmer/ShimmerInputContainer";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { X } from "lucide-react";

const libraries: Array<"places"> = ["places"];

export const CityAutoCompleteInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const autocompleteRef = useRef<any | null>(null);
  const [inputValue, setInputValue] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (!isLoaded) return <ShimmerInputContainer />;

  return (
    <Controller
      name="cities"
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => {
        const handlePlaceChanged = () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place) return;

          const city =
            place.address_components?.find((c: any) =>
              c.types.includes("locality")
            )?.long_name || place.formatted_address;

          if (city && !value.includes(city)) {
            onChange([...value, city]);
            setInputValue("");
          }
        };

        const removeCity = (city: string) => {
          onChange(value.filter((c: string) => c !== city));
        };

        return (
          <div>
            <InputContainer
              error={errors?.cities?.message as string}
              inputLabel="Cities"
              isMandatory={false}>
              <div className="flex flex-wrap gap-2">
                {value.map((city: string) => (
                  <span
                    key={city}
                    className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm">
                    {city}
                    <X
                      className="ml-1 size-4 cursor-pointer"
                      onClick={() => removeCity(city)}
                    />
                  </span>
                ))}
              </div>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceChanged}
                options={{ types: ["(cities)"] }}>
                <input
                  type="text"
                  placeholder="Search and add city..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border-none focus:outline-none"
                />
              </Autocomplete>
            </InputContainer>
          </div>
        );
      }}
    />
  );
};
