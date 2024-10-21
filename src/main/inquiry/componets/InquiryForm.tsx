import { InputContainer } from "@/common/components/atoms/InputContainer";
import { INQUIRY_FORM_FIELDS } from "../constants";
import { Button } from "@/common/components/atoms/Button";
import { InquiryInterface } from "@/model/inquiry/Inquiry";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { InquirySchema } from "../api/validations/validation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createInquiry } from "../api/actions";
import { ModalButton } from "@/common/components/atoms/ModalButton";
import { Icon } from "@/lib/next-image/Icon";

export const InquiryForm = ({ handleClose }: { handleClose: () => void }) => {
  const methods = useForm<InquiryInterface>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interestedArea: "",
    },
    resolver: valibotResolver(InquirySchema),
  });

  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    register,
  } = methods;

  const onSubmit = async (data: InquiryInterface) => {
    try {
      const InquiryData = {
        ...data,
      };
      const response = await createInquiry({ InquiryData });

      if (response.code !== 1) {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        {!isSubmitSuccessful && (
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mb-[1.88rem] flex min-w-[23.5rem] flex-col gap-[1.44rem] text-C_232323">
              {INQUIRY_FORM_FIELDS?.map((field, index) => (
                <InputContainer
                  childClassName="py-[0.75rem]"
                  key={field.name}
                  inputLabel={field.label}
                  isMandatory={field.isMandatory || false}
                  error={errors[field.name]?.message as string}>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    {...register(field.name)}
                  />
                </InputContainer>
              ))}
            </div>
            <div className="flex justify-start gap-[0.62rem]">
              <ModalButton
                className="flex max-w-fit items-center justify-center gap-[0.31rem] !rounded-r_05 border border-C_5EBE76 bg-C_5EBE76 px-4 py-2 text-white"
                type="submit"
                text="Submit"
                isLoading={isSubmitting}
              />
              <Button
                className="rounded-r_05"
                onClick={handleClose}
                text="Cancel"
              />
            </div>
          </form>
        )}
        {isSubmitSuccessful && (
          <div className="font_med_8 flex flex-col items-center justify-center gap-[0.62rem] text-C_000000">
            <Icon alt="successIcon" src="/icons/successIcon.svg" size={40} />
            <span>
              Thank you for your interest! <br />
              Our team will get back to you in next 24 hours
            </span>
            <ModalButton
              type="button"
              className="flex max-w-fit items-center justify-center gap-[0.31rem] !rounded-r_05 border border-C_5EBE76 bg-C_5EBE76 px-4 py-2 text-white"
              onClick={handleClose}
              text="Close"
            />
          </div>
        )}
      </FormProvider>
    </>
  );
};
