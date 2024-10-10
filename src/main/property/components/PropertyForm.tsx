"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { UploadImage } from "@/common/components/atoms/UploadImage";
import { Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createPropertyApi, updatePropertyApi } from "../api/actions";
import { PropertySchema } from "../api/validations/property";
import { PROPERTY_FORM_FIELDS } from "../constants";
import {
  HouseRulesContainerInterface,
  LatLng,
  TimePeriod,
  UspContainerInterface,
} from "../interfaces";
import { AutoCompleteInput } from "./AutoCompleteInput";
import { CheckInCheckOut } from "./CheckInCheckOut";
import { GoogleMap } from "./GoogleMap";
import { HouseRules } from "./HouseRules";
import { UspContainer } from "./UspContainer";

export interface FormValues {
  id?: string;
  location: string;
  hospitals: LatLng[];
  nearByRestaurants: LatLng[];
  nearByRentals: LatLng[];
  localTours: LatLng[];
  uploadedFile: File | null;
  checkIn: TimePeriod;
  checkOut: TimePeriod;
  usp: UspContainerInterface[];
  houseRules: HouseRulesContainerInterface[];
  name: string;
  city: string;
  bookingPageLink: string;
  thankYouText: string;
}

export const PropertyForm = ({ data }: { data?: any }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      id: data?._id || "",
      name: data?.name || "",
      bookingPageLink: data?.bookingPageLink || "",
      city: data?.city || "",
      thankYouText: data?.thankYouText || "",
      location: data?.location || "",
      nearByRestaurants: data?.nearByRestaurants || [],
      nearByRentals: data?.nearByRentals || [],
      localTours: data?.localTours || [],
      hospitals: data?.hospitals || [],
      checkIn: {
        time: data?.checkIn?.time || "",
        period: data?.checkIn?.period || "",
      },
      checkOut: {
        time: data?.checkOut?.time || "",
        period: data?.checkOut?.period || "",
      },
      usp: data?.usp?.length ? data?.usp : [{ value: "" }],
      houseRules: data?.houseRules?.length ? data?.houseRules : [{ value: "" }],
    },
    resolver: valibotResolver(PropertySchema),
  });
  const {
    formState: { errors, isSubmitting },
    register,
    setValue,
  } = methods;
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    setValue("uploadedFile", file);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const thumbnail = uploadedFile as Blob;
      if (!data && !thumbnail) {
        toast.error("Please upload a thumbnail image");
        return;
      }
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          ...data,
        })
      );
      formData.append("thumbnail", thumbnail);
      if (data?.id) {
        const response = await updatePropertyApi(formData);
        if (response.code === 0) {
          toast.error(response?.message || "An unexpected error occurred");
          return;
        }
        toast.success(response?.message || "Property updated successfully");
        router.push("/dashboard");
      } else {
        const response = await createPropertyApi(formData);
        if (response.code === 0) {
          toast.error(response?.message || "An unexpected error occurred");
          return;
        }
        toast.success(response?.message || "Property added successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          {PROPERTY_FORM_FIELDS?.map((field) => (
            <InputContainer
              key={field.name}
              error={errors[field.name]?.message}
              inputLabel={field.label}
              isMandatory={field.isMandatory || false}>
              {field.type === "textarea" ? (
                <Textarea
                  className="block w-full resize-none rounded-lg border-none"
                  placeholder="Type here..."
                  rows={3}
                  {...register(field.name)}
                />
              ) : (
                <input
                  type="text"
                  {...register(field.name)}
                  placeholder={field.placeholder}
                />
              )}
            </InputContainer>
          ))}
          <CheckInCheckOut />
          <UspContainer />
          <HouseRules />
          <AutoCompleteInput />
          <GoogleMap />
          <UploadImage
            oldThumbnail={data?.thumbnail}
            onFilesChange={handleFileChange}
          />
          <SubmitButton
            className={`flex w-fit items-center justify-center gap-1 !rounded-lg px-6 py-2 ${!isSubmitting && "border border-C_5EBE76"}`}
            isSubmitting={isSubmitting}>
            Save Property
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
