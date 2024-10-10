"use client";

import { NextFillImage } from "@/lib/next-image/NextFillImage";
import { QrCode } from "@/main/property/components/QrCode";
import Link from "next/link";
import { PropertyCardProps } from "../interfaces";
import { ActionButtons } from "./ActionButtons";
import { SearchFiltersParams } from "@/common/enums";
import { useSearchParams } from "next/navigation";

export const PropertyCard = ({ data }: { data: PropertyCardProps[] }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get(SearchFiltersParams.PAGE)) || 1;
  const perPageLimit = Number(
    searchParams?.get(SearchFiltersParams.PER_PAGE) || 10
  );
  return data && data.length
    ? data?.map((item: PropertyCardProps, index: number) => (
        <tr className="bg-C_F7F7F7" key={index}>
          <td className="px-4 first:rounded-l-r_0625">
            <div className="flex items-center justify-center text-C_6E6E6E">
              {(currentPage - 1) * perPageLimit + index + 1}
            </div>
          </td>
          <td className="px-4">
            <div className="relative size-20">
              <NextFillImage
                src={item?.thumbnail}
                alt={item?.alt || "propertyThumbnail"}
                parentClassName="size-full rounded-md object-cover"
                priority
              />
            </div>
          </td>
          <td className="px-4">
            <div className="font_bold_8 w-60 cursor-pointer">
              <Link
                href={"/property/" + item?.slug + "?id=" + item?._id}
                target="_blank"
                className="hover:shadow-none">
                {item?.name}
              </Link>
            </div>
          </td>
          <td className="font_med_8 px-4 text-C_6E6E6E">{item?.city}</td>
          <td className="px-4">
            <div className="font_med_8 w-60 text-C_6E6E6E">
              {item?.location}
            </div>
          </td>
          <td className="px-4">
            <QrCode icon={item?.qrCode || ""} />
          </td>
          <td className="px-4 last:rounded-r-r_0625">
            <ActionButtons id={item?._id} />
          </td>
        </tr>
      ))
    : null;
};
