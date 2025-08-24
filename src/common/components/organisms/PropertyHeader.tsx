import Image from "next/image";
import { MainHeading } from "../atoms/MainHeading";
import { SubHeading } from "../atoms/SubHeading";
import { Button } from "../atoms/Button";
import { LatLng } from "@/main/property/interfaces";

interface PropertyHeaderProps {
  name: string;
  location: LatLng;
  bookingPageLink: string;
  className?: string;
}

export const PropertyHeader = ({
  name,
  location,
  bookingPageLink,
  className,
}: PropertyHeaderProps) => {
  return (
    <div
      className={`mt-5 flex flex-col justify-between gap-2 md:mt-0 md:flex-row md:gap-2 ${className}`}>
      <div className="flex flex-col gap-2 md:gap-0">
        <MainHeading text={name || "Property Name"} />
        <div className="flex justify-start gap-2">
          <Image
            alt="locationIcon"
            width={12.862}
            height={16.369}
            src="/icons/locationFill.svg"
          />
          <SubHeading text={location?.place || "Location"} />
        </div>
      </div>
      <div className="md:ml-auto">
        <Button
          hasBgColor
          className="px-8"
          text="Book direct and save on fees!"
          url={bookingPageLink || "#"}
          isNewTab
        />
      </div>
    </div>
  );
};
