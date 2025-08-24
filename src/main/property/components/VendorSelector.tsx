"use client";

import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { getVendors } from "@/main/vendor/api/actions";
import { VendorInterface } from "@/main/property/interfaces";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { VENDOR_SELECTOR_LABELS, VENDOR_SELECTOR_STYLES } from "../constants";
import { SearchFiltersParams } from "@/common/enums";

interface VendorSelectorProps {
  name: string;
  label: string;
  isMandatory?: boolean;
}

export const VendorSelector = ({
  name,
  label,
  isMandatory = false,
}: VendorSelectorProps) => {
  const { control, setValue } = useFormContext();
  const [vendors, setVendors] = useState<VendorInterface[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<VendorInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Watch the city field to filter vendors
  const city = useWatch({ control, name: "city" });
  const selectedVendors = useWatch({ control, name }) || [];

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (city && vendors.length > 0) {
      // Filter vendors by city
      const cityVendors = vendors.filter((vendor) =>
        vendor.cities?.some((vendorCity) =>
          vendorCity.name?.toLowerCase().includes(city.toLowerCase())
        )
      );
      setFilteredVendors(cityVendors);
    } else {
      setFilteredVendors([]);
    }
  }, [city, vendors]);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const response = await getVendors({
        params: {
          [SearchFiltersParams.SEARCH]: "",
          [SearchFiltersParams.CITY]: "",
          [SearchFiltersParams.PAGE]: "1",
          [SearchFiltersParams.PER_PAGE]: "100",
        } as any,
      });
      if (response?.data) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVendorToggle = (vendorId: string) => {
    const currentVendors = selectedVendors || [];
    const isSelected = currentVendors.includes(vendorId);

    if (isSelected) {
      // Remove vendor
      const updatedVendors = currentVendors.filter(
        (id: string) => id !== vendorId
      );
      setValue(name, updatedVendors, { shouldValidate: true });
    } else {
      // Add vendor
      const updatedVendors = [...currentVendors, vendorId];
      setValue(name, updatedVendors, { shouldValidate: true });
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    if (!searchValue.trim()) {
      // Show city-filtered vendors
      if (city && vendors.length > 0) {
        const cityVendors = vendors.filter((vendor) =>
          vendor.cities?.some((vendorCity) =>
            vendorCity.name?.toLowerCase().includes(city.toLowerCase())
          )
        );
        setFilteredVendors(cityVendors);
      }
    } else {
      // Filter by search term
      const searchResults = vendors.filter(
        (vendor) =>
          vendor.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          vendor.cities?.some((vendorCity) =>
            vendorCity.name?.toLowerCase().includes(searchValue.toLowerCase())
          )
      );
      setFilteredVendors(searchResults);
    }
  };

  const isVendorSelected = (vendorId: string) => {
    return selectedVendors?.includes(vendorId) || false;
  };

  return (
    <InputContainer error="" inputLabel={label} isMandatory={isMandatory}>
      <div className="w-full space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder={VENDOR_SELECTOR_LABELS.SEARCH_PLACEHOLDER}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-C_DEDEDE px-4 py-3 text-C_0E0E0E transition-all duration-200 placeholder:text-C_8F8F8F focus:border-C_5EBE76 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="size-5 text-C_8F8F8F"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Selected Vendors Display */}
        {selectedVendors && selectedVendors.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-C_5EBE76"></div>
              <h4 className="font-semibold text-C_0E0E0E">
                {VENDOR_SELECTOR_LABELS.SELECTED_VENDORS}
              </h4>
              <span className="rounded-full bg-C_5EBE76/10 px-2 py-1 text-xs font-medium text-C_5EBE76">
                {selectedVendors.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedVendors.map((vendorId: string) => {
                const vendor = vendors.find((v) => v._id === vendorId);
                return vendor ? (
                  <div
                    key={vendorId}
                    className="bg-gradient-to-r group flex items-center gap-3 rounded-xl border border-C_5EBE76/20 from-C_5EBE76/5 to-C_5EBE76/10 px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md">
                    <div className="flex-1">
                      <div className="font-semibold text-C_002E2E">
                        {vendor.name}
                      </div>
                      <div className="text-sm text-C_309B5F opacity-80">
                        {vendor.cities
                          ?.slice(0, 2)
                          ?.map((c) => c.name)
                          ?.join(", ") || "No cities"}
                        {vendor.cities &&
                          vendor.cities.length > 2 &&
                          ` +${vendor.cities.length - 2} more`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleVendorToggle(vendorId)}
                      className="rounded-full bg-white p-2 text-C_5EBE76 transition-all duration-200 hover:bg-C_EA241D/10 hover:text-C_EA241D group-hover:scale-110">
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Vendor List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-C_0E0E0E">
              Available Vendors
            </h4>
            {city && (
              <span className="rounded-full bg-C_5EBE76/10 px-3 py-1 text-sm font-medium text-C_5EBE76">
                Filtered by: {city}
              </span>
            )}
          </div>

          {!city ? (
            <div className="rounded-lg border border-C_DEDEDE bg-C_F7F7F7/50 p-8 text-center">
              <div className="mx-auto mb-4 w-fit rounded-full bg-C_5EBE76/10 p-4">
                <svg
                  className="size-12 text-C_5EBE76"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h5 className="mb-2 text-lg font-semibold text-C_002E2E">
                Select a City First
              </h5>
              <p className="mb-4 text-C_6E6E6E">
                Choose a city above to see available vendors in that location
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-C_5EBE76/10 px-4 py-2 text-sm font-medium text-C_5EBE76">
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                City selection required to filter vendors
              </div>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto rounded-lg border border-C_DEDEDE bg-C_F7F7F7/50">
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="flex items-center gap-3 text-C_8F8F8F">
                    <div className="size-5 animate-spin rounded-full border-2 border-C_DEDEDE border-t-C_5EBE76"></div>
                    <span>{VENDOR_SELECTOR_LABELS.LOADING}</span>
                  </div>
                </div>
              ) : filteredVendors.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="mb-3 rounded-full bg-C_F7F7F7 p-3">
                    <svg
                      className="size-8 text-C_8F8F8F"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div className="text-C_6E6E6E">
                    {city
                      ? `${VENDOR_SELECTOR_LABELS.NO_VENDORS_CITY} ${city}`
                      : VENDOR_SELECTOR_LABELS.NO_VENDORS_AVAILABLE}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-C_DEDEDE">
                  {filteredVendors.map((vendor) => (
                    <div
                      key={vendor._id}
                      className={`group p-4 transition-all duration-200 hover:bg-white ${
                        isVendorSelected(vendor._id!)
                          ? "border-l-4 border-l-C_5EBE76 bg-C_5EBE76/5"
                          : ""
                      }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`size-3 rounded-full ${
                                isVendorSelected(vendor._id!)
                                  ? "bg-C_5EBE76"
                                  : "bg-C_DEDEDE"
                              }`}></div>
                            <div className={VENDOR_SELECTOR_STYLES.VENDOR_NAME}>
                              {vendor.name}
                            </div>
                            {isVendorSelected(vendor._id!) && (
                              <span className="rounded-full bg-C_5EBE76/10 px-2 py-1 text-xs font-medium text-C_5EBE76">
                                Selected
                              </span>
                            )}
                          </div>

                          <div className="ml-6 space-y-2">
                            <div className="flex items-center gap-2">
                              <svg
                                className="size-4 text-C_8F8F8F"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span className="text-sm text-C_6E6E6E">
                                {VENDOR_SELECTOR_LABELS.CITIES_LABEL}{" "}
                                {vendor.cities
                                  ?.map((c) => c.name)
                                  ?.join(", ") || "No cities"}
                              </span>
                            </div>

                            {vendor.description && (
                              <div className="text-sm leading-relaxed text-C_8F8F8F">
                                {vendor.description}
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-xs text-C_8F8F8F">
                              {vendor.contactNumber && (
                                <div className="flex items-center gap-1">
                                  <svg
                                    className="size-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                  <span>{vendor.contactNumber}</span>
                                </div>
                              )}
                              {vendor.email && (
                                <div className="flex items-center gap-1">
                                  <svg
                                    className="size-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>{vendor.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleVendorToggle(vendor._id!)}
                          className={`ml-4 rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                            isVendorSelected(vendor._id!)
                              ? "bg-C_EA241D text-white hover:scale-105 hover:bg-C_D70000 hover:shadow-lg"
                              : "bg-C_5EBE76 text-white hover:scale-105 hover:bg-C_309B5F hover:shadow-lg"
                          }`}>
                          {isVendorSelected(vendor._id!)
                            ? VENDOR_SELECTOR_LABELS.REMOVE_BUTTON
                            : VENDOR_SELECTOR_LABELS.ADD_BUTTON}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="flex items-start gap-2">
          {city ? (
            <div className="text-sm text-C_5EBE76">
              {`${VENDOR_SELECTOR_LABELS.HELP_TEXT_CITY} ${city}`}
            </div>
          ) : (
            <div className="text-sm text-C_8F8F8F">
              {VENDOR_SELECTOR_LABELS.HELP_TEXT_NO_CITY}
            </div>
          )}
        </div>
      </div>
    </InputContainer>
  );
};
