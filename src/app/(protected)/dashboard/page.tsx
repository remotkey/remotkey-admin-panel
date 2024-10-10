import { DashboardShimmer } from "@/common/components/molecules/Shimmer/DashboardShimmer";
import { SearchFiltersParamsTypes } from "@/common/interfaces";
import { Filters } from "@/main/property/components/Filters";
import { PropertyTable } from "@/main/property/components/PropertyTable";
import { Suspense } from "react";

export default function Dashboard({
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
          <Filters />
        </Suspense>
        <Suspense fallback={<DashboardShimmer />}>
          <PropertyTable params={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
