"use client";

import { InputContainer } from "@/common/components/atoms/InputContainer";
import { SubmitButton } from "@/common/components/atoms/SubmitButton";
import { VendorInterface } from "@/main/property/interfaces";
import { Textarea } from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { array } from "valibot";
import { VendorSchema } from "../api/validations";
import { VENDOR_FORM_FIELDS } from "../constants";
import { CityAutoCompleteInput } from "./CityAutoCompleteInput";

interface VendorsFormValues {
  vendors: VendorInterface[];
}

export const VendorForm = ({ data }: { data?: VendorInterface }) => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<VendorsFormValues>({
    defaultValues: {
      vendors: [
        data || {
          _id: "",
          name: "",
          cities: [],
          description: "",
          website: "",
          contactNumber: "",
          email: "",
        },
      ],
    },
    resolver: valibotResolver(array(VendorSchema)),
  });

  const {
    formState: { errors, isSubmitting },
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
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative flex flex-col gap-5 rounded-lg border p-4">
              {VENDOR_FORM_FIELDS?.map((f) => (
                <InputContainer
                  key={f.name}
                  error={errors.vendors?.[index]?.[f.name]?.message}
                  inputLabel={f.label}
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
              <CityAutoCompleteInput />
              {fields.length > 1 && (
                <button
                  type="button"
                  className="absolute right-2 top-2 text-red-500"
                  onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-fit rounded-lg border px-4 py-2"
            onClick={() =>
              append({
                _id: "",
                name: "",
                cities: [],
                description: "",
                website: "",
                contactNumber: "",
                email: "",
              })
            }>
            + Add Vendor
          </button>
          <SubmitButton
            className={`flex w-fit items-center justify-center gap-1 !rounded-lg px-6 py-2 ${!isSubmitting && "border border-C_5EBE76"}`}
            isSubmitting={isSubmitting}>
            Save Vendors
          </SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
};
