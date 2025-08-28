"use client";

import { useLoadScript } from "@react-google-maps/api";
import { GoogleMapMultipleMarkers } from "@/common/components/molecules/GoogleMapMultipleMarkers";
import { ShimmerMapOnly } from "@/common/components/molecules/Shimmer/ShimmerMapOnly";
import { VendorInterface } from "@/main/property/interfaces";
import { VENDOR_TAB_LABELS } from "@/main/vendor/constants";
import { Icon } from "@/lib/next-image/Icon";
import Link from "next/link";
import { useState } from "react";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";

interface VendorMapProps {
  vendors: VendorInterface[];
}

const libraries: Array<"places"> = ["places"];

export const VendorMap = ({ vendors }: VendorMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  if (!isLoaded) {
    return <ShimmerMapOnly />;
  }

  // Extract vendor locations from all cities
  const vendorLocations = vendors?.flatMap(
    (vendor) =>
      vendor.cities
        ?.filter(
          (city) => city?.vendorLocation && city?.vendorLocation?.lat !== 0
        )
        ?.map((city) => ({
          lat: city?.vendorLocation.lat,
          lng: city?.vendorLocation.lng,
          place: vendor?.name,
          name: vendor?.name,
          city: city?.name,
          description: vendor?.description,
          contactNumber: vendor?.contactNumber,
          email: vendor?.email,
          website: vendor?.website,
        })) || []
  );

  // if (!vendorLocations || vendorLocations.length === 0) {
  //   return (
  //     <div className="rounded-lg bg-C_F7F7F7 p-6 text-center text-C_6E6E6E">
  //       {VENDOR_TAB_LABELS.NO_VENDORS}
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-4">
      {!!vendorLocations?.length && (
        <GoogleMapMultipleMarkers markers={vendorLocations} />
      )}
      <VendorList vendors={vendors} />
    </div>
  );
};

// Vendor list component to display vendor information - matching other tabs design
const VendorList = ({ vendors }: { vendors: VendorInterface[] }) => {
  return (
    <div className="mt-[1.88rem] flex flex-col gap-[0.62rem]">
      {vendors.map((vendor, index) => (
        <VendorAccordionItem key={vendor._id} vendor={vendor} index={index} />
      ))}
    </div>
  );
};

// Individual vendor accordion item - matching MapListAccordionList design
const VendorAccordionItem = ({
  vendor,
  index,
}: {
  vendor: VendorInterface;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  const hasDetails =
    vendor.description ||
    vendor.contactNumber ||
    vendor.email ||
    vendor.website;

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-C_C7C7C7 ${isOpen && hasDetails && "pb-[1.88rem]"}`}>
      <div
        className={`font_bold_7 flex cursor-pointer items-center gap-[0.62rem] rounded-t-2xl bg-C_F5F5F5 px-5 py-4 ${hasDetails ? "" : "rounded-b-2xl"} ${!isOpen && "rounded-b-2xl"}`}
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-[0.62rem]">
          <Icon src="/icons/building.svg" alt="vendor" size={25} />
          <span className="text-C_0E0E0E">{vendor.name}</span>
        </div>
        {hasDetails &&
          (isOpen ? (
            <IoCaretUpOutline size={20} className="ml-auto text-C_0E0E0E" />
          ) : (
            <IoCaretDownOutline size={20} className="ml-auto text-C_0E0E0E" />
          ))}
      </div>
      {isOpen && <VendorDetails vendor={vendor} />}
    </div>
  );
};

// Vendor details component - matching AccordionTitleDescription design
const VendorDetails = ({ vendor }: { vendor: VendorInterface }) => {
  return (
    <>
      {vendor.cities?.map((city, cityIndex) => (
        <div key={cityIndex} className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Location</span>
          <div className="flex items-center gap-2">
            <span className="font_reg_8 text-C_0E0E0E">{city.name}</span>
            {city.vendorLocation && city.vendorLocation.lat !== 0 && (
              <Link
                href={`https://www.google.com/maps?q=${city.vendorLocation.lat},${city.vendorLocation.lng}(${vendor.name})&z=15&!3m1`}
                target="_blank"
                className="font_reg_8 text-C_309B5F hover:shadow-none">
                📍 View on Map
              </Link>
            )}
          </div>
        </div>
      ))}
      {vendor.description && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Description</span>
          <p className="font_reg_8 text-C_0E0E0E">{vendor.description}</p>
        </div>
      )}
      {vendor.contactNumber && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Contact Number</span>
          <Link
            href={`tel:${vendor.contactNumber}`}
            className="font_reg_8 text-C_0E0E0E hover:shadow-none">
            {vendor.contactNumber}
          </Link>
        </div>
      )}
      {vendor.email && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Email</span>
          <Link
            href={`mailto:${vendor.email}`}
            className="font_reg_8 text-C_0E0E0E hover:shadow-none">
            {vendor.email}
          </Link>
        </div>
      )}
      {vendor.website && (
        <div className="flex flex-col gap-[0.31rem] px-5">
          <span className="font_bold_8 text-C_309B5F">Website</span>
          <Link
            href={
              vendor.website?.startsWith("https://")
                ? vendor.website
                : `https://${vendor.website}`
            }
            target="_blank"
            className="font_reg_8 cursor-pointer text-C_0E0E0E hover:shadow-none">
            {vendor.website || "Not Available"}
          </Link>
        </div>
      )}
    </>
  );
};
