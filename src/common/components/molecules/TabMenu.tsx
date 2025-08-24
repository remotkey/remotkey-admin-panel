"use client";

import { TAB_MENU_DATA } from "@/common/constants";
import {
  PropertyInterface,
  VendorInterface,
  LatLng,
} from "@/main/property/interfaces";
import { Tab, TabGroup, TabList, TabPanel } from "@headlessui/react";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState, useMemo } from "react";
import { GoogleMapMultipleMarkers } from "./GoogleMapMultipleMarkers";
import { ShimmerMapOnly } from "./Shimmer/ShimmerMapOnly";
import { MapList } from "./MapList";
import { VendorMap } from "@/main/property/components/VendorMap";

const libraries: Array<"places"> = ["places"];

interface TabMenuProps {
  data: PropertyInterface;
  vendors: VendorInterface[];
}

type TabData = {
  title: string;
  type: "restaurants" | "rentals" | "tours" | "vendors";
  data: LatLng[] | VendorInterface[];
  icon: string;
};

export const TabMenu = ({ data, vendors }: TabMenuProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Create filtered tabs with data
  const filteredTabs = useMemo((): TabData[] => {
    const tabs: TabData[] = [];

    // Restaurants tab
    if (data?.nearByRestaurants && data.nearByRestaurants.length > 0) {
      tabs.push({
        title: TAB_MENU_DATA[0],
        type: "restaurants",
        data: data.nearByRestaurants,
        icon: "/icons/restaurant.svg",
      });
    }

    // Rentals tab
    if (data?.nearByRentals && data.nearByRentals.length > 0) {
      tabs.push({
        title: TAB_MENU_DATA[1],
        type: "rentals",
        data: data.nearByRentals,
        icon: "/icons/rental.svg",
      });
    }

    // Tours tab
    if (data?.localTours && data.localTours.length > 0) {
      tabs.push({
        title: TAB_MENU_DATA[2],
        type: "tours",
        data: data.localTours,
        icon: "/icons/tour.svg",
      });
    }

    // Vendors tab
    if (vendors && vendors.length > 0) {
      tabs.push({
        title: TAB_MENU_DATA[3],
        type: "vendors",
        data: vendors,
        icon: "/icons/building.svg",
      });
    }

    return tabs;
  }, [data, vendors]);

  useEffect(() => {
    if (filteredTabs.length > 0 && selectedTab === 0 && !mapLoaded) {
      setMapLoaded(true);
    }
  }, [selectedTab, mapLoaded, filteredTabs]);

  // Don't render anything if no tabs have data
  if (filteredTabs.length === 0) {
    return null;
  }

  if (!isLoaded) {
    return <ShimmerMapOnly />;
  }

  return (
    <div className="flex flex-col gap-[1.88rem]">
      <TabGroup onChange={setSelectedTab}>
        <TabList className="font_med_6 mb-[1.88rem] flex cursor-pointer gap-[1.88rem] overflow-auto whitespace-nowrap text-C_8F8F8F">
          {filteredTabs.map((tab, index) => (
            <Tab
              key={index}
              className="h-8 pb-[0.44rem] hover:border-b-2 hover:border-C_309B5F hover:text-C_002E2E hover:shadow-none focus:outline-none data-[selected]:border-b-2  data-[selected]:border-C_309B5F data-[selected]:text-C_002E2E">
              {tab.title}
            </Tab>
          ))}
        </TabList>

        {filteredTabs.map((tab, index) => (
          <TabPanel key={index} className="mt-2">
            {mapLoaded && (
              <>
                {tab.type === "vendors" ? (
                  <VendorMap vendors={tab.data as VendorInterface[]} />
                ) : (
                  <>
                    <GoogleMapMultipleMarkers markers={tab.data as LatLng[]} />
                    <MapList data={tab.data as LatLng[]} icon={tab.icon} />
                  </>
                )}
              </>
            )}
          </TabPanel>
        ))}
      </TabGroup>
    </div>
  );
};
