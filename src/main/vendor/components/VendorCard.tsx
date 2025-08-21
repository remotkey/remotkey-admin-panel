"use client";

import { SearchFiltersParams } from "@/common/enums";
import { ActionButtons } from "@/common/components/molecules/ActionButtons";
import { VendorInterface } from "@/main/property/interfaces";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const VendorCard = ({ data }: { data: VendorInterface[] }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get(SearchFiltersParams.PAGE)) || 1;
  const perPageLimit = Number(
    searchParams?.get(SearchFiltersParams.PER_PAGE) || 10
  );
  return data && data.length
    ? data?.map((item: VendorInterface, index: number) => (
        <tr className="bg-C_F7F7F7" key={index}>
          <td className="px-4 first:rounded-l-r_0625">
            <div className="flex items-center justify-center text-C_6E6E6E">
              {(currentPage - 1) * perPageLimit + index + 1}
            </div>
          </td>
          <td className="px-4">
            <div className="font_bold_8 w-40 cursor-pointer whitespace-nowrap">
              {item?.name}
            </div>
          </td>
          <td className="font_med_8 whitespace-nowrap px-4 text-C_6E6E6E">
            {item?.cities?.join(", ")}
          </td>
          <td className="px-4">
            <div className="font_med_8 w-60 whitespace-nowrap text-C_6E6E6E">
              <Link
                href={`tel:${item?.contactNumber}`}
                className="font_reg_8 text-C_309B5F hover:shadow-none">
                {item?.contactNumber}
              </Link>
            </div>
            <div className="font_med_8 w-60 whitespace-nowrap text-C_6E6E6E">
              <Link
                href={`mailto:${item?.email}`}
                className="font_reg_8 text-C_0D264F hover:shadow-none">
                {item?.email}
              </Link>
            </div>
            <div className="font_med_8 w-60 whitespace-nowrap text-C_0D264F">
              <Link
                href={
                  item?.website?.startsWith("https://")
                    ? item?.website
                    : `https://${item?.website}`
                }
                target="_blank"
                className="font_reg_8 cursor-pointer text-C_0E0E0E hover:shadow-none">
                {item?.website}
              </Link>
            </div>
          </td>
          <td className="px-4">
            <div className="font_med_8 w-60 whitespace-normal break-words text-C_6E6E6E">
              {item?.description}
            </div>
          </td>
          <td className="px-4 last:rounded-r-r_0625">
            <ActionButtons
              deleteDialogModuleName="vendor"
              id={item?._id || ""}
            />
          </td>
        </tr>
      ))
    : null;
};
