"use server";

import { getFetcher } from "@/common/fetchers";
import {
  ApiResponseInterface,
  IdNameProps,
  SearchFiltersParamsTypes,
} from "@/common/interfaces";
import { VendorInterface } from "@/main/property/interfaces";

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
