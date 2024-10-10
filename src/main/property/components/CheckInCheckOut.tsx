import { FormInputErrorMessage } from "@/common/components/atoms/FormInputErrorMessage";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./PropertyForm";
import { TimeDropdown } from "./TimeDropdown";

export const CheckInCheckOut = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<FormValues>();
  return (
    <div className="flex w-full flex-col justify-between gap-[0.62rem] md:flex-row">
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <InputContainer error="" inputLabel="Check-in" isMandatory>
            <input
              type="text"
              placeholder="Enter time here, e.g., 4:00"
              {...register("checkIn.time")}
            />
          </InputContainer>
          <TimeDropdown
            name="checkIn.period"
            placeholder="Select Check-in Time"
          />
        </div>
        {errors && (
          <FormInputErrorMessage
            text={errors.checkIn?.time?.message as string}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <InputContainer error="" inputLabel="Check-out" isMandatory>
            <input
              type="text"
              placeholder="Enter time here, e.g., 4:00"
              {...register("checkOut.time")}
            />
          </InputContainer>
          <TimeDropdown
            name="checkOut.period"
            placeholder="Select Check-out Time"
          />
        </div>
        {errors && (
          <FormInputErrorMessage
            text={errors?.checkOut?.time?.message as string}
          />
        )}
      </div>
    </div>
  );
};
