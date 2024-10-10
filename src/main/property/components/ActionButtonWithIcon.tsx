import { Icon } from "@/lib/next-image/Icon";
import { twMerge } from "tailwind-merge";

interface ActionButtonWithIconInterface {
  onClick?: () => void;
  hasIcon?: boolean;
  icon?: string;
  text?: string;
  className?: string;
}

export const ActionButtonWithIcon = ({
  onClick,
  hasIcon,
  icon,
  text,
  className,
}: ActionButtonWithIconInterface) => {
  return (
    <button
      type="button"
      className={twMerge(
        "flex min-w-[4.75rem] items-center justify-center rounded-lg border border-C_5EBE76 px-4 py-[0.88rem] hover:shadow-none",
        hasIcon ? "border-C_D70000" : "",
        className
      )}
      onClick={onClick}>
      {hasIcon && <Icon src="/icons/delete.svg" alt="Download" size={22} />}
      {text && <span className="text-C_0E0E0E">{text}</span>}
    </button>
  );
};
