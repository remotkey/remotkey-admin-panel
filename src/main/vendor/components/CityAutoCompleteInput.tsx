"use client";

import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface CityAutoCompleteInputProps {
  name: string;
  isMultipleSelect?: boolean;
  isMandatory?: boolean;
  defaultValue?: string[];
  onChange?: (cities: string[]) => void;
}

export const CityAutoCompleteInput = ({
  name,
  isMultipleSelect = false,
  isMandatory = false,
  defaultValue = [],
  onChange: externalOnChange,
}: CityAutoCompleteInputProps) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const autocompleteRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState("");

  const watchedValue = useWatch({ control, name });

  useEffect(() => {
    if (!isMultipleSelect && typeof watchedValue === "string") {
      setInputValue(watchedValue);
    }
  }, [watchedValue, isMultipleSelect]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <div className="animate-pulse rounded bg-gray-100 p-2">Loading...</div>
    );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const extractCity = (place: any) => {
          const components = place?.address_components || [];
          const locality = components.find((c: any) =>
            c.types.includes("locality")
          )?.long_name;
          const adminLevel2 = components.find((c: any) =>
            c.types.includes("administrative_area_level_2")
          )?.long_name;
          return locality || adminLevel2 || place.name || "";
        };

        const handlePlaceChanged = () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place) return;
          const city = extractCity(place);
          if (!city) return;

          if (isMultipleSelect) {
            if (!value.includes(city)) {
              const newValue = [...value, city];
              onChange(newValue);
              setValue(name, newValue, { shouldValidate: true });
              externalOnChange?.(newValue);
              setInputValue("");
            }
          } else {
            onChange(city);
            setValue(name, city, { shouldValidate: true });
            externalOnChange?.(city as any);
            setInputValue(city);
          }
        };

        const removeCity = (city: string) => {
          if (isMultipleSelect) {
            const newValue = value.filter((c: string) => c !== city);
            onChange(newValue);
            setValue(name, newValue, { shouldValidate: true });
            externalOnChange?.(newValue);
          }
        };

        return (
          <div
            className={twMerge(
              "flex w-full gap-2",
              !!value?.length && "flex-col "
            )}>
            {isMultipleSelect && (
              <div className="mb-1 flex flex-wrap gap-2">
                {value?.map((city: string) => (
                  <span
                    key={city}
                    onClick={() => removeCity(city)}
                    className="flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 transition hover:bg-green-200">
                    {city} ×
                  </span>
                ))}
              </div>
            )}

            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
              options={{ types: ["(cities)"] }}>
              <input
                type="text"
                placeholder={
                  isMultipleSelect
                    ? "Search and add cities..."
                    : "Search and select city..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex items-center gap-2.5 rounded-r_08125 border px-4 py-[0.88rem]"
              />
            </Autocomplete>

            {errors[name] && (
              <span className="text-sm text-red-500">
                {(errors[name] as any)?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
