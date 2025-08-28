"use client";

import { SwitchButton } from "@/common/components/atoms/buttons/SwitchButton";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { UploadImage } from "@/common/components/atoms/UploadImage";
import { ConfirmationDialog } from "@/common/components/molecules/ConfirmationDialog";
import { CityAutoCompleteInput } from "@/main/property/components/CityAutoCompleteInput";
import { Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
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
import { VendorSelector } from "./VendorSelector";

export interface FormValues {
  id?: string;
  location: LatLng;
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
  qrCodeGenerated: boolean;
  vendors: string[];
}

export const PropertyForm = ({ data }: { data?: any }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      id: data?._id || "",
      name: data?.name || "",
      bookingPageLink: data?.bookingPageLink || "",
      city: data?.city || "",
      thankYouText: data?.thankYouText || "",
      location: {
        lat: data?.location?.lat || 0,
        lng: data?.location?.lng || 0,
        place: data?.location?.place || "",
      },
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
      qrCodeGenerated: false,
      vendors: data?.vendors || [],
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
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    setValue("uploadedFile", file);
  };

  const handleQrGeneration = useCallback(
    (value: boolean) => {
      setQrCodeGenerated(value);
      setValue("qrCodeGenerated", value);
    },
    [setValue]
  );

  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openConfirmDialog = (formData: FormValues) => {
    setFormValues(formData);
    setConfirmDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmUpdate = async () => {
    if (!formValues) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ ...formValues }));
      if (uploadedFile) formData.append("thumbnail", uploadedFile);
      formData.append("qrCodeGenerated", qrCodeGenerated ? "true" : "false");
      const response = await updatePropertyApi(formData);
      if (response.code === 0) {
        toast.error(response?.message || "An unexpected error occurred");
      } else {
        toast.success(response?.message || "Property updated successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      handleCloseDialog();
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const thumbnail = uploadedFile;
      if (!data && !thumbnail) {
        toast.error("Please upload a thumbnail image");
        setIsLoading(false);
        return;
      }

      if (data?.id) {
        if (qrCodeGenerated) {
          openConfirmDialog(data);
        } else {
          const formData = new FormData();
          formData.append("data", JSON.stringify({ ...data }));
          if (thumbnail) formData.append("thumbnail", thumbnail);
          formData.append(
            "qrCodeGenerated",
            qrCodeGenerated ? "true" : "false"
          );
          const response = await updatePropertyApi(formData);
          if (response.code === 0) {
            toast.error(response?.message || "An unexpected error occurred");
          } else {
            toast.success(response?.message || "Property updated successfully");
            router.push("/dashboard");
          }
        }
      } else {
        const formData = new FormData();
        formData.append("data", JSON.stringify({ ...data }));
        if (thumbnail) formData.append("thumbnail", thumbnail);
        formData.append("qrCodeGenerated", qrCodeGenerated ? "true" : "false");
        const response = await createPropertyApi(formData);
        if (response.code === 0) {
          toast.error(response?.message || "An unexpected error occurred");
        } else {
          toast.success(response?.message || "Property added successfully");
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
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
              {field?.type === "textarea" ? (
                <Textarea
                  className="block w-full  rounded-lg border-none"
                  placeholder="Type here..."
                  rows={3}
                  {...register(field.name)}
                />
              ) : field?.type === "cityInput" ? (
                <CityAutoCompleteInput name="city" />
              ) : (
                <input
                  type="text"
                  {...register(field.name)}
                  placeholder={field.placeholder}
                />
              )}
            </InputContainer>
          ))}
          <VendorSelector name="vendors" label="Vendors" />
          <CheckInCheckOut />
          <UspContainer />
          <HouseRules />
          <AutoCompleteInput />
          <GoogleMap />
          <UploadImage
            oldThumbnail={data?.thumbnail}
            onFilesChange={handleFileChange}
          />
          {data && (
            <>
              <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                handleClose={handleCloseDialog}
                onConfirm={handleConfirmUpdate}
                isLoading={isLoading}>
                <div className="-mb-6 flex flex-col gap-2">
                  Are you sure you want to update this property?
                  <span className="whitespace-nowrap text-[0.7rem] text-C_EA241D">
                    * The existing QR code will be replaced with a new one.
                  </span>
                </div>
              </ConfirmationDialog>
              <SwitchButton onChange={handleQrGeneration} id={data?._id} />
            </>
          )}
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
