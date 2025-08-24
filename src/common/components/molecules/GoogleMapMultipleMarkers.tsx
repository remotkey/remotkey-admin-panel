import { LatLng } from "@/main/property/interfaces";
import { GoogleMap, InfoBox, Marker } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

export const GoogleMapMultipleMarkers = ({
  markers,
}: {
  markers: LatLng[];
}) => {
  const mapRef = useRef<any | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      markers.forEach((marker) => {
        bounds.extend({ lat: marker.lat, lng: marker.lng });
      });

      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);
      }

      const center = bounds.getCenter();
      setMapCenter({ lat: center?.lat(), lng: center?.lng() });
    }
  }, [markers]);

  const onLoad = (mapInstance: any) => {
    mapRef.current = mapInstance;
  };

  const handleMapClick = (lat: number, lng: number, place: string) => {
    const encodedPlace = encodeURIComponent(place);
    const url = `https://www.google.com/maps?q=${lat},${lng}(${encodedPlace})&z=15&!3m1`;
    window.open(url, "_blank");
  };

  return (
    <GoogleMap
      onLoad={onLoad}
      center={mapCenter}
      zoom={10}
      mapContainerClassName="rounded-r_08125"
      mapContainerStyle={{ height: "400px", width: "100%" }}>
      {markers.map((marker, index) => (
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }}>
          {/* @ts-ignore */}
          <InfoBox
            position={{ lat: marker.lat, lng: marker.lng }}
            onCloseClick={() => console.log("closed")}
            options={{
              boxClass: "infobox-no-overload",
              closeBoxURL: "",
              enableEventPropagation: true,
              pixelOffset: new window.google.maps.Size(0, -20),
            }}>
            <div
              onClick={() =>
                handleMapClick(marker.lat, marker.lng, marker.place || "")
              }
              className="group cursor-pointer rounded-md border border-C_5EBE76 bg-white px-2 py-1.5 shadow-md transition-all duration-200 hover:scale-105 hover:border-C_002E2E hover:shadow-lg">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center text-white">
                  <span className="text-[10px]">📍</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium leading-tight text-C_002E2E">
                    {marker?.place}
                  </span>
                </div>
              </div>
            </div>
          </InfoBox>
        </Marker>
      ))}
    </GoogleMap>
  );
};
