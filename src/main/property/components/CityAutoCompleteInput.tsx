"use client";

import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import {
  CITY_AUTOCOMPLETE_LABELS,
  CITY_AUTOCOMPLETE_STYLES,
} from "../../vendor/constants";

interface CityAutoCompleteInputProps {
  name: string;
  isMultipleSelect?: boolean;
  defaultValue?: string[];
  onChange?: (cities: string[]) => void;
}

export const CityAutoCompleteInput = ({
  name,
  isMultipleSelect = false,
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
      <div className={CITY_AUTOCOMPLETE_STYLES.LOADING}>
        {CITY_AUTOCOMPLETE_LABELS.LOADING}
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
              CITY_AUTOCOMPLETE_STYLES.CONTAINER,
              !!value?.length && CITY_AUTOCOMPLETE_STYLES.CONTAINER_WITH_VALUES
            )}>
            {isMultipleSelect && !!value?.length && (
              <div className={CITY_AUTOCOMPLETE_STYLES.CITY_TAGS}>
                {value?.map((city: string) => (
                  <span
                    key={city}
                    onClick={() => removeCity(city)}
                    className={CITY_AUTOCOMPLETE_STYLES.CITY_TAG}>
                    {city} {CITY_AUTOCOMPLETE_LABELS.REMOVE_CITY}
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
                    ? CITY_AUTOCOMPLETE_LABELS.SEARCH_ADD_CITIES
                    : CITY_AUTOCOMPLETE_LABELS.SEARCH_SELECT_CITY
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={
                  isMultipleSelect ? CITY_AUTOCOMPLETE_STYLES.INPUT : ""
                }
              />
            </Autocomplete>

            {errors[name] && (
              <span className={CITY_AUTOCOMPLETE_STYLES.ERROR}>
                {(errors[name] as any)?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
