"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { ShimmerMapLoader } from "@/common/components/molecules/Shimmer/ShimmerMapLoader";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { LatLng } from "../interfaces";
import { FormValues } from "./PropertyForm";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { AccordionList } from "@/common/components/molecules/AccordionList";
import { GoogleMapBottomButton } from "@/common/components/atoms/buttons/GoogleMapBottomButton";

const defaultLocation: LatLng = {
  lat: 39.6403,
  lng: -106.3742,
  place: "Vail, CO",
};

const libraries: Array<"places"> = ["places"];

export const GoogleMap = () => {
  const {
    formState: { errors },
    register,
    setValue,
    getValues,
    control,
    trigger,
  } = useFormContext<FormValues>();

  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const mapRef = useRef<any | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<any | null>(null);

  const handleMapClick = useCallback(async (event: any) => {
    const latLng = event.latLng;
    if (latLng) {
      const location: LatLng = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };

      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location });
      if (response.results && response.results[0]) {
        const place = response.results[0].formatted_address;
        setSelectedLocation({ ...location, place });
      }
    }
  }, []);
  const clearAutoComplete = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  // -------------------------------Near By Hospital--------------------------------

  const handleAddHospital = async () => {
    const hospitals: LatLng[] = getValues("hospitals") || [];
    if (selectedLocation) {
      const updatedHospitals = [...hospitals, selectedLocation];
      setValue("hospitals", updatedHospitals);
      await trigger("hospitals");
      setSelectedLocation(null);
      clearAutoComplete();
    } else {
      toast.error("Please select a location before adding.");
    }
  };

  const handleRemoveHospital = (index: number) => {
    const hospitals: LatLng[] = getValues("hospitals") || [];
    if (hospitals.length === 1) {
      setValue("hospitals", []);
    } else {
      hospitals.splice(index, 1);
      setValue("hospitals", hospitals);
    }
    trigger("hospitals");
  };

  // -------------------------------End Near By Hospital--------------------------------

  // -------------------------------Nearby Restaurants ---------------------------------
  const handleAddNearByRestaurants = async () => {
    const nearByRestaurants: LatLng[] = getValues("nearByRestaurants") || [];
    if (selectedLocation) {
      const updatedNearByRestaurants = [...nearByRestaurants, selectedLocation];
      setValue("nearByRestaurants", updatedNearByRestaurants);
      await trigger("nearByRestaurants");
      setSelectedLocation(null);
      clearAutoComplete();
    } else {
      toast.error("Please select a location before adding.");
    }
  };

  const handlRemoveNearByRestaurants = (index: number) => {
    const nearByRestaurants: LatLng[] = getValues("nearByRestaurants") || [];
    if (nearByRestaurants.length === 1) {
      setValue("nearByRestaurants", []);
    } else {
      nearByRestaurants.splice(index, 1);
      setValue("nearByRestaurants", nearByRestaurants);
    }
    trigger("nearByRestaurants");
  };

  // -------------------------------Nearby Rentals ---------------------------------
  const handleAddNearByReantals = async () => {
    const nearByRentals: LatLng[] = getValues("nearByRentals") || [];
    if (selectedLocation) {
      const updatedNearByRentals = [...nearByRentals, selectedLocation];
      setValue("nearByRentals", updatedNearByRentals);
      await trigger("nearByRentals");
      setSelectedLocation(null);
      clearAutoComplete();
    } else {
      toast.error("Please select a location before adding.");
    }
  };
  const handlRemoveNearByReantals = (index: number) => {
    const nearByRentals: LatLng[] = getValues("nearByRentals") || [];
    if (nearByRentals.length === 1) {
      setValue("nearByRentals", []);
    } else {
      nearByRentals.splice(index, 1);
      setValue("nearByRentals", nearByRentals);
    }
    trigger("nearByRentals");
  };

  // -------------------------------Nearby LocalTours --------------------------------------

  const handleAddLocalTours = async () => {
    const localTours: LatLng[] = getValues("localTours") || [];
    if (selectedLocation) {
      const updatedLocalTours = [...localTours, selectedLocation];
      setValue("localTours", updatedLocalTours);
      await trigger("localTours");
      setSelectedLocation(null);
      clearAutoComplete();
    } else {
      toast.error("Please select a location before adding.");
    }
  };
  const handlRemoveLocalTours = (index: number) => {
    const localTours: LatLng[] = getValues("localTours") || [];
    if (localTours.length === 1) {
      setValue("localTours", []);
    } else {
      localTours.splice(index, 1);
      setValue("localTours", localTours);
    }
    trigger("localTours");
  };

  // -------------------------------Contsants ----------------------------------------------
  type GoogleMapButtonData = {
    name: keyof FormValues;
    text: string;
    removeItem: (index: number) => void;
  };

  type GoogleMapButtons = {
    text: string;
    onClick: () => void;
  };

  const GOOGLE_MAP_BUTTONS: GoogleMapButtons[] = [
    {
      text: "Add Hospital",
      onClick: handleAddHospital,
    },
    {
      text: "Add Nearby Restaurants",
      onClick: handleAddNearByRestaurants,
    },
    {
      text: "Add Nearby Rentals",
      onClick: handleAddNearByReantals,
    },
    {
      text: "Add Nearby Local Tours",
      onClick: handleAddLocalTours,
    },
  ];

  const GOOGLE_MAP_BUTTONS_DATA: GoogleMapButtonData[] = [
    {
      name: "hospitals",
      text: "Nearby Hospitals",
      removeItem: handleRemoveHospital,
    },
    {
      name: "nearByRestaurants",
      text: "Nearby Restaurants",
      removeItem: handlRemoveNearByRestaurants,
    },
    {
      name: "nearByRentals",
      text: "Nearby Rentals",
      removeItem: handlRemoveNearByReantals,
    },
    {
      name: "localTours",
      text: "Nearby Local tours",
      removeItem: handlRemoveLocalTours,
    },
  ];

  // -------------------------------End Contsants ----------------------------------------------

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (!isLoaded) {
    return <ShimmerMapLoader />;
  }

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={() => {
          const place = autocompleteRef.current?.getPlace();
          if (place && place.geometry) {
            setSelectedLocation({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              place: place.name || "",
            });
          } else {
            toast.error("Please select a valid location.");
          }
        }}>
        <InputContainer inputLabel="Search for a place" parentClassName="mb-5">
          <input type="text" placeholder="Search..." ref={inputRef} />
        </InputContainer>
      </Autocomplete>

      <GoogleMapComponent
        handleMapLoad={(map) => (mapRef.current = map)}
        handleMapClick={handleMapClick}
        defaultLocation={defaultLocation}
        selectedLocation={selectedLocation}
        error={
          errors.hospitals?.message ||
          errors?.nearByRestaurants?.message ||
          errors?.nearByRentals?.message ||
          errors?.localTours?.message
        }
      />

      <div className="flex gap-2 overflow-auto">
        {GOOGLE_MAP_BUTTONS.map((item, index) => (
          <GoogleMapBottomButton
            key={index}
            text={item.text}
            onClick={item.onClick}
            className="mt-4"
          />
        ))}
      </div>

      {GOOGLE_MAP_BUTTONS_DATA.map((item, index) => (
        <Controller
          key={index}
          name={item.name}
          control={control}
          render={({ field }) => (
            <>
              {Array.isArray(field.value) && field.value.length > 0 && (
                <AccordionList
                  fileds={field.value as LatLng[]}
                  handleRemoveItem={(itemIndex) => item.removeItem(itemIndex)}
                  text={item.text}
                />
              )}
            </>
          )}
        />
      ))}
      <input type="hidden" {...register("hospitals")} />
      <input type="hidden" {...register("nearByRestaurants")} />
      <input type="hidden" {...register("nearByRentals")} />
    </div>
  );
};
