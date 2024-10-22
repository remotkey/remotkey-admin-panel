import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const HeaderButton = ({
  text,
  url,
  className,
}: {
  text: string;
  url: string;
  className?: string;
}) => {
  return (
    <Link
      href={url}
      className={twMerge(
        "font_semi_12 whitespace-nowrap rounded-r_08125 border border-C_309B5F bg-C_309B5F px-4 py-[0.62rem] text-center text-white hover:shadow-none",
        className
      )}>
      {text}
    </Link>
  );
};
