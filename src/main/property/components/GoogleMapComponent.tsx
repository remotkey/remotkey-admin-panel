import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { GoogleMapComponentProps } from "../interfaces";
import { FormInputErrorMessage } from "@/common/components/atoms/FormInputErrorMessage";

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  handleMapLoad,
  handleMapClick,
  defaultLocation,
  selectedLocation,
  error,
}) => {
  const [mapCenter, setMapCenter] = useState(defaultLocation);

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <div className="flex flex-col gap-5">
      <GoogleMap
        center={mapCenter}
        zoom={10}
        mapContainerClassName="rounded-r_08125"
        mapContainerStyle={{ width: "100%", height: "400px" }}
        onLoad={handleMapLoad}
        onClick={handleMapClick}>
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        )}
      </GoogleMap>
      {error && <FormInputErrorMessage text={error} />}
    </div>
  );
};
