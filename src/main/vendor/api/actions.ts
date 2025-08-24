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

export const getVendors = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}): Promise<ApiResponseInterface<VendorInterface[]>> => {
  const { data, message, code } = await getFetcher("/vendor", params);
  return {
    data,
    message,
    code,
  };
};

export const getCities = async ({
  params,
}: {
  params?: SearchFiltersParamsTypes;
}): Promise<ApiResponseInterface<IdNameProps[]>> => {
  const { data, message, code } = await getFetcher("/city", params);

  return {
    data,
    message,
    code,
  };
};

export const deleteVendorApi = async (id: string) => {
  const { data, message, code } = await deleteFetcher(`/vendor?id=${id}`);

  revalidatePath("/vendor");

  return {
    data,
    message,
    code,
  };
};

export const getVendorById = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponseInterface<VendorInterface>> => {
  const { data, message, code } = await getFetcher(`/vendor?_id=${id}`);

  return {
    data,
    message,
    code,
  };
};

export const createVendorApi = async (
  vendorData: Omit<VendorInterface, "_id" | "createdAt">
) => {
  const { data, message, code } = await postFetcher("/vendor", vendorData);

  revalidatePath("/vendors");

  return {
    data,
    message,
    code,
  };
};

export const updateVendorApi = async (vendorData: VendorInterface) => {
  const { data, message, code } = await putFetcher("/vendor", vendorData);

  revalidatePath("/vendors");

  return {
    data,
    message,
    code,
  };
};
