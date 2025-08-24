"use client";

import { DASHBOARD_STYLES } from "@/common/constants";
import { Icon } from "@/lib/next-image/Icon";
import { SectionHeader } from "@/common/components/atoms/SectionHeader";
import { ListItem } from "@/common/components/atoms/ListItem";
import { IconContainer } from "@/common/components/atoms/IconContainer";
import { ActionButton } from "@/common/components/atoms/ActionButton";
import Link from "next/link";
import { VendorInterface } from "@/main/property/interfaces";

interface RecentVendorsProps {
  vendors: VendorInterface[];
}

export const RecentVendors = ({ vendors }: RecentVendorsProps) => {
  if (!Array.isArray(vendors) || vendors.length === 0) {
    return (
      <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm">
        <SectionHeader title="Recent Vendors" />
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-C_F7F7F7 flex items-center justify-center">
            <Icon
              src="/icons/building.svg"
              alt="No vendors"
              width={20}
              height={20}
              className="text-C_6E6E6E"
            />
          </div>
          <p className="text-C_6E6E6E mb-3 text-sm">No vendors found</p>
          <Link
            href="/add-vendor"
            className="inline-flex items-center gap-2 rounded-lg bg-C_5EBE76 px-3 py-3 text-xs font-medium text-white hover:bg-C_309B5F transition-all duration-200">
            <Icon
              src="/icons/plusWhite.svg"
              alt="Add vendor"
              width={14}
              height={14}
            />
            Add Vendor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm">
      <SectionHeader
        title="Recent Vendors"
        action={
          <Link
            href="/vendors"
            className="text-sm font-medium text-C_5EBE76 hover:text-C_309B5F hover:underline transition-colors">
            View All
          </Link>
        }
      />

      <div className="space-y-3">
        {vendors.map((vendor, index) => (
          <ListItem
            key={vendor._id || `vendor-${index}`}
            icon={
              <IconContainer size="sm" variant="default">
                <Icon
                  src="/icons/building.svg"
                  alt="Vendor icon"
                  width={16}
                  height={16}
                  className="text-C_5EBE76"
                />
              </IconContainer>
            }
            title={String(vendor.name || "")}
            subtitle={
              Array.isArray(vendor.cities)
                ? vendor.cities
                    .map((city) => String(city?.name || ""))
                    .join(", ")
                : "No cities"
            }
            actions={
              <ActionButton
                href={`/edit-vendor?id=${String(vendor._id || "")}`}
                variant="outline"
                size="sm"
                icon={
                  <Icon
                    src="/icons/pencil.svg"
                    alt="Edit vendor"
                    width={12}
                    height={12}
                  />
                }>
                Edit
              </ActionButton>
            }
          />
        ))}
      </div>
    </div>
  );
};
