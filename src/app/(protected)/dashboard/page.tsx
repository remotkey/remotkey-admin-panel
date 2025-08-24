import { Suspense } from "react";
import { MainHeader } from "@/common/components/organisms/MainHeader";
import { DashboardOverview } from "@/common/components/molecules/DashboardOverview";
import { DashboardShimmer } from "@/common/components/molecules/Shimmer/DashboardShimmer";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-4 lg:gap-6">
        <Suspense fallback={<DashboardShimmer />}>
          <DashboardOverview />
        </Suspense>
      </div>
    </>
  );
}
