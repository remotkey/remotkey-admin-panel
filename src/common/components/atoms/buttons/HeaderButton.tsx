import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/lib/next-image/Icon";

export const HeaderButton = ({
  text,
  url,
  className,
  icon,
}: {
  text: string;
  url: string;
  className?: string;
  icon?: string;
}) => {
  return (
    <Link
      href={url}
      className={twMerge(
        "font_semi_12 whitespace-nowrap rounded-lg border border-C_309B5F bg-C_309B5F px-2.5 py-1.5 text-center text-white hover:bg-C_5EBE76 hover:border-C_5EBE76 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md min-h-[32px] flex items-center justify-center gap-2",
        className
      )}>
      {icon && (
        <Icon
          src={icon}
          alt={`${text} icon`}
          width={14}
          height={14}
          className="text-white"
        />
      )}
      {text}
    </Link>
  );
};
