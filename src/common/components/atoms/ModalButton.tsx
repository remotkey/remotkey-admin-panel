import { ImSpinner8 } from "react-icons/im";
import { twMerge } from "tailwind-merge";
interface ModalButtonProps {
  text: string;
  onClick?: () => void;
  hasBgRed?: boolean;
  isLoading?: boolean;
}

export const ModalButton = ({
  text,
  onClick,
  hasBgRed,
  isLoading,
}: ModalButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `font_med_8 flex w-full items-center justify-center gap-2 rounded-r_08125 border border-C_309B5F px-4 py-[0.88rem] uppercase`,
        hasBgRed ? "bg-C_309B5F text-white" : ""
      )}>
      {isLoading && <ImSpinner8 className="animate-spin" />}
      {text}
    </button>
  );
};
