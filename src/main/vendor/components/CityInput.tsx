"use client";

import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CITY_INPUT_LABELS, CITY_INPUT_STYLES } from "../constants";

interface CityInputProps {
  name: string;
  isMultipleSelect?: boolean;
  isMandatory?: boolean;
  defaultValue?: string[];
  onChange?: (cities: string[]) => void;
}

export const CityInput = ({
  name,
  isMultipleSelect = false,
  isMandatory = false,
  defaultValue = [],
  onChange: externalOnChange,
}: CityInputProps) => {
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
      <div className={CITY_INPUT_STYLES.LOADING}>
        {CITY_INPUT_LABELS.LOADING}
      </div>
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
              CITY_INPUT_STYLES.CONTAINER,
              !!value?.length && CITY_INPUT_STYLES.CONTAINER_WITH_VALUES
            )}>
            {isMultipleSelect && (
              <div className={CITY_INPUT_STYLES.CITY_TAGS}>
                {value?.map((city: string) => (
                  <span
                    key={city}
                    onClick={() => removeCity(city)}
                    className={CITY_INPUT_STYLES.CITY_TAG}>
                    {city} {CITY_INPUT_LABELS.REMOVE_CITY}
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
                    ? CITY_INPUT_LABELS.SEARCH_ADD_CITIES
                    : CITY_INPUT_LABELS.SEARCH_SELECT_CITY
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={CITY_INPUT_STYLES.INPUT}
              />
            </Autocomplete>

            {errors[name] && (
              <span className={CITY_INPUT_STYLES.ERROR}>
                {(errors[name] as any)?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
