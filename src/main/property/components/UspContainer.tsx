import { FormInputErrorMessage } from "@/common/components/atoms/FormInputErrorMessage";
import { InputContainer } from "@/common/components/atoms/InputContainer";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ActionButtonWithIcon } from "./ActionButtonWithIcon";
import { FormValues } from "./PropertyForm";
import toast from "react-hot-toast";

export const UspContainer = () => {
  const {
    control,
    formState: { errors },
    register,
    getValues,
  } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "usp",
  });

  const handleDeleteInput = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAddInput = () => {
    const { usp } = getValues();
    const lastInputValue = usp[usp.length - 1]?.value || "";

    if (!lastInputValue.trim()) {
      toast.error(
        "Please fill out the last USP field before adding a new one."
      );
      return;
    }
    append({ value: "" });
  };

  return (
    <>
      <label className="font_med_8 relative w-fit text-black">
        Unique Selling Points
        <span className="ml-1 text-sm font-medium text-red-500">*</span>
      </label>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <>
            <div
              key={field.id}
              className="flex items-center justify-center gap-[0.62rem]">
              <InputContainer error="" icon="/icons/rightCheck.svg">
                <input
                  type="text"
                  {...register(`usp.${index}.value`)}
                  placeholder="Enter Key point here..."
                />
              </InputContainer>
              {index === fields.length - 1 ? (
                <ActionButtonWithIcon text="Add" onClick={handleAddInput} />
              ) : (
                <ActionButtonWithIcon
                  hasIcon
                  icon="/icons/delete.svg"
                  onClick={() => handleDeleteInput(index)}
                />
              )}
            </div>
            {errors?.usp?.[index]?.value && (
              <FormInputErrorMessage
                text={errors?.usp?.[index]?.value?.message}
              />
            )}
          </>
        ))}
      </div>
      {errors?.usp && <FormInputErrorMessage text={errors?.usp?.message} />}
    </>
  );
};
