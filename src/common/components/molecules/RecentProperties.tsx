"use client";

import { DASHBOARD_STYLES } from "@/common/constants";
import { Icon } from "@/lib/next-image/Icon";
import { SectionHeader } from "@/common/components/atoms/SectionHeader";
import { ListItem } from "@/common/components/atoms/ListItem";
import { IconContainer } from "@/common/components/atoms/IconContainer";
import { ActionButton } from "@/common/components/atoms/ActionButton";
import Link from "next/link";
import { PropertyInterface } from "@/main/property/interfaces";

interface RecentPropertiesProps {
  properties: PropertyInterface[];
}

export const RecentProperties = ({ properties }: RecentPropertiesProps) => {
  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm">
        <SectionHeader title="Recent Properties" />
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-C_F7F7F7 flex items-center justify-center">
            <Icon
              src="/icons/building.svg"
              alt="No properties"
              width={20}
              height={20}
              className="text-C_6E6E6E"
            />
          </div>
          <p className="text-C_6E6E6E mb-3 text-sm">No properties found</p>
          <Link
            href="/add-property"
            className="inline-flex items-center gap-2 rounded-lg bg-C_5EBE76 px-3 py-2 text-xs font-medium text-white hover:bg-C_309B5F transition-all duration-200">
            <Icon
              src="/icons/plusWhite.svg"
              alt="Add property"
              width={14}
              height={14}
            />
            Add Property
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-C_DEDEDE rounded-lg p-3 shadow-sm">
      <SectionHeader
        title="Recent Properties"
        action={
          <Link
            href="/property-management"
            className="text-sm font-medium text-C_5EBE76 hover:text-C_309B5F hover:underline transition-colors">
            View All
          </Link>
        }
      />

      <div className="space-y-3">
        {properties.map((property, index) => (
          <ListItem
            key={property.id || `property-${index}`}
            icon={
              <IconContainer size="sm" variant="default">
                <Icon
                  src="/icons/building.svg"
                  alt="Property icon"
                  width={16}
                  height={16}
                  className="text-C_5EBE76"
                />
              </IconContainer>
            }
            title={String(property.name || "")}
            subtitle={`${String(property.city || "")} • ${String(property.location?.place || "No location")}`}
            actions={
              <>
                <ActionButton
                  href={`/property/${String(property.slug || "")}?id=${String(property.id || "")}`}
                  variant="primary"
                  size="sm"
                  icon={
                    <Icon
                      src="/icons/building.svg"
                      alt="View property"
                      width={12}
                      height={12}
                    />
                  }>
                  View
                </ActionButton>
                <ActionButton
                  href={`/edit-property?id=${String(property.id || "")}`}
                  variant="outline"
                  size="sm"
                  icon={
                    <Icon
                      src="/icons/pencil.svg"
                      alt="Edit property"
                      width={12}
                      height={12}
                    />
                  }>
                  Edit
                </ActionButton>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};
