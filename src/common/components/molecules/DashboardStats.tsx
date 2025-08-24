"use client";

import { DASHBOARD_CARDS, DASHBOARD_STYLES } from "@/common/constants";
import { Icon } from "@/lib/next-image/Icon";
import Link from "next/link";

interface DashboardStatsProps {
  stats: {
    properties: number;
    vendors: number;
    inquiries: number;
    checkoutRequests: number;
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const getStatValue = (id: string): number => {
    switch (id) {
      case "properties":
        return Number(stats?.properties) || 0;
      case "vendors":
        return Number(stats?.vendors) || 0;
      case "inquiries":
        return Number(stats?.inquiries) || 0;
      case "checkout-requests":
        return Number(stats?.checkoutRequests) || 0;
      default:
        return 0;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {DASHBOARD_CARDS.map((card) => (
        <Link key={card.id} href={card.link} className="block">
          <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm hover:shadow-md hover:border-C_5EBE76 transition-all duration-200 cursor-pointer h-full">
            <div className="flex flex-col h-full">
              {/* Header with title and icon */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-C_002E2E">
                  {card.title}
                </h3>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-C_F7F7F7">
                  <Icon
                    src={card.icon}
                    alt={`${card.title} icon`}
                    width={14}
                    height={14}
                    className="text-C_6E6E6E"
                  />
                </div>
              </div>

              {/* Main stat value */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-lg lg:text-xl font-bold mb-1 text-C_002E2E">
                  {getStatValue(card.id)}
                </p>
                {card.description && (
                  <p className="text-xs text-C_6E6E6E leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
