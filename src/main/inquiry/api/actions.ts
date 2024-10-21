"use server";
import { postFetcher } from "@/common/fetchers";
import { ApiResponseInterface } from "@/common/interfaces";
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
