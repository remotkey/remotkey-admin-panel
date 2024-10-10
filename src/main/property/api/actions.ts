"use server";

import {
  deleteFetcher,
  postFetcherWithFormData,
  putFetcherWithFormData,
} from "@/common/fetchers";
import { revalidatePath } from "next/cache";

export const createPropertyApi = async (formData: FormData) => {
  const response = await postFetcherWithFormData("/property", formData);

  revalidatePath("/dashboard");

  return {
    data: response.data,
    message: response.message,
    code: response.code,
  };
};

export const updatePropertyApi = async (formData: FormData) => {
  const response = await putFetcherWithFormData(`/property`, formData);

  revalidatePath("/dashboard");

  return {
    data: response.data,
    message: response.message,
    code: response.code,
  };
};

export const deletePropertyApi = async (id: string) => {
  const { data, message, code } = await deleteFetcher(`/property?id=${id}`);

  revalidatePath("/dashboard");
  return {
    data,
    message,
    code,
  };
};
