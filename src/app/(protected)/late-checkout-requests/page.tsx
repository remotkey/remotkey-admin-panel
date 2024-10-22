import { DashboardShimmer } from "@/common/components/molecules/Shimmer/DashboardShimmer";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { PropertyCheckOutTimeFilters } from "@/main/checkout-time/components/PropertyCheckOutTimeFilters";
import { PropertyCheckOutTimeTable } from "@/main/checkout-time/components/PropertyCheckOutTimeTable";
import { Suspense } from "react";

export default function CheckoutRequestsPage({
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
          <PropertyCheckOutTimeFilters />
        </Suspense>
        <Suspense fallback={<DashboardShimmer />}>
          <PropertyCheckOutTimeTable params={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
