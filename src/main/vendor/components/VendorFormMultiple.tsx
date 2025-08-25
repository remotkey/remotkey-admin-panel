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
import { createVendorApi, updateVendorApi } from "../api/actions";
import { VendorSchema } from "../api/validations";
import {
  VENDOR_BUTTON_TEXT,
  VENDOR_FORM_FIELDS,
  VENDOR_FORM_LABELS,
  VENDOR_FORM_STYLES,
  VENDOR_ROUTES,
} from "../constants";
import { VendorLocationSelector } from "./VendorLocationSelector";
import { CardCheckBox } from "@/common/components/atoms/CardCheckBox";

interface VendorsFormValues {
  vendors: VendorInterface[];
  autoLinkToProperties: boolean;
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
      autoLinkToProperties: false,
    },
    resolver: valibotResolver(
      v.object({
        vendors: v.array(VendorSchema),
        autoLinkToProperties: v.optional(v.boolean()),
      })
    ),
  });

  const {
    formState: { errors, isSubmitting, isValid },
    register,
    control,
    watch,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vendors",
  });

  const autoLinkToProperties = watch("autoLinkToProperties");

  const onSubmit = async (formData: VendorsFormValues) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const vendorDataArray = formData?.vendors || [];

      if (!vendorDataArray || vendorDataArray.length === 0) {
        throw new Error("No vendor data found");
      }

      if (data?._id) {
        // Update existing vendor - only one vendor for updates
        const vendorData = vendorDataArray[0];
        await updateVendorApi(
          {
            _id: data._id,
            ...vendorData,
          },
          formData?.autoLinkToProperties || false
        );
      } else {
        // Create multiple vendors - process all vendors in the array
        const createPromises = vendorDataArray?.map(async (vendorData) => {
          if (
            vendorData?.name &&
            vendorData?.cities &&
            vendorData?.cities?.length > 0
          ) {
            return await createVendorApi(
              vendorData,
              formData?.autoLinkToProperties || false
            );
          }
        });

        // Wait for all vendors to be created
        await Promise.all(createPromises.filter(Boolean));
      }

      // Redirect to vendors page or show success message
      window.location.href = VENDOR_ROUTES.VENDORS_LIST;
    } catch (error) {
      console.error("Error submitting vendor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={VENDOR_FORM_STYLES.CONTAINER}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={twMerge(
                !data
                  ? VENDOR_FORM_STYLES.FIELD_CONTAINER
                  : VENDOR_FORM_STYLES.FIELD_CONTAINER_WITH_DATA
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
                      placeholder={VENDOR_FORM_LABELS.TYPE_HERE}
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
                inputLabel={VENDOR_FORM_LABELS.CITIES_AND_LOCATIONS}
                error={errors.vendors?.[index]?.cities?.message}
                isMandatory>
                <VendorLocationSelector
                  key={`${field.id}-cities`}
                  name={`vendors.${index}.cities`}
                  isMandatory
                  defaultValue={field.cities || []}
                />
              </InputContainer>

              {/* Auto-link to properties checkbox */}
              <div className="flex items-center gap-3">
                <CardCheckBox
                  checked={autoLinkToProperties}
                  onChange={() =>
                    methods.setValue(
                      "autoLinkToProperties",
                      !autoLinkToProperties
                    )
                  }
                />
                <div className="flex flex-col">
                  <label className="cursor-pointer text-sm font-medium text-C_002E2E">
                    {VENDOR_FORM_LABELS.AUTO_LINK_LABEL}
                  </label>
                  <p className="text-xs text-C_6E6E6E">
                    {VENDOR_FORM_LABELS.AUTO_LINK_DESCRIPTION}
                  </p>
                </div>
              </div>

              {fields?.length > 1 && (
                <button
                  type="button"
                  className="absolute right-2 top-2 text-red-500"
                  onClick={() => remove(index)}>
                  {VENDOR_BUTTON_TEXT.REMOVE}
                </button>
              )}
            </div>
          ))}

          {!data && (
            <Button
              isDisabled={!isValid}
              hasBgColor
              className="w-fit"
              text={VENDOR_BUTTON_TEXT.ADD_VENDOR}
              onClick={() => {
                if (isValid) {
                  // Clear any existing form errors before adding new vendor
                  methods.clearErrors();
                  append({
                    _id: "",
                    name: "",
                    cities: [],
                    description: "",
                    website: "",
                    contactNumber: "",
                    email: "",
                  });
                }
              }}
            />
          )}
          <DevTool control={control} />
          <SubmitButton
            className={`${VENDOR_FORM_STYLES.SUBMIT_BUTTON} ${
              !isSubmitting && VENDOR_FORM_STYLES.SUBMIT_BUTTON_BORDER
            }`}
            isSubmitting={isSubmitting}>
            {VENDOR_BUTTON_TEXT.SAVE_VENDORS}
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
