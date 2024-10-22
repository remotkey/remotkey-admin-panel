"use client";

import { SearchFiltersParams } from "@/common/enums";
import { TimePeriod } from "@/main/property/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CheckOutTimeInterface {
  propertyId: {
    _id: string;
    name: string;
    slug: string;
  };
  checkOut: TimePeriod[];
  createdAt?: string;
}
export const formatTimestamp = (isoString: string): string => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

export const PropertyCheckOutTimeCard = ({
  data,
}: {
  data: CheckOutTimeInterface[];
}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get(SearchFiltersParams.PAGE)) || 1;
  const perPageLimit = Number(
    searchParams?.get(SearchFiltersParams.PER_PAGE) || 10
  );
  return data && data.length
    ? data?.map((item: CheckOutTimeInterface, index: number) => (
        <tr className="bg-C_F7F7F7" key={index}>
          <td className="px-4 first:rounded-l-r_0625">
            <div className="flex items-center justify-center text-C_6E6E6E">
              {(currentPage - 1) * perPageLimit + index + 1}
            </div>
          </td>
          <td className="px-4">
            <Link
              href={`/property/${item?.propertyId?.slug}?id=${item?.propertyId?._id}`}
              className="font_bold_8 w-60 cursor-pointer hover:shadow-none">
              {item?.propertyId?.name}
            </Link>
          </td>
          <td className="font_med_8 px-4 text-C_6E6E6E">
            {item?.checkOut[0]?.time + " " + item?.checkOut[0]?.period}
          </td>
          <td className="px-4">
            <div className="font_med_8 w-60 text-C_6E6E6E">
              {formatTimestamp(item?.createdAt || "")}
            </div>
          </td>
        </tr>
      ))
    : null;
};
