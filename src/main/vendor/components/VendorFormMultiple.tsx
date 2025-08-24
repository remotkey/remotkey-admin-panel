"use client";

import { Button } from "@/common/components/atoms/Button";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { VendorInterface } from "@/main/property/interfaces";
import { Textarea } from "@headlessui/react";
import { DevTool } from "@hookform/devtools";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import * as v from "valibot";
import { VendorSchema } from "../api/validations";
import { VENDOR_FORM_FIELDS } from "../constants";
import { CityAutoCompleteInput } from "./CityAutoCompleteInput";

interface VendorsFormValues {
  vendors: VendorInterface[];
}

export const VendorFormMultiple = ({ data }: { data?: VendorInterface }) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VendorsFormValues>({
    defaultValues: {
      vendors: [
        data
          ? {
              _id: data?._id || "",
              name: data?.name || "",
              cities: data?.cities || [],
              description: data?.description || "",
              website: data?.website || "",
              contactNumber: data?.contactNumber || "",
              email: data?.email || "",
            }
          : {
              name: "",
              cities: [],
              description: "",
              website: "",
              contactNumber: "",
              email: "",
            },
      ],
    },
    resolver: valibotResolver(v.object({ vendors: v.array(VendorSchema) })),
  });

  const {
    formState: { errors, isSubmitting, isValid },
    register,
    control,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vendors",
  });

  const onSubmit = async (formData: VendorsFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      console.log("Submitting vendors:", formData);
      // send to API
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={twMerge(
                !data && "relative flex flex-col gap-5 rounded-lg border p-4"
              )}>
              {VENDOR_FORM_FIELDS.map((f) => (
                <InputContainer
                  key={f.name}
                  inputLabel={f.label}
                  error={errors.vendors?.[index]?.[f.name]?.message}
                  isMandatory={f.isMandatory || false}>
                  {f.type === "textarea" ? (
                    <Textarea
                      className="block w-full resize-none rounded-lg border-none"
                      placeholder="Type here..."
                      rows={3}
                      {...register(`vendors.${index}.${f.name}` as const)}
                    />
                  ) : (
                    <input
                      type="text"
                      {...register(`vendors.${index}.${f.name}` as const)}
                      placeholder={f.placeholder}
                    />
                  )}
                </InputContainer>
              ))}

              <InputContainer
                inputLabel="Cities"
                error={errors.vendors?.[index]?.cities?.message}
                isMandatory>
                <CityAutoCompleteInput
                  name={`vendors.${index}.cities`}
                  isMultipleSelect
                  defaultValue={field.cities || []}
                />
              </InputContainer>

              {fields?.length > 1 && (
                <button
                  type="button"
                  className="absolute right-2 top-2 text-red-500"
                  onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}

          {!data && (
            <Button
              isDisabled={!isValid}
              hasBgColor
              className="w-fit"
              text="+ Add Vendor"
              onClick={() =>
                isValid &&
                append({
                  _id: "",
                  name: "",
                  cities: [],
                  description: "",
                  website: "",
                  contactNumber: "",
                  email: "",
                })
              }
            />
          )}
          <DevTool control={control} />
          <SubmitButton
            className={`flex w-fit items-center justify-center gap-1 !rounded-lg px-6 py-2 ${
              !isSubmitting && "border border-C_5EBE76"
            }`}
            isSubmitting={isSubmitting}>
            Save Vendors
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
