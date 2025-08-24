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
  childClassName,
  hasBgColor,
  isNewTab,
  onClick,
  iconSize,
  isDisabled,
}: ButtonTypes) => {
  const baseClasses = twMerge(
    `flex items-center justify-center gap-[0.31rem] rounded-r_05 px-4 py-2 border border-C_5EBE76`,
    hasBgColor ? "bg-C_5EBE76 text-white" : "text-C_5EBE76",
    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-none",
    className
  );

  if (text && url) {
    return (
      <Link
        href={isDisabled ? "#" : url || "#"}
        onClick={isDisabled ? (e) => e.preventDefault() : onClick}
        target={isNewTab ? "_blank" : "_self"}
        className={baseClasses}>
        {icon && (
          <Icon withoutTimeStamp src={icon} alt="Icon" size={iconSize || 18} />
        )}
        <span
          className={twMerge(
            "whitespace-nowrap text-base font-medium leading-[150%]",
            childClassName
          )}>
          {text}
        </span>
      </Link>
    );
  }

  if (icon && !text) {
    return (
      <div
        onClick={isDisabled ? undefined : onClick}
        className={twMerge(
          "flex items-center justify-center",
          hasBgColor ? "bg-C_5EBE76 text-white" : "text-C_5EBE76",
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}>
        <Icon withoutTimeStamp src={icon} alt="Icon" size={iconSize || 18} />
      </div>
    );
  }

  if (text && !url) {
    return (
      <button disabled={isDisabled} onClick={onClick} className={baseClasses}>
        <span
          className={twMerge(
            "whitespace-nowrap text-base font-medium leading-[150%]",
            childClassName
          )}>
          {text}
        </span>
      </button>
    );
  }

  return null;
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
