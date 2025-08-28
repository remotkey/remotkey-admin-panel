"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CityInput } from "./CityInput";
import { VendorLocationMap } from "./VendorLocationMap";
import {
  VENDOR_FORM_LABELS,
  VENDOR_BUTTON_TEXT,
  VENDOR_LOCATION_STYLES,
  VENDOR_LOCATION_TEXT,
} from "../constants";

interface VendorLocationSelectorProps {
  name: string;
  isMandatory?: boolean;
  defaultValue?: Array<{
    name: string;
    vendorLocation: {
      lat: number;
      lng: number;
    };
  }>;
}

export const VendorLocationSelector = ({
  name,
  isMandatory = false,
  defaultValue = [],
}: VendorLocationSelectorProps) => {
  const { watch, setValue } = useFormContext();
  const [selectedCityIndex, setSelectedCityIndex] = useState<number | null>(
    null
  );

  const cities = watch(name) || defaultValue;

  // Extract city names for the city input
  const currentCityNames =
    cities?.map((city: any) => city?.name)?.filter(Boolean) || [];

  // Reset selected city index when cities change
  useEffect(() => {
    if (
      !cities ||
      cities.length === 0 ||
      !cities.some((city: any) => city?.name)
    ) {
      setSelectedCityIndex(null);
    }
  }, [cities]);

  const handleCitySelect = (cityIndex: number) => {
    setSelectedCityIndex(cityIndex);
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    if (selectedCityIndex !== null && cities?.[selectedCityIndex]) {
      const updatedCities = [...(cities || [])];
      updatedCities[selectedCityIndex] = {
        ...updatedCities[selectedCityIndex],
        vendorLocation: location,
      };
      setValue(name, updatedCities, { shouldValidate: true });
    }
  };

  const handleCitiesChange = (newCityNames: string[]) => {
    // Preserve existing cities with their locations
    const existingCities = cities || [];
    const newCities = newCityNames.map((cityName) => {
      // Check if city already exists and preserve its location
      const existingCity = existingCities.find(
        (city: any) => city.name === cityName
      );
      if (existingCity) {
        return existingCity;
      }
      return {
        name: cityName,
        vendorLocation: { lat: 0, lng: 0 },
      };
    });

    setValue(name, newCities, { shouldValidate: true });
  };

  const handleRemoveCity = (cityIndex: number) => {
    // Only remove the location data, keep the city
    const updatedCities = [...(cities || [])];
    if (updatedCities[cityIndex]) {
      updatedCities[cityIndex] = {
        ...updatedCities[cityIndex],
        vendorLocation: { lat: 0, lng: 0 },
      };

      setValue(name, updatedCities, { shouldValidate: true });

      // Reset selected city index if the removed city was selected
      if (selectedCityIndex === cityIndex) {
        setSelectedCityIndex(null);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {VENDOR_FORM_LABELS.CITIES}{" "}
          {isMandatory && <span className="text-red-500">*</span>}
        </label>
        <CityInput
          key={`${name}-cityInput`}
          name={`${name}_cityInput`}
          isMultipleSelect
          defaultValue={currentCityNames}
          onChange={handleCitiesChange}
        />
        {(!cities ||
          cities.length === 0 ||
          !cities.some((city: any) => city?.name)) && (
          <p className="mt-1 text-xs text-gray-500">
            Please select at least one city to continue
          </p>
        )}
      </div>

      {cities &&
        cities.length > 0 &&
        cities.some((city: any) => city?.name) && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">
              {VENDOR_FORM_LABELS.SELECT_VENDOR_LOCATIONS}
            </h4>

            <div className="flex flex-wrap gap-2">
              {cities
                .filter((city: any) => city?.name)
                .map((city: any, index: number) => (
                  <button
                    key={`${city?.name || index}-${index}`}
                    type="button"
                    onClick={() => handleCitySelect(index)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      selectedCityIndex === index
                        ? VENDOR_LOCATION_STYLES.CITY_BUTTON_ACTIVE
                        : VENDOR_LOCATION_STYLES.CITY_BUTTON_INACTIVE
                    }`}>
                    {city?.name || `City ${index + 1}`}
                    {city?.vendorLocation && city.vendorLocation.lat !== 0 && (
                      <span className="ml-1 text-xs">
                        {VENDOR_LOCATION_TEXT.LOCATION_ICON}
                      </span>
                    )}
                  </button>
                ))}
            </div>

            {selectedCityIndex !== null &&
              cities?.[selectedCityIndex] &&
              cities[selectedCityIndex]?.name && (
                <div className={VENDOR_LOCATION_STYLES.LOCATION_CONTAINER}>
                  <h5 className="mb-2 text-sm font-medium text-gray-700">
                    {VENDOR_FORM_LABELS.SELECT_LOCATION_IN}{" "}
                    {cities[selectedCityIndex]?.name ||
                      `City ${selectedCityIndex + 1}`}
                  </h5>
                  <VendorLocationMap
                    name={`${name}.${selectedCityIndex}.vendorLocation`}
                    cityName={cities[selectedCityIndex]?.name || ""}
                    defaultLocation={
                      cities[selectedCityIndex]?.vendorLocation || {
                        lat: 0,
                        lng: 0,
                      }
                    }
                    onLocationSelect={handleLocationSelect}
                  />

                  {cities[selectedCityIndex]?.vendorLocation &&
                    cities[selectedCityIndex].vendorLocation.lat !== 0 && (
                      <div className="mt-2 rounded bg-green-50 p-2 text-xs text-green-700">
                        <strong>{VENDOR_FORM_LABELS.SELECTED_LOCATION}:</strong>{" "}
                        {cities[
                          selectedCityIndex
                        ]?.vendorLocation?.lat?.toFixed(6) || "0.000000"}
                        ,{" "}
                        {cities[
                          selectedCityIndex
                        ]?.vendorLocation?.lng?.toFixed(6) || "0.000000"}
                      </div>
                    )}
                </div>
              )}

            <div className="mt-4">
              <h5 className="mb-2 text-sm font-medium text-gray-700">
                {VENDOR_FORM_LABELS.LOCATION_SUMMARY}
              </h5>
              <div className="space-y-2">
                {cities
                  .filter((city: any) => city?.name)
                  .map((city: any, index: number) => (
                    <div
                      key={`${city?.name || index}-${index}`}
                      className={VENDOR_LOCATION_STYLES.LOCATION_SUMMARY}>
                      <div className="flex items-center gap-2">
                        {city?.vendorLocation &&
                        city.vendorLocation.lat !== 0 ? (
                          <span
                            className={
                              VENDOR_LOCATION_STYLES.LOCATION_SELECTED
                            }>
                            {VENDOR_LOCATION_TEXT.LOCATION_ICON}{" "}
                            {city.vendorLocation.lat.toFixed(4)},{" "}
                            {city.vendorLocation.lng.toFixed(4)}
                          </span>
                        ) : (
                          <span
                            className={
                              VENDOR_LOCATION_STYLES.LOCATION_NOT_SELECTED
                            }>
                            {VENDOR_FORM_LABELS.NO_LOCATION_SELECTED}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCitySelect(index)}
                          className={VENDOR_LOCATION_STYLES.ACTION_BUTTON}>
                          {city?.vendorLocation && city.vendorLocation.lat !== 0
                            ? VENDOR_BUTTON_TEXT.CHANGE
                            : VENDOR_BUTTON_TEXT.SELECT}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveCity(index)}
                          className={VENDOR_LOCATION_STYLES.ACTION_BUTTON}>
                          {VENDOR_BUTTON_TEXT.REMOVE_LOCATION}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
