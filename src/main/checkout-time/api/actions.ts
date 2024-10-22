"use server";

import { getFetcher, postFetcher } from "@/common/fetchers";
import {
  ApiResponseInterface,
  SearchFiltersParamsTypes,
} from "@/common/interfaces";
import { TimePeriod } from "@/main/property/interfaces";

export interface PropertyCheckOutTimeInterface {
  propertyId: string;
  checkOut: TimePeriod;
}

export const createPropertyCheckoutTime = async ({
  formData,
}: {
  formData: PropertyCheckOutTimeInterface;
}): Promise<ApiResponseInterface<null>> => {
  const { data, code, message } = await postFetcher("/checkout-time", formData);

  return {
    data,
    code,
    message,
  };
};

export const getPropertyCheckoutTime = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}) => {
  const { data, code, message, meta } = await getFetcher(
    "/checkout-time",
    params
  );

  return {
    data,
    meta,
    code,
    message,
  };
};
