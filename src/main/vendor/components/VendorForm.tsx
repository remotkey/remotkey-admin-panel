"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { VendorInterface } from "@/main/property/interfaces";
import { Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { VendorSchema } from "../api/validations";
import { VENDOR_FORM_FIELDS } from "../constants";
import { CityAutoCompleteInput } from "./CityAutoCompleteInput";

export const VendorForm = ({ data }: { data: VendorInterface }) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VendorInterface>({
    defaultValues: {
      _id: data?._id || "",
      name: data?.name || "",
      cities: data?.cities || [],
      description: data?.description || "",
      website: data?.website || "",
      contactNumber: data?.contactNumber || "",
      email: data?.email || "",
    },
    resolver: valibotResolver(VendorSchema),
  });

  const {
    formState: { errors, isSubmitting },
    register,
  } = methods;

  const onSubmit = async (data: VendorInterface) => {
    if (isLoading) return;
    setIsLoading(true);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          {VENDOR_FORM_FIELDS?.map((field) => (
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
          <CityAutoCompleteInput />
          <SubmitButton
            className={`flex w-fit items-center justify-center gap-1 !rounded-lg px-6 py-2 ${!isSubmitting && "border border-C_5EBE76"}`}
            isSubmitting={isSubmitting}>
            Save Vendor
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
