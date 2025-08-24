"use client";

import {
  GoogleMap,
  Marker,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { VENDOR_LOCATION_TEXT, VENDOR_MAP_CONFIG } from "../constants";

interface VendorLocationMapProps {
  name: string;
  cityName: string;
  defaultLocation?: { lat: number; lng: number };
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
}

export const VendorLocationMap = ({
  name,
  cityName,
  defaultLocation,
  onLocationSelect,
}: VendorLocationMapProps) => {
  const { setValue, watch } = useFormContext();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(defaultLocation || null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  }>(VENDOR_MAP_CONFIG.DEFAULT_CENTER);
  const [searchInput, setSearchInput] = useState("");
  const searchBoxRef = useRef<any>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const watchedValue = watch(name);

  useEffect(() => {
    if (watchedValue && watchedValue.lat && watchedValue.lng) {
      setSelectedLocation({ lat: watchedValue.lat, lng: watchedValue.lng });
      setMapCenter({ lat: watchedValue.lat, lng: watchedValue.lng });
    }
  }, [watchedValue]);

  const handleMapClick = (event: any) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      setSelectedLocation(newLocation);
      setValue(name, newLocation, { shouldValidate: true });
      onLocationSelect?.(newLocation);
    }
  };

  const onSearchBoxLoad = (ref: any) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        if (place.geometry && place.geometry.location) {
          const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          setSelectedLocation(newLocation);
          setMapCenter(newLocation);
          setValue(name, newLocation, { shouldValidate: true });
          onLocationSelect?.(newLocation);
          setSearchInput(place.formatted_address || place.name || "");
        }
      }
    }
  };

  const searchCityLocation = async () => {
    if (!cityName || !isLoaded) return;

    try {
      const geocoder = new (window as any).google.maps.Geocoder();
      const result = await geocoder.geocode({ address: cityName });

      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };

        // Always update map center for better UX when switching cities
        setMapCenter(newCenter);

        // Only set a new location if there's no existing location data
        // This prevents overwriting user-selected locations when switching city tabs
        if (
          !selectedLocation ||
          (selectedLocation.lat === 0 && selectedLocation.lng === 0)
        ) {
          setSelectedLocation(newCenter);
          setValue(name, newCenter, { shouldValidate: true });
          onLocationSelect?.(newCenter);
        }
      }
    } catch (error) {
      console.error("Error geocoding city:", error);
    }
  };

  useEffect(() => {
    if (cityName && isLoaded) {
      searchCityLocation();
    }
  }, [cityName, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full rounded-lg bg-red-50 p-4 text-center text-red-600">
        Error loading Google Maps. Please check your API key.
        <br />
        <small>Error: {loadError?.message}</small>
        <br />
        <small>API Key: {apiKey ? "Present" : "Missing"}</small>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full rounded-lg bg-gray-50 p-4 text-center text-gray-600">
        Loading Google Maps...
        <br />
        <small>API Key: {apiKey ? "Present" : "Missing"}</small>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium text-gray-700">
          {VENDOR_LOCATION_TEXT.CLICK_MAP_OR_SEARCH}{" "}
          <span className="font-semibold text-C_002E2E">{cityName}</span>
        </p>
        {selectedLocation && (
          <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
            <svg
              className="size-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-xs font-medium text-green-700">
              {VENDOR_LOCATION_TEXT.SELECTED_COORDINATES}:{" "}
              {selectedLocation.lat.toFixed(6)},{" "}
              {selectedLocation.lng.toFixed(6)}
            </span>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        {/* Search Box Overlay */}
        <div
          className={`${VENDOR_MAP_CONFIG.SEARCH_BOX_POSITION} ${VENDOR_MAP_CONFIG.SEARCH_BOX_WIDTH}`}>
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
            options={{
              types: ["establishment", "geocode"],
              componentRestrictions: { country: "us" },
            }}>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={`${VENDOR_LOCATION_TEXT.SEARCH_IN} ${cityName}...`}
                className="w-full rounded-xl border-0 bg-white/95 px-4 py-3 pr-12 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm placeholder:text-gray-500 focus:border-0 focus:outline-none focus:ring-2 focus:ring-C_5EBE76"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="size-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </StandaloneSearchBox>
        </div>

        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: VENDOR_MAP_CONFIG.MAP_HEIGHT,
          }}
          center={mapCenter}
          zoom={VENDOR_MAP_CONFIG.DEFAULT_ZOOM}
          onClick={handleMapClick}
          options={{
            zoomControl: true,
            zoomControlOptions: {
              position: (window as any).google?.maps?.ControlPosition
                ?.RIGHT_TOP,
            },
            streetViewControl: true,
            streetViewControlOptions: {
              position: (window as any).google?.maps?.ControlPosition
                ?.RIGHT_TOP,
            },
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: (window as any).google?.maps?.ControlPosition
                ?.TOP_RIGHT,
            },
            fullscreenControl: true,
            fullscreenControlOptions: {
              position: (window as any).google?.maps?.ControlPosition
                ?.RIGHT_TOP,
            },
          }}>
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              draggable={true}
              onDragEnd={(event) => {
                if (event.latLng) {
                  const newLocation = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                  };
                  setSelectedLocation(newLocation);
                  setValue(name, newLocation, { shouldValidate: true });
                  onLocationSelect?.(newLocation);
                }
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};
