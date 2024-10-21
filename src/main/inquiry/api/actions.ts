"use server";
import { getFetcher, postFetcher } from "@/common/fetchers";
import {
  ApiResponseInterface,
  SearchFiltersParamsTypes,
} from "@/common/interfaces";
import { InquiryInterface } from "@/model/inquiry/Inquiry";

export const createInquiry = async ({
  InquiryData,
}: {
  InquiryData: InquiryInterface;
}): Promise<ApiResponseInterface<null>> => {
  const { data, message, code } = await postFetcher("/inquiry", InquiryData);

  return {
    data,
    message,
    code,
  };
};

export const getInquiries = async ({
  params,
}: {
  params: SearchFiltersParamsTypes;
}): Promise<ApiResponseInterface<null>> => {
  const { data, message, code } = await getFetcher("/inquiry", params);

  return {
    data,
    message,
    code,
  };
};
