import { Icon } from "@/lib/next-image/Icon";
import { ReactNode } from "react";
import { FormInputErrorMessage } from "./FormInputErrorMessage";
import { twMerge } from "tailwind-merge";

export interface InputContainerProps {
  inputLabel?: string;
  isMandatory?: boolean;
  children: ReactNode;
  childClassName?: string;
  parentClassName?: string;
  error?: string | undefined;
  icon?: string;
  isFocused?: boolean;
  alt?: string;
}
export const InputContainer = ({
  parentClassName,
  childClassName,
  children,
  isMandatory,
  inputLabel,
  error,
  icon,
  isFocused,
  alt,
}: InputContainerProps) => {
  return (
    <>
      <div
        className={twMerge(
          `flex w-full flex-col gap-[0.62rem]`,
          parentClassName
        )}>
        {inputLabel && (
          <label className="font_med_8 relative w-fit !whitespace-nowrap text-black">
            {inputLabel}
            {isMandatory && (
              <span className="ml-1 text-sm font-medium text-red-500">*</span>
            )}
          </label>
        )}
        <div
          className={twMerge(
            "flex items-center gap-2.5 rounded-r_08125 border px-4 py-[0.88rem]",
            isFocused ? "border-C_5EBE76" : "border-C_DEDEDE",
            childClassName
          )}>
          {icon && (
            <div className="relative size-6">
              <Icon src={icon} alt={alt || ""} width={24} height={24} />
            </div>
          )}
          {children}
        </div>
      </div>
      {error && <FormInputErrorMessage text={error} />}
    </>
  );
};
