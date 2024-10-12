"use client";
import { Icon } from "@/lib/next-image/Icon";
import { LatLng } from "@/main/property/interfaces";
import Link from "next/link";
import { useState } from "react";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { AccordionTitleDescription } from "./AccordionTitleDescription";

export const MapListAccordionList = ({
  data,
  icon,
  index,
}: {
  data: LatLng;
  icon?: string;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  const isVisible =
    data?.contactNumber || data?.email || data?.website || data?.description;

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-C_C7C7C7 ${isOpen && isVisible && "pb-[1.88rem]"}`}>
      <div
        className={`font_bold_7 flex cursor-pointer items-center gap-[0.62rem] rounded-t-2xl bg-C_F5F5F5 px-5 py-4 ${isVisible ? "" : "rounded-b-2xl"} ${!isOpen && "rounded-b-2xl"}`}
        onClick={() => setIsOpen(!isOpen)}>
        <Link
          href={`https://www.google.com/maps?q=${data?.lat},${data?.lng}(${data?.place})&z=15&!3m1`}
          className="flex items-center gap-[0.62rem] hover:shadow-none"
          target="_blank">
          <Icon src={icon || "/icons/hospital.svg"} alt="checkIcon" size={25} />
          <span className="text-C_0E0E0E">{data?.place}</span>
        </Link>
        {isVisible &&
          (isOpen ? (
            <IoCaretUpOutline size={20} className="ml-auto text-C_0E0E0E" />
          ) : (
            <IoCaretDownOutline size={20} className="ml-auto text-C_0E0E0E" />
          ))}
      </div>
      {isOpen && <AccordionTitleDescription data={data} />}
    </div>
  );
};
