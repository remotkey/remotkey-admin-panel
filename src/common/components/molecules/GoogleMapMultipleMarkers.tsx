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
      setMapCenter({ lat: center.lat(), lng: center.lng() });
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
            }}>
            <div
              onClick={() =>
                handleMapClick(marker.lat, marker.lng, marker.place || "")
              }
              className="flex flex-col items-center rounded border bg-white px-4 py-2 shadow-md">
              <span className="px-2 font-bold">{marker.place}</span>
            </div>
          </InfoBox>
        </Marker>
      ))}
    </GoogleMap>
  );
};
