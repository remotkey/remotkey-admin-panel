"use client";

import { SearchFiltersParams } from "@/common/enums";
import { ActionButtons } from "@/common/components/molecules/ActionButtons";
import { VendorInterface } from "@/main/property/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  VENDOR_TABLE_STYLES,
  VENDOR_LOCATION_TEXT,
  VENDOR_STATUS_MESSAGES,
} from "../constants";

export const VendorCard = ({ data }: { data: VendorInterface[] }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get(SearchFiltersParams.PAGE)) || 1;
  const perPageLimit = Number(
    searchParams?.get(SearchFiltersParams.PER_PAGE) || 10
  );

  if (!data || data.length === 0) {
    return null;
  }

  return data.map((item: VendorInterface, index: number) => (
    <tr className={VENDOR_TABLE_STYLES.ROW_BASE} key={item._id || index}>
      <td
        className={`${VENDOR_TABLE_STYLES.CELL_BASE} ${VENDOR_TABLE_STYLES.FIRST_CELL}`}>
        <div className="flex items-center justify-center text-C_6E6E6E">
          {(currentPage - 1) * perPageLimit + index + 1}
        </div>
      </td>
      <td className={VENDOR_TABLE_STYLES.CELL_BASE}>
        <div className="font_bold_8 w-40 cursor-pointer whitespace-nowrap">
          {item?.name || VENDOR_STATUS_MESSAGES.NO_VENDORS_FOUND}
        </div>
      </td>
      <td
        className={`font_med_8 whitespace-nowrap ${VENDOR_TABLE_STYLES.CELL_BASE} text-C_6E6E6E`}>
        <div className="space-y-1">
          {item?.cities?.map((city, cityIndex) => (
            <div key={`${city.name}-${cityIndex}`} className="text-xs">
              <span className="font-medium">{city.name}</span>
              {city.vendorLocation && city.vendorLocation.lat !== 0 && (
                <span className="ml-1 text-green-600">
                  {VENDOR_LOCATION_TEXT.LOCATION_ICON} (
                  {city.vendorLocation.lat.toFixed(4)},{" "}
                  {city.vendorLocation.lng.toFixed(4)})
                </span>
              )}
            </div>
          ))}
        </div>
      </td>
      <td className={VENDOR_TABLE_STYLES.CELL_BASE}>
        <div className="font_med_8 w-60 whitespace-nowrap text-C_6E6E6E">
          {item?.contactNumber && (
            <Link
              href={`tel:${item.contactNumber}`}
              className="font_reg_8 text-C_309B5F hover:shadow-none">
              {item.contactNumber}
            </Link>
          )}
        </div>
        <div className="font_med_8 w-60 whitespace-nowrap text-C_6E6E6E">
          {item?.email && (
            <Link
              href={`mailto:${item.email}`}
              className="font_reg_8 text-C_0D264F hover:shadow-none">
              {item.email}
            </Link>
          )}
        </div>
        <div className="font_med_8 w-60 whitespace-nowrap text-C_0E0E0E">
          {item?.website && (
            <Link
              href={
                item?.website?.startsWith("https://")
                  ? item?.website
                  : `https://${item?.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="font_reg_8 cursor-pointer text-C_0E0E0E hover:shadow-none">
              {item?.website}
            </Link>
          )}
        </div>
      </td>
      <td className={VENDOR_TABLE_STYLES.CELL_BASE}>
        <div className="font_med_8 w-60 text-C_6E6E6E line-clamp-3">
          {item?.description?.trim() || "—"}
        </div>
      </td>
      <td
        className={`${VENDOR_TABLE_STYLES.CELL_BASE} ${VENDOR_TABLE_STYLES.LAST_CELL}`}>
        <ActionButtons deleteDialogModuleName="vendor" id={item?._id || ""} />
      </td>
    </tr>
  ));
};
