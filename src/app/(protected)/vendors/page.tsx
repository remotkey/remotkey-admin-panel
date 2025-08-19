import { DashboardShimmer } from "@/common/components/molecules/Shimmer/DashboardShimmer";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { VendorFilter } from "@/main/vendor/components/VendorFilters";
import { VendorsTable } from "@/main/vendor/components/VendorsTable";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

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
          <VendorFilter />
        </Suspense>
        <Suspense fallback={<DashboardShimmer />}>
          <VendorsTable params={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
