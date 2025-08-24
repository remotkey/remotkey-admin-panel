import { DashboardShimmer } from "@/common/components/molecules/Shimmer/DashboardShimmer";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { Filters } from "@/main/property/components/Filters";
import { PropertyRSCWrapper } from "@/main/property/components/PropertyRSCWrapper";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function PropertyManagementPage({
  searchParams,
}: {
  searchParams: SearchFiltersParamsTypes;
}) {
  return (
    <div className="flex flex-col gap-[1.88rem]">
      <div className="space-y-4">
        <Suspense
          fallback={
            <div className="h-[3.25rem] w-full rounded-r_08125 bg-gray-200"></div>
          }>
          <Filters />
        </Suspense>
        <Suspense fallback={<DashboardShimmer />}>
          <PropertyRSCWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
