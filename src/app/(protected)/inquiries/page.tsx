import { DashboardShimmer } from "@/common/components/molecules/Shimmer/DashboardShimmer";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { InquiryFilters } from "@/main/inquiry/componets/InquiryFilter";
import { InquiryTable } from "@/main/inquiry/componets/InquiryTable";
import { Suspense } from "react";

export default function InquiriesPage({
  searchParams,
}: {
  searchParams: SearchFiltersParamsTypes;
}) {
  return (
    <div className="flex flex-col gap-[1.88rem]">
      <div className="flex flex-col gap-[1.88rem]">
        <Suspense
          fallback={
            <div className="h-[3.25rem] w-full rounded-r_08125 bg-gray-200"></div>
          }>
          <InquiryFilters />
        </Suspense>
        <Suspense fallback={<DashboardShimmer />}>
          <InquiryTable params={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
