"use server";

import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from "@/common/fetchers";
import {
  ApiResponseInterface,
  IdNameProps,
  SearchFiltersParamsTypes,
} from "@/common/interfaces";
import { VendorInterface } from "@/main/property/interfaces";
import { revalidatePath } from "next/cache";
import Property from "@/model/property/Property";
import { connect } from "@/lib/dbConnect";

// Connect to database
connect();

// Function to auto-link vendor to properties in selected cities
const autoLinkVendorToProperties = async (
  vendorId: string,
  cities: Array<{ name: string }>
) => {
  try {
    const cityNames = cities?.map((city) => city?.name)?.filter(Boolean) || [];

    if (cityNames.length === 0) {
      console.log("No valid city names found for auto-linking");
      return;
    }

    // Find all properties in the selected cities
    const properties = await Property.find({
      city: { $in: cityNames },
    });

    if (!properties || properties.length === 0) {
      console.log(`No properties found in cities: ${cityNames.join(", ")}`);
      return;
    }

    // Update each property to include this vendor ID
    const updatePromises = properties.map(async (property: any) => {
      // Check if vendor is already linked to avoid duplicates
      if (property?.vendors && !property.vendors.includes(vendorId)) {
        property.vendors.push(vendorId);
        await property.save();
      }
    });

    await Promise.all(updatePromises);

    console.log(
      `Successfully linked vendor ${vendorId} to ${properties.length} properties in cities: ${cityNames.join(", ")}`
    );

    // Revalidate property pages
    revalidatePath("/property");
  } catch (error) {
    console.error("Error auto-linking vendor to properties:", error);
    throw new Error("Failed to auto-link vendor to properties");
  }
};

// Function to remove vendor links from properties when cities are removed
const removeVendorFromProperties = async (
  vendorId: string,
  cities: Array<{ name: string }>
) => {
  try {
    const cityNames = cities?.map((city) => city?.name)?.filter(Boolean) || [];

    if (cityNames.length === 0) {
      return;
    }

    // Find all properties in the selected cities
    const properties = await Property.find({
      city: { $in: cityNames },
    });

    if (!properties || properties.length === 0) {
      return;
    }

    // Remove vendor ID from each property
    const updatePromises = properties.map(async (property: any) => {
      if (property?.vendors) {
        property.vendors = property.vendors.filter(
          (id: string) => id !== vendorId
        );
        await property.save();
      }
    });

    await Promise.all(updatePromises);

    console.log(
      `Successfully removed vendor ${vendorId} from properties in cities: ${cityNames.join(", ")}`
    );

    // Revalidate property pages
    revalidatePath("/property");
  } catch (error) {
    console.error("Error removing vendor from properties:", error);
    throw new Error("Failed to remove vendor from properties");
  }
};

// Function to completely remove vendor from all properties
const removeVendorFromAllProperties = async (vendorId: string) => {
  try {
    // Find all properties that reference this vendor
    const properties = await Property.find({
      vendors: vendorId,
    });

    if (!properties || properties.length === 0) {
      console.log(`No properties found referencing vendor ${vendorId}`);
      return;
    }

    // Remove vendor ID from each property
    const updatePromises = properties.map(async (property: any) => {
      if (property?.vendors) {
        property.vendors = property.vendors.filter(
          (id: string) => id !== vendorId
        );
        await property.save();
      }
    });

    await Promise.all(updatePromises);

    console.log(
      `Successfully removed vendor ${vendorId} from ${properties.length} properties`
    );

    // Revalidate property pages
    revalidatePath("/property");
  } catch (error) {
    console.error("Error removing vendor from all properties:", error);
    throw new Error("Failed to remove vendor from all properties");
  }
};

export const getVendors = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}): Promise<ApiResponseInterface<VendorInterface[]>> => {
  const { data, message, code } = await getFetcher("/vendor", params);
  return {
    data: data || [],
    message: message || "",
    code: code || 0,
  };
};

export const getCities = async ({
  params,
}: {
  params?: SearchFiltersParamsTypes;
}): Promise<ApiResponseInterface<IdNameProps[]>> => {
  const { data, message, code } = await getFetcher("/city", params);

  return {
    data: data || [],
    message: message || "",
    code: code || 0,
  };
};

export const deleteVendorApi = async (id: string) => {
  if (!id) {
    throw new Error("Vendor ID is required");
  }

  const { data, message, code } = await deleteFetcher(`/vendor?id=${id}`);

  revalidatePath("/vendor");

  return {
    data: data || null,
    message: message || "",
    code: code || 0,
  };
};

export const getVendorById = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponseInterface<VendorInterface>> => {
  if (!id) {
    throw new Error("Vendor ID is required");
  }

  const { data, message, code } = await getFetcher(`/vendor?_id=${id}`);

  return {
    data: data || null,
    message: message || "",
    code: code || 0,
  };
};

export const createVendorApi = async (
  vendorData: Omit<VendorInterface, "_id" | "createdAt">,
  autoLinkToProperties: boolean = false
) => {
  if (!vendorData?.name) {
    throw new Error("Vendor name is required");
  }

  const { data, message, code } = await postFetcher("/vendor", vendorData);

  // Auto-link vendor to properties if enabled
  if (autoLinkToProperties && data?._id && vendorData?.cities?.length > 0) {
    try {
      await autoLinkVendorToProperties(data._id, vendorData.cities);
    } catch (error) {
      console.error("Auto-linking failed:", error);
      // Don't fail the vendor creation if auto-linking fails
    }
  }

  revalidatePath("/vendors");

  return {
    data: data || null,
    message: message || "",
    code: code || 0,
  };
};

export const updateVendorApi = async (
  vendorData: VendorInterface,
  autoLinkToProperties: boolean = false
) => {
  if (!vendorData?._id) {
    throw new Error("Vendor ID is required for updates");
  }

  // Get the existing vendor to compare cities
  const existingVendor = await getFetcher(`/vendor?_id=${vendorData._id}`);

  const { data, message, code } = await putFetcher("/vendor", vendorData);

  // Handle auto-linking for updates
  if (autoLinkToProperties && data?._id) {
    try {
      if (existingVendor?.data?.cities && vendorData?.cities) {
        // Find cities that were removed
        const removedCities = existingVendor.data.cities.filter(
          (existingCity: any) =>
            !vendorData.cities?.some(
              (newCity: any) => newCity?.name === existingCity?.name
            )
        );

        // Remove vendor from properties in removed cities
        if (removedCities.length > 0) {
          await removeVendorFromProperties(data._id, removedCities);
        }

        // Add vendor to properties in new cities
        if (vendorData.cities.length > 0) {
          await autoLinkVendorToProperties(data._id, vendorData.cities);
        }
      }
    } catch (error) {
      console.error("Auto-linking update failed:", error);
      // Don't fail the vendor update if auto-linking fails
    }
  }

  revalidatePath("/vendors");

  return {
    data: data || null,
    message: message || "",
    code: code || 0,
  };
};

export const getVendorsByPropertyId = async ({
  propertyId,
}: {
  propertyId: string;
}): Promise<ApiResponseInterface<VendorInterface[]>> => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const { data, message, code } = await getFetcher(
    `/vendor?propertyId=${propertyId}`
  );

  return {
    data: data || [],
    message: message || "",
    code: code || 0,
  };
};
