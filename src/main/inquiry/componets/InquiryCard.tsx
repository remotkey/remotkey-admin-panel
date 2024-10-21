"use client";

import { SearchFiltersParams } from "@/common/enums";
import { InquiryInterface } from "@/model/inquiry/Inquiry";
import { useSearchParams } from "next/navigation";

export const InquiryCard = ({ data }: { data: InquiryInterface[] }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get(SearchFiltersParams.PAGE)) || 1;
  const perPageLimit = Number(
    searchParams?.get(SearchFiltersParams.PER_PAGE) || 10
  );
  return data && data.length
    ? data?.map((item: InquiryInterface, index: number) => (
        <tr className="bg-C_F7F7F7" key={index}>
          <td className="px-4 first:rounded-l-r_0625">
            <div className="flex items-center justify-center text-C_6E6E6E">
              {(currentPage - 1) * perPageLimit + index + 1}
            </div>
          </td>
          <td className="px-4">
            <div className="font_bold_8 w-60 cursor-pointer">
              {item?.fullName}
            </div>
          </td>
          <td className="font_med_8 px-4 text-C_6E6E6E">{item?.phone}</td>
          <td className="px-4">
            <div className="font_med_8 w-60 text-C_6E6E6E">{item?.email}</div>
          </td>
          <td className="px-4">
            <div className="font_med_8 w-60 text-C_6E6E6E">
              {item?.interestedArea}
            </div>
          </td>
        </tr>
      ))
    : null;
};
