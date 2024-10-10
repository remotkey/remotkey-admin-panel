import { SubmitButtonProps } from "@/common/interfaces";
import { COLOR_PALETTE } from "@/common/theme/colors";
import { PiSpinnerBold } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export const SubmitButton = ({
  isSubmitting,
  children,
  className,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={twMerge(
        "w-full rounded-lg py-2 text-white",
        !isSubmitting ? "bg-C_5EBE76" : "bg-gray-400",
        className
      )}
      disabled={isSubmitting}>
      {isSubmitting ? (
        <PiSpinnerBold
          className="animate-spin"
          color={COLOR_PALETTE.C_FFFFFF}
        />
      ) : (
        ""
      )}
      {children}
    </button>
  );
};
