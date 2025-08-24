"use client";

import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CITY_COORDINATES_LABELS, CITY_COORDINATES_STYLES } from "../constants";

interface CityWithCoordinates {
  name: string;
  lat: number;
  lng: number;
}

interface CityWithCoordinatesInputProps {
  name: string;
  isMultipleSelect?: boolean;
  isMandatory?: boolean;
  defaultValue?: CityWithCoordinates[];
  onChange?: (cities: CityWithCoordinates[]) => void;
}

export const CityWithCoordinatesInput = ({
  name,
  isMultipleSelect = false,
  isMandatory = false,
  defaultValue = [],
  onChange: externalOnChange,
}: CityWithCoordinatesInputProps) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const autocompleteRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState("");

  const watchedValue = useWatch({ control, name });

  useEffect(() => {
    if (
      !isMultipleSelect &&
      typeof watchedValue === "object" &&
      watchedValue?.name
    ) {
      setInputValue(watchedValue.name);
    }
  }, [watchedValue, isMultipleSelect]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <div className={CITY_COORDINATES_STYLES.LOADING}>
        {CITY_COORDINATES_LABELS.LOADING}
      </div>
    );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const extractCityData = (place: any): CityWithCoordinates | null => {
          const components = place?.address_components || [];
          const locality = components.find((c: any) =>
            c.types.includes("locality")
          )?.long_name;
          const adminLevel2 = components.find((c: any) =>
            c.types.includes("administrative_area_level_2")
          )?.long_name;
          const cityName = locality || adminLevel2 || place.name || "";

          if (!cityName || !place.geometry?.location) return null;

          return {
            name: cityName,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
        };

        const handlePlaceChanged = () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place) return;

          const cityData = extractCityData(place);
          if (!cityData) return;

          if (isMultipleSelect) {
            const currentValue = value || [];
            const cityExists = currentValue.some(
              (city: CityWithCoordinates) => city.name === cityData.name
            );

            if (!cityExists) {
              const newValue = [...currentValue, cityData];
              onChange(newValue);
              setValue(name, newValue, { shouldValidate: true });
              externalOnChange?.(newValue);
              setInputValue("");
            }
          } else {
            onChange(cityData);
            setValue(name, cityData, { shouldValidate: true });
            externalOnChange?.([cityData]);
            setInputValue(cityData.name);
          }
        };

        const removeCity = (cityName: string) => {
          if (isMultipleSelect) {
            const currentValue = value || [];
            const newValue = currentValue.filter(
              (city: CityWithCoordinates) => city.name !== cityName
            );
            onChange(newValue);
            setValue(name, newValue, { shouldValidate: true });
            externalOnChange?.(newValue);
          }
        };

        const currentValue = value || (isMultipleSelect ? [] : null);

        return (
          <div
            className={twMerge(
              CITY_COORDINATES_STYLES.CONTAINER,
              !!currentValue?.length &&
                CITY_COORDINATES_STYLES.CONTAINER_WITH_VALUES
            )}>
            {isMultipleSelect && (
              <div className={CITY_COORDINATES_STYLES.CITY_TAGS}>
                {currentValue?.map((city: CityWithCoordinates) => (
                  <span
                    key={city.name}
                    onClick={() => removeCity(city.name)}
                    className={CITY_COORDINATES_STYLES.CITY_TAG}>
                    {city.name} ({city.lat.toFixed(4)}, {city.lng.toFixed(4)}){" "}
                    {CITY_COORDINATES_LABELS.REMOVE_CITY}
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
                    ? CITY_COORDINATES_LABELS.SEARCH_ADD_CITIES
                    : CITY_COORDINATES_LABELS.SEARCH_SELECT_CITY
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={CITY_COORDINATES_STYLES.INPUT}
              />
            </Autocomplete>

            {errors[name] && (
              <span className={CITY_COORDINATES_STYLES.ERROR}>
                {(errors[name] as any)?.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
