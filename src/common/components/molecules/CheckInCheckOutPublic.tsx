"use client";

import { Icon } from "@/lib/next-image/Icon";
import { InputContainer } from "../atoms/InputContainer";
import { TimeDropdown } from "@/main/property/components/TimeDropdown";
import { FormProvider, useForm } from "react-hook-form";
import * as v from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitButton } from "../atoms/SubmitButton";
import { FormInputErrorMessage } from "../atoms/FormInputErrorMessage";
import toast from "react-hot-toast";
import { createPropertyCheckoutTime } from "@/main/checkout-time/api/actions";

interface FormValues {
  checkOut: {
    time: string;
    period: string;
  };
}

const checkOutSchema = v.object({
  checkOut: v.object({
    time: v.pipe(v.string(), v.nonEmpty("Please enter check out time.")),
    period: v.pipe(v.string(), v.nonEmpty("Please enter check out period.")),
  }),
});

export const CheckInCheckOutPublic = ({
  checkOut,
  propertyId,
}: {
  checkOut: string;
  propertyId: string;
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      checkOut: {
        time: "",
        period: "",
      },
    },
    resolver: valibotResolver(checkOutSchema),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = methods;

  const onSubmit = async (data: FormValues) => {
    const formData = {
      propertyId,
      checkOut: {
        time: data?.checkOut?.time,
        period: data?.checkOut?.period,
      },
    };

    const response = await createPropertyCheckoutTime({ formData });

    if (response?.code !== 1) {
      toast.error(response?.message || "An unexpected error occurred");
      return;
    }

    toast.success(
      "Thank you! We've received your late check-out request. Our team will reach out to you before the scheduled check-out time"
    );
  };

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:divide-x">
      <div className="flex items-center gap-4">
        <Icon
          src="/icons/checkOut.svg"
          alt="Checkout Icon"
          width={32}
          height={30}
        />
        <div className="flex flex-col text-black">
          <div className="whitespace-nowrap text-lg font-bold">
            Our check-out time
          </div>
          <div className="text-sm">{checkOut}</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 pl-0 sm:pl-5 md:flex-row">
        <span className="text-sm text-black">
          Need a late check-out? Please ask, and we will do our best to
          accommodate you!
        </span>
        <div className="flex flex-col gap-2">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-4">
              <InputContainer childClassName="py-[0.75rem]" isMandatory>
                <input
                  type="text"
                  placeholder="Enter time, e.g., 4:00"
                  {...register("checkOut.time")}
                />
              </InputContainer>
              <TimeDropdown
                name="checkOut.period"
                placeholder="Select Time Period"
                childClassName="mt-0 py-[0.75rem]"
              />
              <SubmitButton
                className="flex w-1/2 items-center justify-center gap-1 whitespace-nowrap rounded-r_08125 px-2 py-3 md:px-0"
                isSubmitting={isSubmitting}>
                Submit
              </SubmitButton>
            </form>
          </FormProvider>
          {errors.checkOut?.time?.message && (
            <FormInputErrorMessage text={errors?.checkOut?.time?.message} />
          )}
        </div>
      </div>
    </div>
  );
};
