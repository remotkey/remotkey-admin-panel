"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ButtonTypes } from "../../interfaces";
import { Icon } from "@/lib/next-image/Icon";

export const Button = ({
  text,
  icon,
  url,
  className,
  hasBgColor,
  isNewTab,
  onClick,
  iconSize,
}: ButtonTypes) => {
  return (
    <Link
      onClick={onClick}
      href={url || "#"}
      target={isNewTab ? "_blank" : "_self"}
      className={twMerge(
        `flex max-w-fit items-center justify-center px-4 py-2 gap-[0.31rem]`,
        hasBgColor
          ? "rounded-r_05 border border-C_5EBE76 bg-C_5EBE76"
          : "hover:shadow-none",
        className
      )}>
      {icon && <Icon src={icon || ""} alt="Icon" size={iconSize || 18} />}
      <span
        className={`${hasBgColor ? "text-white" : "text-C_5EBE76"} whitespace-nowrap text-base font-medium leading-[150%]`}>
        {text}
      </span>
    </Link>
  );
};

export const MainWebsiteButton = ({ text, icon, url }: ButtonTypes) => {
  return (
    <Link
      href={url || "#"}
      target="_blank"
      className="hidden items-center gap-[0.31rem] rounded-lg border border-C_5EBE76 bg-C_5EBE76 px-4 py-2 sm:flex">
      {icon && (
        <Image
          src={icon || ""}
          alt="Calender Logo"
          width={18}
          height={18}
          priority
        />
      )}
      <span className="font_med_7 leading-[150%] text-white">{text}</span>
    </Link>
  );
};
