"use client";

import { TAB_MENU_DATA } from "@/common/constants";
import { PropertyInterface } from "@/main/property/interfaces";
import { Tab, TabGroup, TabList, TabPanel } from "@headlessui/react";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { GoogleMapMultipleMarkers } from "./GoogleMapMultipleMarkers";
import { ShimmerMapOnly } from "./Shimmer/ShimmerMapOnly";
import { MapList } from "./MapList";

const libraries: Array<"places"> = ["places"];

export const TabMenu = ({ data }: { data: PropertyInterface }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (selectedTab === 0 && !mapLoaded) {
      setMapLoaded(true);
    }
  }, [selectedTab, mapLoaded]);

  if (!isLoaded) {
    return <ShimmerMapOnly />;
  }

  return (
    <div className="flex flex-col gap-[1.88rem]">
      <TabGroup onChange={setSelectedTab}>
        <TabList className="font_med_6 mb-[1.88rem] flex cursor-pointer gap-[1.88rem] overflow-auto whitespace-nowrap text-C_8F8F8F">
          {TAB_MENU_DATA.map((text, index) => (
            <Tab
              key={index}
              className="pb-[0.44rem] hover:border-b-2 hover:border-C_309B5F hover:text-C_002E2E hover:shadow-none focus:outline-none data-[selected]:border-b-2 data-[selected]:border-C_309B5F data-[selected]:text-C_002E2E">
              {text}
            </Tab>
          ))}
        </TabList>
        <TabPanel className="mt-2">
          {mapLoaded && (
            <>
              <GoogleMapMultipleMarkers
                markers={data?.nearByRestaurants || []}
              />
              <MapList
                data={data?.nearByRestaurants}
                icon="/icons/restaurant.svg"
              />
            </>
          )}
        </TabPanel>
        <TabPanel className="mt-2">
          {mapLoaded && (
            <>
              <GoogleMapMultipleMarkers markers={data?.nearByRentals || []} />
              <MapList data={data?.nearByRentals} icon="/icons/rental.svg" />
            </>
          )}
        </TabPanel>
        <TabPanel className="mt-2">
          {mapLoaded && (
            <>
              <GoogleMapMultipleMarkers markers={data?.localTours || []} />
              <MapList data={data?.localTours} icon="/icons/tour.svg" />
            </>
          )}
        </TabPanel>
      </TabGroup>
    </div>
  );
};
